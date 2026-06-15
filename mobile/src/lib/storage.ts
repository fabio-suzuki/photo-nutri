import AsyncStorage from "@react-native-async-storage/async-storage";
import { MealEntry, UserGoals } from "../types/nutrition";

const MEALS_KEY = "photo-nutri-meals";
const GOALS_KEY = "photo-nutri-goals";

const DEFAULT_GOALS: UserGoals = {
  dailyCalories: 2000,
  protein: 50,
  carbs: 300,
  fat: 65,
  fiber: 25,
};

export async function saveMeal(meal: MealEntry): Promise<void> {
  const meals = await getAllMeals();
  meals.push(meal);
  await AsyncStorage.setItem(MEALS_KEY, JSON.stringify(meals));
}

export async function getAllMeals(): Promise<MealEntry[]> {
  const data = await AsyncStorage.getItem(MEALS_KEY);
  if (!data) return [];
  return JSON.parse(data) as MealEntry[];
}

export async function getMealsByDate(date: string): Promise<MealEntry[]> {
  const meals = await getAllMeals();
  return meals.filter((m) => m.timestamp.startsWith(date));
}

export async function deleteMeal(id: string): Promise<void> {
  const meals = (await getAllMeals()).filter((m) => m.id !== id);
  await AsyncStorage.setItem(MEALS_KEY, JSON.stringify(meals));
}

export async function getUserGoals(): Promise<UserGoals> {
  const data = await AsyncStorage.getItem(GOALS_KEY);
  if (!data) return DEFAULT_GOALS;
  return JSON.parse(data) as UserGoals;
}

export async function saveUserGoals(goals: UserGoals): Promise<void> {
  await AsyncStorage.setItem(GOALS_KEY, JSON.stringify(goals));
}
