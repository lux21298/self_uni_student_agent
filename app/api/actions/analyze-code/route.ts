export async function POST(request: Request) {
  try {
    const groqKey = process.env.GROQ_API_KEY
    if (!groqKey) {
      throw new Error('GROQ_API_KEY environment variable is not set')
    }

    const { code, language, analysis_type } = await request.json()

    if (!code || !analysis_type) {
      return Response.json({ error: "Code and analysis_type are required" }, { status: 400 })
    }

    const prompt = `Perform a ${analysis_type} analysis of this ${language || "code"}:\n\n${code}\n\nProvide specific suggestions and explanations.`
    
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

    const analysis = result.choices[0].message.content
    
    // Extract suggestions from the response (simple implementation)
    const suggestions = analysis
      .split("\n")
      .filter((line: string) => line.trim().startsWith("-") || line.trim().startsWith("•") || line.includes("suggestion"))
      .slice(0, 5) // Limit to 5 suggestions

    return Response.json({
      analysis: analysis,
      suggestions: suggestions.length > 0 ? suggestions : ["No specific suggestions generated"],
      model: result.model
    })
  } catch (error) {
    console.error("Code analysis API error:", error)
    return Response.json({ error: "Failed to analyze code" }, { status: 500 })
  }
}
