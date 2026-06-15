"use client";

import {
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";
import { DailyReport as DailyReportType } from "@/types/nutrition";

interface DailyReportProps {
  report: DailyReportType;
}

export function DailyReport({ report }: DailyReportProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Relatório Diário</h2>

      {/* Caloric Balance */}
      <div
        className={`rounded-xl p-4 ${
          report.isDeficit
            ? "bg-blue-50 border border-blue-100"
            : "bg-orange-50 border border-orange-100"
        }`}
      >
        <div className="flex items-center gap-3">
          {report.isDeficit ? (
            <TrendingDown className="w-8 h-8 text-blue-600" />
          ) : (
            <TrendingUp className="w-8 h-8 text-orange-600" />
          )}
          <div>
            <p
              className={`text-lg font-bold ${
                report.isDeficit ? "text-blue-700" : "text-orange-700"
              }`}
            >
              {report.isDeficit ? "Déficit Calórico" : "Superávit Calórico"}
            </p>
            <p className="text-sm text-gray-600">
              {report.caloriesConsumed} kcal consumidas / {report.caloricGoal}{" "}
              kcal meta
            </p>
            <p
              className={`text-sm font-semibold mt-1 ${
                report.isDeficit ? "text-blue-600" : "text-orange-600"
              }`}
            >
              {report.isDeficit ? "" : "+"}
              {Math.round(report.caloricBalance)} kcal
            </p>
          </div>
        </div>
      </div>

      {/* Nutrients Within Range */}
      {report.nutrientsWithinRange.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            Nutrientes no Ideal ({report.nutrientsWithinRange.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {report.nutrientsWithinRange.map((n) => (
              <span
                key={n.name}
                className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium"
              >
                {n.name} ({Math.round(n.percentage)}%)
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Nutrients Outside Range */}
      {report.nutrientsOutsideRange.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            Nutrientes Fora do Ideal ({report.nutrientsOutsideRange.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {report.nutrientsOutsideRange.map((n) => (
              <span
                key={n.name}
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  n.percentage < 80
                    ? "bg-red-50 text-red-700"
                    : "bg-orange-50 text-orange-700"
                }`}
              >
                {n.name} ({Math.round(n.percentage)}%)
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Deficient Nutrients */}
      {report.deficientNutrients.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            Nutrientes Deficientes ({report.deficientNutrients.length})
          </h3>
          <div className="space-y-2">
            {report.deficientNutrients.map((n) => (
              <div
                key={n.name}
                className="flex items-center justify-between p-2 bg-red-50 rounded-lg"
              >
                <span className="text-sm text-red-800 font-medium">
                  {n.name}
                </span>
                <span className="text-xs text-red-600">
                  {Math.round(n.amount)} / {n.dailyRecommended} {n.unit} (
                  {Math.round(n.percentage)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {report.suggestions.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Sugestões de Alimentos
          </h3>
          <div className="space-y-2">
            {report.suggestions.map((suggestion, idx) => (
              <div
                key={idx}
                className="p-3 bg-amber-50 border border-amber-100 rounded-lg text-sm text-gray-700"
              >
                {suggestion}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
