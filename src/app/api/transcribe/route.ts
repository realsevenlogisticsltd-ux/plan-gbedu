import { NextRequest } from "next/server";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: "Voice notes will be enabled for the celebration. Please use text for now." },
      { status: 501 },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return Response.json({ error: "No audio received." }, { status: 400 });
    }

    const { default: OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const transcription = await client.audio.transcriptions.create({
      model: "whisper-1",
      file,
    });

    return Response.json({ text: transcription.text });
  } catch (error) {
    console.error("Transcription failed:", error);
    return Response.json(
      { error: "We could not transcribe that note. Please try again or use text." },
      { status: 500 },
    );
  }
}
