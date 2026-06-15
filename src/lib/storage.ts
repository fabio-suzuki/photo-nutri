import { MealEntry, UserGoals } from "@/types/nutrition";

const MEALS_KEY = "photo-nutri-meals";
const GOALS_KEY = "photo-nutri-goals";

export function saveMeal(meal: MealEntry): void {
  const meals = getAllMeals();
  meals.push(meal);
  if (typeof window !== "undefined") {
    localStorage.setItem(MEALS_KEY, JSON.stringify(meals));
  }
}

export function getAllMeals(): MealEntry[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(MEALS_KEY);
  if (!data) return [];
  return JSON.parse(data) as MealEntry[];
}

export function getMealsByDate(date: string): MealEntry[] {
  const meals = getAllMeals();
  return meals.filter((m) => m.timestamp.startsWith(date));
}

export function deleteMeal(id: string): void {
  const meals = getAllMeals().filter((m) => m.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(MEALS_KEY, JSON.stringify(meals));
  }
}

export function getUserGoals(): UserGoals {
  if (typeof window === "undefined") {
    return { dailyCalories: 2000, protein: 50, carbs: 300, fat: 65, fiber: 25 };
  }
  const data = localStorage.getItem(GOALS_KEY);
  if (!data) {
    return { dailyCalories: 2000, protein: 50, carbs: 300, fat: 65, fiber: 25 };
  }
  return JSON.parse(data) as UserGoals;
}

export function saveUserGoals(goals: UserGoals): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
  }
}
