import { DailyLog, DailyReport, MealEntry, NutrientInfo, UserGoals } from "../types/nutrition";

const DAILY_RECOMMENDED: Record<string, { amount: number; unit: string }> = {
  calories: { amount: 2000, unit: "kcal" },
  protein: { amount: 50, unit: "g" },
  carbs: { amount: 300, unit: "g" },
  fat: { amount: 65, unit: "g" },
  fiber: { amount: 25, unit: "g" },
  sodium: { amount: 2300, unit: "mg" },
  sugar: { amount: 50, unit: "g" },
  saturatedFat: { amount: 20, unit: "g" },
  cholesterol: { amount: 300, unit: "mg" },
  vitaminA: { amount: 900, unit: "mcg" },
  vitaminC: { amount: 90, unit: "mg" },
  vitaminD: { amount: 20, unit: "mcg" },
  calcium: { amount: 1000, unit: "mg" },
  iron: { amount: 18, unit: "mg" },
  potassium: { amount: 3500, unit: "mg" },
};

export function calculateDailyTotals(meals: MealEntry[]): DailyLog {
  const totals = meals.reduce(
    (acc, meal) => {
      meal.foods.forEach((food) => {
        acc.totalCalories += food.calories;
        acc.totalProtein += food.protein;
        acc.totalCarbs += food.carbs;
        acc.totalFat += food.fat;
        acc.totalFiber += food.fiber;
        acc.totalSodium += food.sodium;
        acc.totalSugar += food.sugar;
        acc.totalSaturatedFat += food.saturatedFat;
        acc.totalCholesterol += food.cholesterol;
        acc.totalVitaminA += food.vitaminA;
        acc.totalVitaminC += food.vitaminC;
        acc.totalVitaminD += food.vitaminD;
        acc.totalCalcium += food.calcium;
        acc.totalIron += food.iron;
        acc.totalPotassium += food.potassium;
      });
      return acc;
    },
    {
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      totalFiber: 0,
      totalSodium: 0,
      totalSugar: 0,
      totalSaturatedFat: 0,
      totalCholesterol: 0,
      totalVitaminA: 0,
      totalVitaminC: 0,
      totalVitaminD: 0,
      totalCalcium: 0,
      totalIron: 0,
      totalPotassium: 0,
    }
  );

  return {
    date: meals[0]?.timestamp?.split("T")[0] ?? new Date().toISOString().split("T")[0],
    meals,
    ...totals,
  };
}

export function generateDailyReport(
  dailyLog: DailyLog,
  userGoals?: UserGoals
): DailyReport {
  const caloricGoal = userGoals?.dailyCalories ?? DAILY_RECOMMENDED.calories.amount;
  const caloriesConsumed = dailyLog.totalCalories;
  const caloricBalance = caloriesConsumed - caloricGoal;

  const nutrients: NutrientInfo[] = [
    {
      name: "Proteína",
      amount: dailyLog.totalProtein,
      unit: "g",
      dailyRecommended: userGoals?.protein ?? DAILY_RECOMMENDED.protein.amount,
      percentage: (dailyLog.totalProtein / (userGoals?.protein ?? DAILY_RECOMMENDED.protein.amount)) * 100,
    },
    {
      name: "Carboidratos",
      amount: dailyLog.totalCarbs,
      unit: "g",
      dailyRecommended: userGoals?.carbs ?? DAILY_RECOMMENDED.carbs.amount,
      percentage: (dailyLog.totalCarbs / (userGoals?.carbs ?? DAILY_RECOMMENDED.carbs.amount)) * 100,
    },
    {
      name: "Gordura Total",
      amount: dailyLog.totalFat,
      unit: "g",
      dailyRecommended: userGoals?.fat ?? DAILY_RECOMMENDED.fat.amount,
      percentage: (dailyLog.totalFat / (userGoals?.fat ?? DAILY_RECOMMENDED.fat.amount)) * 100,
    },
    {
      name: "Fibra",
      amount: dailyLog.totalFiber,
      unit: "g",
      dailyRecommended: userGoals?.fiber ?? DAILY_RECOMMENDED.fiber.amount,
      percentage: (dailyLog.totalFiber / (userGoals?.fiber ?? DAILY_RECOMMENDED.fiber.amount)) * 100,
    },
    {
      name: "Sódio",
      amount: dailyLog.totalSodium,
      unit: "mg",
      dailyRecommended: DAILY_RECOMMENDED.sodium.amount,
      percentage: (dailyLog.totalSodium / DAILY_RECOMMENDED.sodium.amount) * 100,
    },
    {
      name: "Açúcar",
      amount: dailyLog.totalSugar,
      unit: "g",
      dailyRecommended: DAILY_RECOMMENDED.sugar.amount,
      percentage: (dailyLog.totalSugar / DAILY_RECOMMENDED.sugar.amount) * 100,
    },
    {
      name: "Gordura Saturada",
      amount: dailyLog.totalSaturatedFat,
      unit: "g",
      dailyRecommended: DAILY_RECOMMENDED.saturatedFat.amount,
      percentage: (dailyLog.totalSaturatedFat / DAILY_RECOMMENDED.saturatedFat.amount) * 100,
    },
    {
      name: "Colesterol",
      amount: dailyLog.totalCholesterol,
      unit: "mg",
      dailyRecommended: DAILY_RECOMMENDED.cholesterol.amount,
      percentage: (dailyLog.totalCholesterol / DAILY_RECOMMENDED.cholesterol.amount) * 100,
    },
    {
      name: "Vitamina A",
      amount: dailyLog.totalVitaminA,
      unit: "mcg",
      dailyRecommended: DAILY_RECOMMENDED.vitaminA.amount,
      percentage: (dailyLog.totalVitaminA / DAILY_RECOMMENDED.vitaminA.amount) * 100,
    },
    {
      name: "Vitamina C",
      amount: dailyLog.totalVitaminC,
      unit: "mg",
      dailyRecommended: DAILY_RECOMMENDED.vitaminC.amount,
      percentage: (dailyLog.totalVitaminC / DAILY_RECOMMENDED.vitaminC.amount) * 100,
    },
    {
      name: "Vitamina D",
      amount: dailyLog.totalVitaminD,
      unit: "mcg",
      dailyRecommended: DAILY_RECOMMENDED.vitaminD.amount,
      percentage: (dailyLog.totalVitaminD / DAILY_RECOMMENDED.vitaminD.amount) * 100,
    },
    {
      name: "Cálcio",
      amount: dailyLog.totalCalcium,
      unit: "mg",
      dailyRecommended: DAILY_RECOMMENDED.calcium.amount,
      percentage: (dailyLog.totalCalcium / DAILY_RECOMMENDED.calcium.amount) * 100,
    },
    {
      name: "Ferro",
      amount: dailyLog.totalIron,
      unit: "mg",
      dailyRecommended: DAILY_RECOMMENDED.iron.amount,
      percentage: (dailyLog.totalIron / DAILY_RECOMMENDED.iron.amount) * 100,
    },
    {
      name: "Potássio",
      amount: dailyLog.totalPotassium,
      unit: "mg",
      dailyRecommended: DAILY_RECOMMENDED.potassium.amount,
      percentage: (dailyLog.totalPotassium / DAILY_RECOMMENDED.potassium.amount) * 100,
    },
  ];

  const nutrientsWithinRange = nutrients.filter(
    (n) => n.percentage >= 80 && n.percentage <= 120
  );
  const nutrientsOutsideRange = nutrients.filter(
    (n) => n.percentage < 80 || n.percentage > 120
  );
  const deficientNutrients = nutrients.filter((n) => n.percentage < 50);

  const suggestions = generateSuggestions(deficientNutrients);

  return {
    date: dailyLog.date,
    caloricGoal,
    caloriesConsumed,
    caloricBalance,
    isDeficit: caloricBalance < 0,
    nutrientsWithinRange,
    nutrientsOutsideRange,
    deficientNutrients,
    suggestions,
  };
}

