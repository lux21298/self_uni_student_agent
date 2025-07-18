import { z } from "zod"

export async function POST(request: Request) {
  try {
    const groqKey = process.env.GROQ_API_KEY
    if (!groqKey) {
      throw new Error('GROQ_API_KEY environment variable is not set')
    }

    const { query, context } = await request.json()

    if (!query) {
      return Response.json({ error: "Query is required" }, { status: 400 })
    }

    const prompt = context ? `Context: ${context}\n\nQuery: ${query}` : query
    
    // Make API call to Groq
    const response = await fetch('https://api.groq.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
        model: "mixtral-8x7b-32768",
        temperature: 0.7,
        max_tokens: 2048
      })
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(`Groq API error: ${result.error?.message || 'Unknown error'}`)
    }

    return Response.json({
      response: result.choices[0].message.content,
      model: result.model,
    })
  } catch (error) {
    console.error("AI Assistant API error:", error)
    return Response.json({ error: "Failed to get AI assistance" }, { status: 500 })
  }
}
