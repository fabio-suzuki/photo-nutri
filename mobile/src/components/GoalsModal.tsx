import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { UserGoals } from "../types/nutrition";

interface GoalsModalProps {
  visible: boolean;
  goals: UserGoals;
  onSave: (goals: UserGoals) => void;
  onClose: () => void;
}

export function GoalsModal({ visible, goals, onSave, onClose }: GoalsModalProps) {
  const [form, setForm] = useState<UserGoals>(goals);

  const handleSave = () => {
    onSave(form);
  };

  const fields: { key: keyof UserGoals; label: string; unit: string }[] = [
    { key: "dailyCalories", label: "Calorias", unit: "kcal" },
    { key: "protein", label: "Proteína", unit: "g" },
    { key: "carbs", label: "Carboidratos", unit: "g" },
    { key: "fat", label: "Gordura", unit: "g" },
    { key: "fiber", label: "Fibra", unit: "g" },
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Metas Diárias</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body}>
            {fields.map(({ key, label, unit }) => (
              <View key={key} style={styles.field}>
                <Text style={styles.label}>
                  {label} ({unit})
                </Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={String(form[key])}
                  onChangeText={(text) =>
                    setForm({ ...form, [key]: Number(text) || 0 })
                  }
                />
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveText}>Salvar Metas</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: "90%",
    maxWidth: 400,
    maxHeight: "80%",
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  closeIcon: {
    fontSize: 20,
    color: "#9ca3af",
    padding: 4,
  },
  body: {
    gap: 12,
  },
  field: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#111827",
  },
  saveButton: {
    backgroundColor: "#16a34a",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
