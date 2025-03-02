import AddPanel from "./components/Add";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

let goal = 0;
let current = 0;
let percent = 0;

export default function Index() {
  const [isAddPanelVisible, setAddPanelVisible] = useState(false);

  const handleAddPress = () => {
    setAddPanelVisible(true);
  };

  const handleCloseAddPanel = () => {
    setAddPanelVisible(false);
  };

  return (
    <View style={mainStyles.container}>
      {isAddPanelVisible && (
        <View style={styles.overlay}>
          <AddPanel onClose={handleCloseAddPanel} />
        </View>
      )}
      <View style={[moneyInfo.container, moneyInfo.shadowProp]}>
        <View style={moneyInfo.content}>
          <View style={moneyInfo.textContainer}>
            <Text style={moneyInfo.amount}>{current}€</Text>
            <Text style={moneyInfo.total}>{goal}€</Text>
          </View>
          <Text style={moneyInfo.percentageText}>{percent}%</Text>
        </View>
        <View style={moneyInfo.buttons}>
          <TouchableOpacity style={moneyInfo.button} onPress={handleAddPress}>
            <View style={moneyInfo.buttonContent}>
              <Ionicons
                name="arrow-up-outline"
                size={24}
                color="#000"
                style={{ transform: [{ rotate: "45deg" }] }}
              />
              <Text style={moneyInfo.buttonText}>Add</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={moneyInfo.button}>
            <View style={moneyInfo.buttonContent}>
              <Ionicons
                name="arrow-up-outline"
                size={24}
                color="#000"
                style={{ transform: [{ rotate: "135deg" }] }}
              />
              <Text style={moneyInfo.buttonText}>Remove</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={moneyInfo.button}>
            <Ionicons name="ribbon-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={mainStyles.hairline} />
    </View>
  );
}

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 35,
    marginTop: 60,
    backgroundColor: "#F7F7F7",
  },
  hairline: {
    marginTop: 20,
    backgroundColor: "#000000",
    opacity: 0.2,
    height: 1.5,
    width: "100%",
  },
});

const moneyInfo = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 15,
    width: "100%",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  amount: {
    fontSize: 40,
    fontWeight: "600",
    fontFamily: "Inter",
  },
  total: {
    fontSize: 32,
    color: "#888888",
    fontWeight: "600",
    fontFamily: "Inter",
  },
  percentageText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter",
    marginLeft: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    alignItems: "center",
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

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    zIndex: 10,
  },
});
