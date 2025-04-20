// hooks/model.ts
import { useState, useCallback } from 'react'

export interface UseOpenAIResult {
  data: string | null
  loading: boolean
  error: Error | null
  generate: (repoLink: string) => Promise<void>
}

export function useOpenAI(): UseOpenAIResult {
  const [data, setData]     = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<Error | null>(null)

  const generate = useCallback(async (repoLink: string) => {
    setLoading(true)
    setError(null)
    setData(null)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoLink }),
      })

      if (!res.ok) {
        let message: string
        try {
          const json = await res.json()
          message = json.error ?? await res.text()
        } catch {
          message = await res.text()
        }
        throw new Error(`Generate request failed: ${message}`)
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
