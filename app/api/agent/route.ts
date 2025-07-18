export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const { prompt, context }: { prompt?: string; context?: string } = await request.json();

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Temporary mock response until GROQ API key is configured
    return Response.json({
      response: `Mock response for: ${prompt}`,
      model: "mock-model",
      usage: {
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0
      }
    });

  } catch (error) {
    console.error("Agent error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
