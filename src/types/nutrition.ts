export interface NutrientInfo {
  name: string;
  amount: number;
  unit: string;
  dailyRecommended: number;
  percentage: number;
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
  sugar: number;
  saturatedFat: number;
  cholesterol: number;
  vitaminA: number;
  vitaminC: number;
  vitaminD: number;
  calcium: number;
  iron: number;
  potassium: number;
}

export interface MealEntry {
  id: string;
  timestamp: string;
  imageUrl: string;
  foods: FoodItem[];
  totalCalories: number;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
}

export interface DailyLog {
  date: string;
  meals: MealEntry[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
  totalSodium: number;
  totalSugar: number;
  totalSaturatedFat: number;
  totalCholesterol: number;
  totalVitaminA: number;
  totalVitaminC: number;
  totalVitaminD: number;
  totalCalcium: number;
  totalIron: number;
  totalPotassium: number;
}

export interface DailyReport {
  date: string;
  caloricGoal: number;
  caloriesConsumed: number;
  caloricBalance: number;
  isDeficit: boolean;
  nutrientsWithinRange: NutrientInfo[];
  nutrientsOutsideRange: NutrientInfo[];
  deficientNutrients: NutrientInfo[];
  suggestions: string[];
}

export interface UserGoals {
  dailyCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface AnalysisResult {
  foods: FoodItem[];
  totalCalories: number;
  confidence: string;
}
