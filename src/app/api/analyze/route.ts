import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured. Please set OPENAI_API_KEY in your .env.local file." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Você é um nutricionista especialista em análise de alimentos por imagem. 
Analise a foto e identifique TODOS os alimentos visíveis. Para cada alimento, estime os valores nutricionais com base em porções típicas.

Responda APENAS com um JSON válido no seguinte formato (sem markdown, sem code blocks):
{
  "foods": [
    {
      "id": "unique-id-1",
      "name": "Nome do alimento",
      "calories": 250,
      "protein": 20,
      "carbs": 30,
      "fat": 8,
      "fiber": 3,
      "sodium": 400,
      "sugar": 5,
      "saturatedFat": 2,
      "cholesterol": 50,
      "vitaminA": 100,
      "vitaminC": 10,
      "vitaminD": 1,
      "calcium": 50,
      "iron": 2,
      "potassium": 300
    }
  ],
  "totalCalories": 250,
  "confidence": "alta"
}

Unidades: calories em kcal, protein/carbs/fat/fiber/sugar/saturatedFat em g, sodium/calcium/potassium em mg, cholesterol em mg, vitaminA em mcg, vitaminC em mg, vitaminD em mcg, iron em mg.
O campo confidence pode ser "alta", "média" ou "baixa".
Gere IDs únicos para cada alimento usando o formato "food-" seguido de timestamp ou string aleatória.`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analise esta foto de alimento e forneça a estimativa nutricional detalhada.",
            },
            {
              type: "image_url",
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
      max_tokens: 2000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const result = JSON.parse(cleaned);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}
