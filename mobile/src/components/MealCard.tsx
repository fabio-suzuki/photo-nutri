import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MealEntry } from "../types/nutrition";
import { getMealTypeLabel } from "../lib/nutrition-utils";

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
    <View style={styles.container}>
      <View style={styles.row}>
        {meal.imageUrl ? (
          <Image source={{ uri: meal.imageUrl }} style={styles.image} />
        ) : null}
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{getMealTypeLabel(meal.mealType)}</Text>
            </View>
            <TouchableOpacity onPress={() => onDelete(meal.id)}>
              <Text style={styles.deleteIcon}>🗑️</Text>
            </TouchableOpacity>
          </View>
          {meal.foods.map((food) => (
            <Text key={food.id} style={styles.foodName} numberOfLines={1}>
              {food.name}
            </Text>
          ))}
          <View style={styles.footer}>
            <Text style={styles.time}>🕐 {time}</Text>
            <Text style={styles.calories}>{meal.totalCalories} kcal</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f3f4f6",
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    backgroundColor: "#f0fdf4",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#15803d",
  },
  deleteIcon: {
    fontSize: 16,
  },
  foodName: {
    fontSize: 14,
    color: "#374151",
    marginTop: 4,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
  time: {
    fontSize: 12,
    color: "#6b7280",
  },
  calories: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
  },
});
