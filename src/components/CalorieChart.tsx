"use client";

import { MealEntry } from "@/types/nutrition";
import { getMealTypeLabel } from "@/lib/nutrition-utils";

interface CalorieChartProps {
  meals: MealEntry[];
  goal: number;
}

export function CalorieChart({ meals, goal }: CalorieChartProps) {
  const totalCalories = meals.reduce((sum, m) => sum + m.totalCalories, 0);
  const percentage = Math.min((totalCalories / goal) * 100, 100);
  const overGoal = totalCalories > goal;

  const mealTypeCalories = meals.reduce(
    (acc, meal) => {
      acc[meal.mealType] = (acc[meal.mealType] || 0) + meal.totalCalories;
      return acc;
    },
    {} as Record<string, number>
  );

  const colors: Record<string, string> = {
    breakfast: "bg-amber-400",
    lunch: "bg-green-400",
    dinner: "bg-blue-400",
    snack: "bg-purple-400",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Calorias do Dia
      </h2>

      {/* Circular-ish progress */}
      <div className="flex items-center gap-6">
        <div className="relative w-28 h-28">
          <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="12"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke={overGoal ? "#f97316" : "#22c55e"}
              strokeWidth="12"
              strokeDasharray={`${percentage * 2.64} 264`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-gray-900">
              {Math.round(totalCalories)}
            </span>
            <span className="text-xs text-gray-500">/ {goal}</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {Object.entries(mealTypeCalories).map(([type, cals]) => (
            <div key={type} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${colors[type] ?? "bg-gray-400"}`} />
              <span className="text-xs text-gray-600 flex-1">
                {getMealTypeLabel(type)}
              </span>
              <span className="text-xs font-medium text-gray-900">
                {Math.round(cals)} kcal
              </span>
            </div>
          ))}
          {meals.length === 0 && (
            <p className="text-sm text-gray-400">
              Nenhuma refeição registrada hoje
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
