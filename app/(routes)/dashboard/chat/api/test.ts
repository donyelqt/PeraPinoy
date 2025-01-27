import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message } from 'ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest"
    });

    const formattedMessages = [
      {
        role: "model",
        parts: [{ text: "You are an PeraPinoyGPT AI financial advisor helping users with personalized financial advice, financial planning, budgeting, saving, and general financial education." }]
      },
      ...messages.map(message => ({
        role: message.role === "user" ? "user" : "model",
        parts: [{ text: message.content }]
      }))
    ];

    const response = await model.generateContentStream({
      contents: formattedMessages,
    });

    // Create a ReadableStream from the AsyncGenerator
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of response.stream) {
            const text = chunk.text();
            if (text) {
              // Format in the correct SSE format
              const formattedMessage = `data: ${JSON.stringify({ text })}\n\n`;
              controller.enqueue(encoder.encode(formattedMessage));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    console.error('Error:', error);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
