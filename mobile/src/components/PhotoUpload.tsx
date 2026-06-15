import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { analyzeImage } from "../services/openai";
import { AnalysisResult } from "../types/nutrition";

interface PhotoUploadProps {
  onAnalysisComplete: (imageUri: string, result: AnalysisResult) => void;
}

export function PhotoUpload({ onAnalysisComplete }: PhotoUploadProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pickImage = async () => {
    const permResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permResult.granted) {
      setError("Permissão para acessar a galeria é necessária.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
      base64: false,
    });

    if (!result.canceled && result.assets[0]) {
      const uri = result.assets[0].uri;
      setPreview(uri);
      setError(null);
      await handleAnalyze(uri);
    }
  };

  const takePhoto = async () => {
    const permResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permResult.granted) {
      setError("Permissão para usar a câmera é necessária.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      base64: false,
    });

    if (!result.canceled && result.assets[0]) {
      const uri = result.assets[0].uri;
      setPreview(uri);
      setError(null);
      await handleAnalyze(uri);
    }
  };

  const handleAnalyze = async (uri: string) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const analysisResult = await analyzeImage(base64);
      onAnalysisComplete(uri, analysisResult);
      setPreview(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao analisar imagem");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📷 Registrar Refeição</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={takePhoto} style={styles.uploadButton}>
          <Text style={styles.uploadIcon}>📸</Text>
          <Text style={styles.uploadText}>Câmera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
          <Text style={styles.uploadIcon}>🖼️</Text>
          <Text style={styles.uploadText}>Galeria</Text>
        </TouchableOpacity>
      </View>

      {preview && (
        <View style={styles.previewWrap}>
          <Image source={{ uri: preview }} style={styles.previewImage} />
          {isAnalyzing && (
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.overlayText}>Analisando com IA...</Text>
            </View>
          )}
        </View>
      )}

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
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
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  uploadButton: {
    flex: 1,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingVertical: 24,
    alignItems: "center",
    gap: 8,
  },
  uploadIcon: {
    fontSize: 32,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  previewWrap: {
    marginTop: 16,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  overlayText: {
    color: "#fff",
    fontSize: 14,
  },
  errorBox: {
    marginTop: 16,
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: 8,
    padding: 12,
  },
  errorText: {
    color: "#b91c1c",
    fontSize: 14,
  },
});
