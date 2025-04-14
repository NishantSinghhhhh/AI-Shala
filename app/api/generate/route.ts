import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,   // make sure this is set in .env
})

export async function POST(request: Request) {
  try {
    const { repoLink } = await request.json()

    // craft your prompt however you like
    const prompt = `
      Generate clean, markdown‑style documentation for the following GitHub repository:
      ${repoLink}
    `

    const res = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You’re a friendly code‑doc generator.' },
        { role: 'user',   content: prompt },
      ],
      temperature: 0,
    })

    const text = res.choices?.[0]?.message?.content ?? ''
    return NextResponse.json({ text })

  } catch (err: any) {
    console.error('OpenAI error:', err)
    return NextResponse.json(
      { error: err.message ?? 'Something went wrong' },
      { status: 500 }
    )
  }
}
