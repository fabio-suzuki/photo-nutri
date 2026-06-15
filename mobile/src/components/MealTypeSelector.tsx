import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type MealType = "breakfast" | "lunch" | "dinner" | "snack";

interface MealTypeSelectorProps {
  selected: MealType;
  onChange: (type: MealType) => void;
}

const mealTypes: { type: MealType; label: string; emoji: string }[] = [
  { type: "breakfast", label: "Café", emoji: "☕" },
  { type: "lunch", label: "Almoço", emoji: "🍽️" },
  { type: "dinner", label: "Jantar", emoji: "🌙" },
  { type: "snack", label: "Lanche", emoji: "🍪" },
];

export function MealTypeSelector({ selected, onChange }: MealTypeSelectorProps) {
  return (
    <View style={styles.container}>
      {mealTypes.map(({ type, label, emoji }) => {
        const isSelected = selected === type;
        return (
          <TouchableOpacity
            key={type}
            onPress={() => onChange(type)}
            style={[styles.button, isSelected && styles.buttonSelected]}
          >
            <Text style={styles.emoji}>{emoji}</Text>
            <Text style={[styles.label, isSelected && styles.labelSelected]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    flex: 1,
    alignItems: "center",
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
    backgroundColor: "#f9fafb",
  },
  buttonSelected: {
    backgroundColor: "#dcfce7",
    borderColor: "#86efac",
  },
  emoji: {
    fontSize: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6b7280",
  },
  labelSelected: {
    color: "#15803d",
  },
});
