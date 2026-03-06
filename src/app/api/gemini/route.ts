import { model, SCIENTIST_PROMPT, CRITIC_PROMPT } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { type, data } = await req.json();

    let prompt = "";
    if (type === "generate") {
      prompt = `${SCIENTIST_PROMPT}\n\nConfiguração do usuário: ${JSON.stringify(data)}`;
    } else if (type === "review") {
      prompt = `${CRITIC_PROMPT}\n\nDados do treino realizado: ${JSON.stringify(data)}`;
    } else {
      return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (type === "generate") {
        // Tenta extrair o JSON se a IA colocar Markdown
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const jsonStr = jsonMatch ? jsonMatch[0] : text;
        return NextResponse.json(JSON.parse(jsonStr));
    }

    return NextResponse.json({ analysis: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Erro na comunicação com a IA" }, { status: 500 });
  }
}