function generateSuggestions(deficientNutrients: NutrientInfo[]): string[] {
  const suggestions: string[] = [];

  const foodSuggestions: Record<string, string> = {
    "Proteína": "Inclua mais carnes magras, ovos, leguminosas (feijão, lentilha) ou laticínios na dieta.",
    "Carboidratos": "Adicione cereais integrais, arroz integral, batata-doce ou frutas às refeições.",
    "Gordura Total": "Inclua abacate, azeite de oliva, castanhas ou peixes gordurosos (salmão, sardinha).",
    "Fibra": "Aumente o consumo de vegetais, frutas com casca, aveia e sementes (chia, linhaça).",
    "Sódio": "A maioria das pessoas consome sódio em excesso. Se deficiente, use sal marinho ou alimentos como azeitonas.",
    "Açúcar": "Prefira açúcares naturais de frutas. Evite açúcares refinados e ultraprocessados.",
    "Gordura Saturada": "Fontes moderadas incluem laticínios integrais e carnes. Prefira gorduras insaturadas.",
    "Colesterol": "Ovos, camarão e vísceras são fontes de colesterol. Consuma com moderação.",
    "Vitamina A": "Consuma cenoura, batata-doce, manga, espinafre ou fígado bovino.",
    "Vitamina C": "Inclua laranja, acerola, kiwi, morango ou pimentão vermelho.",
    "Vitamina D": "Tome sol por 15 minutos/dia. Alimentos: salmão, atum, gema de ovo ou leite fortificado.",
    "Cálcio": "Consuma leite, iogurte, queijo, brócolis, tofu ou sardinha enlatada.",
    "Ferro": "Inclua carnes vermelhas, feijão, lentilha, espinafre ou sementes de abóbora. Combine com vitamina C.",
    "Potássio": "Consuma banana, abacate, batata, feijão branco ou água de coco.",
  };

  for (const nutrient of deficientNutrients) {
    const suggestion = foodSuggestions[nutrient.name];
    if (suggestion) {
      suggestions.push(`${nutrient.name} (${Math.round(nutrient.percentage)}% do ideal): ${suggestion}`);
    }
  }

  if (suggestions.length === 0) {
    suggestions.push("Sua alimentação está equilibrada! Continue mantendo uma dieta variada.");
  }

  return suggestions;
}

export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function getMealTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    breakfast: "Café da Manhã",
    lunch: "Almoço",
    dinner: "Jantar",
    snack: "Lanche",
  };
  return labels[type] ?? type;
}
