import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

interface SettingsProps {
  onClose: () => void;
  loadEntries: () => Promise<void>;
}

export default function Settings({ onClose, loadEntries }: SettingsProps) {
  const [current, setCurrent] = useState(0);
  const [goal, setGoal] = useState(0);
  const [percent, setPercent] = useState(0);
  const [entries, setEntries] = useState<
    { emoji: string; title: string; amount: number }[]
  >([]);

  const resetValues = async () => {
    try {
      await AsyncStorage.removeItem("entries");
      await AsyncStorage.removeItem("goal");
      setEntries([]);
      setCurrent(0);
      setGoal(0);
      setPercent(0);
      Alert.alert("Succès", "Les valeurs ont été réinitialisées.");
      loadEntries(); // Ajoutez cet appel pour rafraîchir les valeurs
    } catch (error) {
      console.error("Error resetting values:", error);
      Alert.alert(
        "Erreur",
        "Une erreur s'est produite lors de la réinitialisation des valeurs."
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Paramètres</Text>
          <TouchableOpacity style={styles.button} onPress={resetValues}>
            <View style={styles.buttonContent}>
              <Ionicons name="refresh-outline" size={24} color="#000" />
              <Text style={styles.buttonText}>Reset</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <View style={styles.buttonContent}>
              <Ionicons name="close-outline" size={30} color="#000" />
              <Text style={styles.buttonText}>Close</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: "-5%", // Dépasse en haut
    left: "-5%", // Dépasse sur la gauche
    right: "-5%", // Dépasse sur la droite
    bottom: "-5%", // Dépasse en bas
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    width: "110%", // Augmente la largeur
    height: "110%", // Augmente la hauteur
    zIndex: 10,
  },
  container: {
    borderRadius: 20,
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    margin: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
    width: "80%",
    alignSelf: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Inter",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 8,
  },
});
