import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DailyLog } from "../types/nutrition";

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

  const getColor = (pct: number): string => {
    if (pct >= 80 && pct <= 120) return "#16a34a";
    if (pct < 50) return "#dc2626";
    if (pct > 120) return "#ea580c";
    return "#ca8a04";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tabela Nutricional do Dia</Text>

      <View style={styles.headerRow}>
        <Text style={[styles.headerCell, styles.nameCol]}>Nutriente</Text>
        <Text style={[styles.headerCell, styles.valueCol]}>Consumido</Text>
        <Text style={[styles.headerCell, styles.valueCol]}>Ideal</Text>
        <Text style={[styles.headerCell, styles.pctCol]}>%</Text>
      </View>

      {nutrients.map((n) => {
        const pct = Math.round((n.value / n.recommended) * 100);
        return (
          <View key={n.label} style={styles.dataRow}>
            <Text style={[styles.cell, styles.nameCol]}>{n.label}</Text>
            <Text style={[styles.cell, styles.valueCol]}>
              {Math.round(n.value)} {n.unit}
            </Text>
            <Text style={[styles.cell, styles.valueCol, { color: "#6b7280" }]}>
              {n.recommended} {n.unit}
            </Text>
            <Text style={[styles.cell, styles.pctCol, { color: getColor(pct), fontWeight: "600" }]}>
              {pct}%
            </Text>
          </View>
        );
      })}

      <View style={styles.legend}>
        <LegendItem color="#16a34a" label="Ideal (80-120%)" />
        <LegendItem color="#ca8a04" label="Atenção (50-80%)" />
        <LegendItem color="#dc2626" label="Deficiente (<50%)" />
        <LegendItem color="#ea580c" label="Excesso (>120%)" />
      </View>
    </View>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
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
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    paddingBottom: 8,
    marginBottom: 4,
  },
  headerCell: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6b7280",
  },
  dataRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#fafafa",
  },
  cell: {
    fontSize: 13,
    color: "#111827",
  },
  nameCol: {
    flex: 3,
  },
  valueCol: {
    flex: 2,
    textAlign: "right",
  },
  pctCol: {
    flex: 1,
    textAlign: "right",
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    color: "#6b7280",
  },
});
