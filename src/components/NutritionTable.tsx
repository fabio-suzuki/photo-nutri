"use client";

import { DailyLog } from "@/types/nutrition";

interface NutritionTableProps {
  dailyLog: DailyLog;
}

interface NutrientRow {
  label: string;
  value: number;
  unit: string;
  recommended: number;
}

export function NutritionTable({ dailyLog }: NutritionTableProps) {
  const nutrients: NutrientRow[] = [
    { label: "Calorias", value: dailyLog.totalCalories, unit: "kcal", recommended: 2000 },
    { label: "Proteína", value: dailyLog.totalProtein, unit: "g", recommended: 50 },
    { label: "Carboidratos", value: dailyLog.totalCarbs, unit: "g", recommended: 300 },
    { label: "Gordura Total", value: dailyLog.totalFat, unit: "g", recommended: 65 },
    { label: "Fibra", value: dailyLog.totalFiber, unit: "g", recommended: 25 },
    { label: "Sódio", value: dailyLog.totalSodium, unit: "mg", recommended: 2300 },
    { label: "Açúcar", value: dailyLog.totalSugar, unit: "g", recommended: 50 },
    { label: "Gordura Saturada", value: dailyLog.totalSaturatedFat, unit: "g", recommended: 20 },
    { label: "Colesterol", value: dailyLog.totalCholesterol, unit: "mg", recommended: 300 },
    { label: "Vitamina A", value: dailyLog.totalVitaminA, unit: "mcg", recommended: 900 },
    { label: "Vitamina C", value: dailyLog.totalVitaminC, unit: "mg", recommended: 90 },
    { label: "Vitamina D", value: dailyLog.totalVitaminD, unit: "mcg", recommended: 20 },
    { label: "Cálcio", value: dailyLog.totalCalcium, unit: "mg", recommended: 1000 },
    { label: "Ferro", value: dailyLog.totalIron, unit: "mg", recommended: 18 },
    { label: "Potássio", value: dailyLog.totalPotassium, unit: "mg", recommended: 3500 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Tabela Nutricional do Dia
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 text-gray-500 font-medium">Nutriente</th>
              <th className="text-right py-2 text-gray-500 font-medium">Consumido</th>
              <th className="text-right py-2 text-gray-500 font-medium">Ideal</th>
              <th className="text-right py-2 text-gray-500 font-medium">%</th>
            </tr>
          </thead>
          <tbody>
            {nutrients.map((nutrient) => {
              const percentage = Math.round(
                (nutrient.value / nutrient.recommended) * 100
              );
              const colorClass =
                percentage >= 80 && percentage <= 120
                  ? "text-green-600"
                  : percentage < 50
                  ? "text-red-600"
                  : percentage > 120
                  ? "text-orange-600"
                  : "text-yellow-600";

              return (
                <tr key={nutrient.label} className="border-b border-gray-50">
                  <td className="py-2.5 text-gray-700">{nutrient.label}</td>
                  <td className="py-2.5 text-right text-gray-900 font-medium">
                    {Math.round(nutrient.value)} {nutrient.unit}
                  </td>
                  <td className="py-2.5 text-right text-gray-500">
                    {nutrient.recommended} {nutrient.unit}
                  </td>
                  <td className={`py-2.5 text-right font-semibold ${colorClass}`}>
                    {percentage}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500" /> Ideal (80-120%)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-yellow-500" /> Atenção (50-80%)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500" /> Deficiente (&lt;50%)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-orange-500" /> Excesso (&gt;120%)
        </span>
      </div>
    </div>
  );
}
