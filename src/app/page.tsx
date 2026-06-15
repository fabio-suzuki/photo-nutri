"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Apple, Settings } from "lucide-react";
import { PhotoUpload } from "@/components/PhotoUpload";
import { MealCard } from "@/components/MealCard";
import { NutritionTable } from "@/components/NutritionTable";
import { DailyReport } from "@/components/DailyReport";
import { CalorieChart } from "@/components/CalorieChart";
import { MealTypeSelector } from "@/components/MealTypeSelector";
import { GoalsModal } from "@/components/GoalsModal";
import { MealEntry, AnalysisResult, DailyReport as DailyReportType } from "@/types/nutrition";
import { saveMeal, getMealsByDate, deleteMeal, getUserGoals, saveUserGoals } from "@/lib/storage";
import { calculateDailyTotals, generateDailyReport, formatDate } from "@/lib/nutrition-utils";
import { UserGoals } from "@/types/nutrition";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealType, setMealType] = useState<"breakfast" | "lunch" | "dinner" | "snack">("lunch");
  const [showGoals, setShowGoals] = useState(false);
  const [activeTab, setActiveTab] = useState<"log" | "report">("log");
  const [refreshCounter, setRefreshCounter] = useState(0);

  const goals = useMemo(() => getUserGoals(), [refreshCounter]); // eslint-disable-line react-hooks/exhaustive-deps

  const dateStr = formatDate(selectedDate);

  const meals = useMemo(() => getMealsByDate(dateStr), [dateStr, refreshCounter]); // eslint-disable-line react-hooks/exhaustive-deps

  const dailyLog = useMemo(() => {
    if (meals.length === 0) return null;
    return calculateDailyTotals(meals);
  }, [meals]);

  const report: DailyReportType | null = useMemo(() => {
    if (!dailyLog) return null;
    return generateDailyReport(dailyLog, goals);
  }, [dailyLog, goals]);

  const triggerRefresh = () => setRefreshCounter((c) => c + 1);

  const handleAnalysisComplete = (imageUrl: string, result: unknown) => {
    const analysisResult = result as AnalysisResult;
    const newMeal: MealEntry = {
      id: `meal-${Date.now()}`,
      timestamp: new Date().toISOString(),
      imageUrl,
      foods: analysisResult.foods,
      totalCalories: analysisResult.totalCalories,
      mealType,
    };

    saveMeal(newMeal);
    triggerRefresh();
  };

  const handleDeleteMeal = (id: string) => {
    deleteMeal(id);
    triggerRefresh();
  };

  const handleSaveGoals = (newGoals: UserGoals) => {
    saveUserGoals(newGoals);
    setShowGoals(false);
    triggerRefresh();
  };

  const goToPreviousDay = () => {
    setSelectedDate((d) => {
      const newDate = new Date(d);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const goToNextDay = () => {
    setSelectedDate((d) => {
      const newDate = new Date(d);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  const isToday = formatDate(selectedDate) === formatDate(new Date());

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Apple className="w-6 h-6 text-green-600" />
            <h1 className="text-lg font-bold text-gray-900">PhotoNutri</h1>
          </div>
          <button
            onClick={() => setShowGoals(true)}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-4 space-y-4 pb-24">
        {/* Date Navigation */}
        <div className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm border border-gray-100">
          <button
            onClick={goToPreviousDay}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-900">
              {isToday
                ? "Hoje"
                : format(selectedDate, "EEEE", { locale: ptBR })}
            </p>
            <p className="text-xs text-gray-500">
              {format(selectedDate, "d 'de' MMMM, yyyy", { locale: ptBR })}
            </p>
          </div>
          <button
            onClick={goToNextDay}
            disabled={isToday}
            className="p-1 rounded-lg hover:bg-gray-100 disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Calorie Overview */}
        <CalorieChart meals={meals} goal={goals.dailyCalories} />

        {/* Tabs */}
        <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-100">
          <button
            onClick={() => setActiveTab("log")}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === "log"
                ? "bg-green-100 text-green-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Refeições
          </button>
          <button
            onClick={() => setActiveTab("report")}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === "report"
                ? "bg-green-100 text-green-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Relatório
          </button>
        </div>

        {activeTab === "log" && (
          <>
            {/* Meal Type Selector */}
            {isToday && <MealTypeSelector selected={mealType} onChange={setMealType} />}

            {/* Photo Upload */}
            {isToday && <PhotoUpload onAnalysisComplete={handleAnalysisComplete} />}

            {/* Meals List */}
            <div className="space-y-3">
              {meals.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-sm">Nenhuma refeição registrada</p>
                  <p className="text-xs mt-1">
                    Envie uma foto para começar a registrar
                  </p>
                </div>
              ) : (
                meals.map((meal) => (
                  <MealCard
                    key={meal.id}
                    meal={meal}
                    onDelete={handleDeleteMeal}
                  />
                ))
              )}
            </div>

            {/* Nutrition Table */}
            {dailyLog && <NutritionTable dailyLog={dailyLog} />}
          </>
        )}

        {activeTab === "report" && (
          <>
            {report ? (
              <DailyReport report={report} />
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p className="text-sm">Nenhum dado para gerar relatório</p>
                <p className="text-xs mt-1">
                  Registre refeições para ver o relatório diário
                </p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Goals Modal */}
      {showGoals && (
        <GoalsModal
          goals={goals}
          onSave={handleSaveGoals}
          onClose={() => setShowGoals(false)}
        />
      )}
    </div>
  );
}
