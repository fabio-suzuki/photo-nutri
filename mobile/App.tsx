import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalorieChart } from "./src/components/CalorieChart";
import { MealTypeSelector } from "./src/components/MealTypeSelector";
import { PhotoUpload } from "./src/components/PhotoUpload";
import { MealCard } from "./src/components/MealCard";
import { NutritionTable } from "./src/components/NutritionTable";
import { DailyReport } from "./src/components/DailyReport";
import { GoalsModal } from "./src/components/GoalsModal";
import { MealEntry, AnalysisResult, DailyReport as DailyReportType, UserGoals } from "./src/types/nutrition";
import { saveMeal, getMealsByDate, deleteMeal, getUserGoals, saveUserGoals } from "./src/lib/storage";
import { calculateDailyTotals, generateDailyReport, formatDate } from "./src/lib/nutrition-utils";

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealType, setMealType] = useState<"breakfast" | "lunch" | "dinner" | "snack">("lunch");
  const [showGoals, setShowGoals] = useState(false);
  const [activeTab, setActiveTab] = useState<"log" | "report">("log");
  const [meals, setMeals] = useState<MealEntry[]>([]);
  const [goals, setGoals] = useState<UserGoals>({
    dailyCalories: 2000,
    protein: 50,
    carbs: 300,
    fat: 65,
    fiber: 25,
  });

  const dateStr = formatDate(selectedDate);
  const isToday = formatDate(selectedDate) === formatDate(new Date());

  const loadData = useCallback(async () => {
    const [loadedMeals, loadedGoals] = await Promise.all([
      getMealsByDate(dateStr),
      getUserGoals(),
    ]);
    setMeals(loadedMeals);
    setGoals(loadedGoals);
  }, [dateStr]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const dailyLog = useMemo(() => {
    if (meals.length === 0) return null;
    return calculateDailyTotals(meals);
  }, [meals]);

  const report: DailyReportType | null = useMemo(() => {
    if (!dailyLog) return null;
    return generateDailyReport(dailyLog, goals);
  }, [dailyLog, goals]);

  const handleAnalysisComplete = async (imageUri: string, result: AnalysisResult) => {
    const newMeal: MealEntry = {
      id: `meal-${Date.now()}`,
      timestamp: new Date().toISOString(),
      imageUrl: imageUri,
      foods: result.foods,
      totalCalories: result.totalCalories,
      mealType,
    };
    await saveMeal(newMeal);
    await loadData();
  };

  const handleDeleteMeal = async (id: string) => {
    await deleteMeal(id);
    await loadData();
  };

  const handleSaveGoals = async (newGoals: UserGoals) => {
    await saveUserGoals(newGoals);
    setShowGoals(false);
    await loadData();
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

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerIcon}>🍏</Text>
          <Text style={styles.headerTitle}>PhotoNutri</Text>
        </View>
        <TouchableOpacity onPress={() => setShowGoals(true)} style={styles.settingsBtn}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Date Navigation */}
        <View style={styles.dateNav}>
          <TouchableOpacity onPress={goToPreviousDay} style={styles.navBtn}>
            <Text style={styles.navIcon}>‹</Text>
          </TouchableOpacity>
          <View style={styles.dateCenter}>
            <Text style={styles.datePrimary}>
              {isToday ? "Hoje" : format(selectedDate, "EEEE", { locale: ptBR })}
            </Text>
            <Text style={styles.dateSecondary}>
              {format(selectedDate, "d 'de' MMMM, yyyy", { locale: ptBR })}
            </Text>
          </View>
          <TouchableOpacity
            onPress={goToNextDay}
            disabled={isToday}
            style={[styles.navBtn, isToday && styles.navBtnDisabled]}
          >
            <Text style={[styles.navIcon, isToday && styles.navIconDisabled]}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Calorie Chart */}
        <CalorieChart meals={meals} goal={goals.dailyCalories} />

        {/* Tabs */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            onPress={() => setActiveTab("log")}
            style={[styles.tab, activeTab === "log" && styles.tabActive]}
          >
            <Text style={[styles.tabText, activeTab === "log" && styles.tabTextActive]}>
              Refeições
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("report")}
            style={[styles.tab, activeTab === "report" && styles.tabActive]}
          >
            <Text style={[styles.tabText, activeTab === "report" && styles.tabTextActive]}>
              Relatório
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "log" && (
          <>
            {isToday && <MealTypeSelector selected={mealType} onChange={setMealType} />}
            {isToday && <PhotoUpload onAnalysisComplete={handleAnalysisComplete} />}

            {meals.length === 0 ? (
              <View style={styles.empty}>
                <Text style={styles.emptyTitle}>Nenhuma refeição registrada</Text>
                <Text style={styles.emptySub}>Envie uma foto para começar a registrar</Text>
              </View>
            ) : (
              meals.map((meal) => (
                <MealCard key={meal.id} meal={meal} onDelete={handleDeleteMeal} />
              ))
            )}

            {dailyLog && <NutritionTable dailyLog={dailyLog} />}
          </>
        )}

        {activeTab === "report" && (
          <>
            {report ? (
              <DailyReport report={report} />
            ) : (
              <View style={styles.empty}>
                <Text style={styles.emptyTitle}>Nenhum dado para gerar relatório</Text>
                <Text style={styles.emptySub}>Registre refeições para ver o relatório diário</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Goals Modal */}
      <GoalsModal
        visible={showGoals}
        goals={goals}
        onSave={handleSaveGoals}
        onClose={() => setShowGoals(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerIcon: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  settingsBtn: {
    padding: 8,
  },
  settingsIcon: {
    fontSize: 20,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
    paddingBottom: 48,
  },
  dateNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  navBtn: {
    padding: 4,
  },
  navBtnDisabled: {
    opacity: 0.3,
  },
  navIcon: {
    fontSize: 24,
    color: "#4b5563",
    fontWeight: "600",
  },
  navIconDisabled: {
    color: "#d1d5db",
  },
  dateCenter: {
    alignItems: "center",
  },
  datePrimary: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  dateSecondary: {
    fontSize: 12,
    color: "#6b7280",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#dcfce7",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
  },
  tabTextActive: {
    color: "#15803d",
  },
  empty: {
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyTitle: {
    fontSize: 14,
    color: "#9ca3af",
  },
  emptySub: {
    fontSize: 12,
    color: "#d1d5db",
    marginTop: 4,
  },
});
