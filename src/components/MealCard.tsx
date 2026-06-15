"use client";

import { Trash2, Clock } from "lucide-react";
import { MealEntry } from "@/types/nutrition";
import { getMealTypeLabel } from "@/lib/nutrition-utils";

interface MealCardProps {
  meal: MealEntry;
  onDelete: (id: string) => void;
}

export function MealCard({ meal, onDelete }: MealCardProps) {
  const time = new Date(meal.timestamp).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex gap-3 p-4">
        {meal.imageUrl && (
          <img
            src={meal.imageUrl}
            alt="Refeição"
            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
              {getMealTypeLabel(meal.mealType)}
            </span>
            <button
              onClick={() => onDelete(meal.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-1">
            {meal.foods.map((food) => (
              <p key={food.id} className="text-sm text-gray-700 truncate">
                {food.name}
              </p>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {time}
            </span>
            <span className="font-semibold text-gray-900">
              {meal.totalCalories} kcal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
