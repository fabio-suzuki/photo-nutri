import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DailyReport as DailyReportType } from "../types/nutrition";

interface DailyReportProps {
  report: DailyReportType;
}

export function DailyReport({ report }: DailyReportProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório Diário</Text>

      {/* Caloric Balance */}
      <View
        style={[
          styles.balanceBanner,
          report.isDeficit ? styles.deficitBg : styles.surplusBg,
        ]}
      >
        <Text style={styles.bannerIcon}>
          {report.isDeficit ? "📉" : "📈"}
        </Text>
        <View>
          <Text
            style={[
              styles.bannerTitle,
              report.isDeficit ? styles.deficitText : styles.surplusText,
            ]}
          >
            {report.isDeficit ? "Déficit Calórico" : "Superávit Calórico"}
          </Text>
          <Text style={styles.bannerSub}>
            {report.caloriesConsumed} kcal consumidas / {report.caloricGoal} kcal meta
          </Text>
          <Text
            style={[
              styles.bannerBalance,
              report.isDeficit ? styles.deficitText : styles.surplusText,
            ]}
          >
            {report.isDeficit ? "" : "+"}
            {Math.round(report.caloricBalance)} kcal
          </Text>
        </View>
      </View>

      {/* Nutrients Within Range */}
      {report.nutrientsWithinRange.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            ✅ Nutrientes no Ideal ({report.nutrientsWithinRange.length})
          </Text>
          <View style={styles.badgeWrap}>
            {report.nutrientsWithinRange.map((n) => (
              <View key={n.name} style={[styles.badge, styles.badgeGreen]}>
                <Text style={styles.badgeGreenText}>
                  {n.name} ({Math.round(n.percentage)}%)
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Nutrients Outside Range */}
      {report.nutrientsOutsideRange.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            ⚠️ Nutrientes Fora do Ideal ({report.nutrientsOutsideRange.length})
          </Text>
          <View style={styles.badgeWrap}>
            {report.nutrientsOutsideRange.map((n) => {
              const isLow = n.percentage < 80;
              return (
                <View
                  key={n.name}
                  style={[styles.badge, isLow ? styles.badgeRed : styles.badgeOrange]}
                >
                  <Text style={isLow ? styles.badgeRedText : styles.badgeOrangeText}>
                    {n.name} ({Math.round(n.percentage)}%)
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      )}

      {/* Deficient Nutrients */}
      {report.deficientNutrients.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: "#b91c1c" }]}>
            ⚠️ Nutrientes Deficientes ({report.deficientNutrients.length})
          </Text>
          {report.deficientNutrients.map((n) => (
            <View key={n.name} style={styles.deficientRow}>
              <Text style={styles.deficientName}>{n.name}</Text>
              <Text style={styles.deficientValue}>
                {Math.round(n.amount)} / {n.dailyRecommended} {n.unit} ({Math.round(n.percentage)}%)
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Suggestions */}
      {report.suggestions.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Sugestões de Alimentos</Text>
          {report.suggestions.map((suggestion, idx) => (
            <View key={idx} style={styles.suggestionBox}>
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </View>
          ))}
        </View>
      )}
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
    gap: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  balanceBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  deficitBg: {
    backgroundColor: "#eff6ff",
    borderColor: "#dbeafe",
  },
  surplusBg: {
    backgroundColor: "#fff7ed",
    borderColor: "#fed7aa",
  },
  bannerIcon: {
    fontSize: 32,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  deficitText: {
    color: "#1d4ed8",
  },
  surplusText: {
    color: "#c2410c",
  },
  bannerSub: {
    fontSize: 13,
    color: "#4b5563",
    marginTop: 2,
  },
  bannerBalance: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  badgeWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeGreen: {
    backgroundColor: "#f0fdf4",
  },
  badgeGreenText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#15803d",
  },
  badgeRed: {
    backgroundColor: "#fef2f2",
  },
  badgeRedText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#b91c1c",
  },
  badgeOrange: {
    backgroundColor: "#fff7ed",
  },
  badgeOrangeText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#c2410c",
  },
  deficientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#fef2f2",
    borderRadius: 8,
  },
  deficientName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#991b1b",
  },
  deficientValue: {
    fontSize: 12,
    color: "#dc2626",
  },
  suggestionBox: {
    padding: 12,
    backgroundColor: "#fffbeb",
    borderWidth: 1,
    borderColor: "#fef3c7",
    borderRadius: 8,
  },
  suggestionText: {
    fontSize: 13,
    color: "#374151",
    lineHeight: 20,
  },
});
