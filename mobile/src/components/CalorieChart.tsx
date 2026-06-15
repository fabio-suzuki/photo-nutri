import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { MealEntry } from "../types/nutrition";
import { getMealTypeLabel } from "../lib/nutrition-utils";

interface CalorieChartProps {
  meals: MealEntry[];
  goal: number;
}

const COLORS: Record<string, string> = {
  breakfast: "#fbbf24",
  lunch: "#4ade80",
  dinner: "#60a5fa",
  snack: "#c084fc",
};

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

  const strokeDasharray = `${percentage * 2.64} 264`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calorias do Dia</Text>
      <View style={styles.row}>
        <View style={styles.chartWrap}>
          <Svg width={112} height={112} viewBox="0 0 100 100" style={{ transform: [{ rotate: "-90deg" }] }}>
            <Circle cx={50} cy={50} r={42} fill="none" stroke="#f3f4f6" strokeWidth={12} />
            <Circle
              cx={50}
              cy={50}
              r={42}
              fill="none"
              stroke={overGoal ? "#f97316" : "#22c55e"}
              strokeWidth={12}
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
            />
          </Svg>
          <View style={styles.chartCenter}>
            <Text style={styles.chartValue}>{Math.round(totalCalories)}</Text>
            <Text style={styles.chartGoal}>/ {goal}</Text>
          </View>
        </View>
        <View style={styles.legend}>
          {Object.entries(mealTypeCalories).map(([type, cals]) => (
            <View key={type} style={styles.legendRow}>
              <View style={[styles.legendDot, { backgroundColor: COLORS[type] ?? "#9ca3af" }]} />
              <Text style={styles.legendLabel}>{getMealTypeLabel(type)}</Text>
              <Text style={styles.legendValue}>{Math.round(cals)} kcal</Text>
            </View>
          ))}
          {meals.length === 0 && (
            <Text style={styles.emptyText}>Nenhuma refeição registrada hoje</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  chartWrap: {
    width: 112,
    height: 112,
    position: "relative",
  },
  chartCenter: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  chartValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  chartGoal: {
    fontSize: 12,
    color: "#6b7280",
  },
  legend: {
    flex: 1,
    gap: 8,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendLabel: {
    fontSize: 12,
    color: "#4b5563",
    flex: 1,
  },
  legendValue: {
    fontSize: 12,
    fontWeight: "500",
    color: "#111827",
  },
  emptyText: {
    fontSize: 14,
    color: "#9ca3af",
  },
});
