import { useState, useCallback } from 'react'

interface UseOpenAIResult {
  data: string | null
  loading: boolean
  error: Error | null
  generate: (prompt: string) => Promise<void>
}


export function useOpenAI(): UseOpenAIResult {
  const [data, setData] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const generate = useCallback(async (prompt: string) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      if (!res.ok) {
        const errText = await res.text()
        throw new Error(`OpenAI request failed: ${errText}`)
      }

      const json = await res.json()
      setData(json.text)
    } catch (err: any) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, generate }
}
