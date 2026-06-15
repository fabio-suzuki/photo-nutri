import Constants from "expo-constants";
import { AnalysisResult } from "../types/nutrition";

const OPENAI_API_KEY = Constants.expoConfig?.extra?.openaiApiKey ?? "";

const SYSTEM_PROMPT = `Você é um nutricionista especialista em análise de alimentos por imagem. 
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
Gere IDs únicos para cada alimento usando o formato "food-" seguido de timestamp ou string aleatória.`;

export async function analyzeImage(base64Image: string): Promise<AnalysisResult> {
  if (!OPENAI_API_KEY) {
    throw new Error(
      "OpenAI API key não configurada. Defina openaiApiKey em app.json > expo > extra."
    );
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
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
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error?.message ?? "Falha ao analisar imagem"
    );
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Sem resposta da IA");
  }

  const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  return JSON.parse(cleaned) as AnalysisResult;
}
