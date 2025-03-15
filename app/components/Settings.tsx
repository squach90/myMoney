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
      console.log("Values have been reset to initial state");
      await loadEntries(); // Rafraîchit les valeurs
      onClose(); // Ferme le panneau
    } catch (error) {
      console.error("Error resetting values:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <View style={styles.buttonContent}>
              <Ionicons name="close-outline" size={30} color="#000" />
              <Text style={styles.buttonText}>Close</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button2}
            onPress={() =>
              Alert.alert(
                "Confirmation",
                "Are you sure you want to reset all values?",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Yes",
                    onPress: resetValues,
                  },
                ]
              )
            }
          >
            <View style={styles.buttonContent}>
              <Ionicons name="refresh-circle-outline" size={30} color="#000" />
              <Text style={styles.buttonText}>Reset</Text>
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
  textInputAmount: {
    height: 40,
    margin: 12,
    marginRight: 26,
    marginLeft: 26,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#F9F9F9",
    borderColor: "#C2C2C2",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 45,
    marginRight: 10,
  },
  button2: {
    padding: 10,
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    alignItems: "center",
    marginRight: 60,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Inter",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 8, // Ajoutez un espacement entre l'icône et le texte
  },
});
