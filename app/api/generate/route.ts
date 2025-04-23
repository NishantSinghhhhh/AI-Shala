// app/api/generate/route.ts
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

interface GitHubTreeEntry {
  path: string;
  mode: string;
  type: string;
  sha: string;
  size?: number;
  url: string;
}

interface GitHubTreeResponse {
  sha: string;
  url: string;
  tree: GitHubTreeEntry[];
  truncated: boolean;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,   // make sure this is set in your .env
})

export async function POST(request: Request) {
  try {
    const { repoLink } = await request.json()

    // 1) Validate & extract owner/repo from the GitHub URL
    const match = typeof repoLink === 'string'
      ? repoLink.match(/github\.com\/([^/]+)\/([^/]+)/)
      : null

    if (!match) {
      return NextResponse.json(
        { error: 'Invalid GitHub repository URL.' },
        { status: 400 }
      )
    }
    const [, owner, repo] = match

    // 2) Fetch the README
    const readmeRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      { headers: { Accept: 'application/vnd.github.v3+json' } }
    )
    if (!readmeRes.ok) {
      throw new Error(`GitHub README fetch failed: ${readmeRes.status}`)
    }
    const readmeJson = await readmeRes.json()
    const readme = readmeJson.content
      ? Buffer.from(readmeJson.content, 'base64').toString('utf-8')
      : '**No README.md found in this repository.**'

    // 3) Fetch the file tree (default branch “main”)
    const treeRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`,
      { headers: { Accept: 'application/vnd.github.v3+json' } }
    )
    if (!treeRes.ok) {
      throw new Error(`GitHub tree fetch failed: ${treeRes.status}`)
    }

    const treeJson: GitHubTreeResponse = await treeRes.json();
    const fileList = Array.isArray(treeJson.tree)
      ? treeJson.tree.map((entry: GitHubTreeEntry) => entry.path).join('\n')
      : ''

    // 4) Build the prompt for OpenAI, with added requirement:
    const prompt = `
You are a technical repository analyzer. I will give you the contents of a GitHub repo; please provide a structured analysis with these sections:

1. OVERVIEW:
   - Core purpose
   - Problem it solves
   - Target users
   - Development status

2. KEY FEATURES:
   - Main functionality
   - Unique selling points
   - API/integration capabilities

3. TECHNICAL ARCHITECTURE:
   - Folder structure
   - Key files & purposes
   - Patterns used
   - Data flow

4. TECHNOLOGY STACK:
   - Languages
   - Frameworks/libraries
   - Databases
   - External services

6. CONTRIBUTION GUIDELINES:
   - How to contribute
   - Coding standards
   - Testing procedures

8. DESCRIPTIVE SECTIONS:
   For each of the following topics, write a detailed descriptive section of approximately 300–400 words, and include relevant code examples that we can display on the dashboard. Format your response with clear markdown headings (using ## or ### for each section and subsection) so we can easily see each heading and its corresponding content:
   - Explaining Code: Provide an in-depth explanation of the most important code patterns and files in the repository. Include 2-3 code snippets from key files with thorough explanations of what they do and how they work. Use markdown code blocks with language specification.
   - Installation Guide: Create a comprehensive step-by-step installation guide with all necessary commands. Include code blocks showing installation commands, configuration examples, and how to run the project locally. Format steps with clear numbering or bullet points.
   - Repository Overview: Analyze the overall structure and organization of the repository. Include a directory structure visualization and explain the purpose of major directories and files, with code examples that show how they relate to each other.

   Make sure each section is clearly demarcated with proper headings and formatting so they can be easily identified and rendered separately on the dashboard.
---

### README.md
\`\`\`
${readme}
\`\`\`

### File list
\`\`\`
${fileList}
\`\`\`
`

    // 5) Send to OpenAI
    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful and precise repo analyzer.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.2
    })

    const text = aiResponse.choices?.[0]?.message?.content ?? ''

    // 6) Return the generated analysis
    return NextResponse.json({ text })

  } catch (err: unknown) {
    console.error('Error in /api/generate:', err)
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
