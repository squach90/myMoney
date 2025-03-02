import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AddProps {
  onClose: () => void;
}

export default function Add({ onClose }: AddProps) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Money</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInputEmoji} placeholder="😃" />
          <TextInput
            style={styles.textInputSalary}
            placeholder="Salary"
            keyboardType="default"
          />
        </View>
        <TextInput
          style={styles.textInputAmount}
          placeholder="168.90€"
          keyboardType="numeric"
        />
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <View style={styles.buttonContent}>
              <Ionicons name="close-outline" size={30} color="#000" />
              <Text style={styles.buttonText}>Close</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button2}>
            <View style={styles.buttonContent}>
              <Ionicons
                name="arrow-up-outline"
                size={30}
                color="#000"
                style={{ transform: [{ rotate: "45deg" }] }}
              />
              <Text style={styles.buttonText}>Add</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    borderRadius: 20,
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    margin: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInputEmoji: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 50,
    marginLeft: 26,
    marginRight: 10,
    textAlign: "center",
    borderColor: "#F0F0F0",
    backgroundColor: "#F5F5F5",
  },
  textInputSalary: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 26,
    borderColor: "#C2C2C2",
    backgroundColor: "#F9F9F9",
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
    marginLeft: 60,
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
