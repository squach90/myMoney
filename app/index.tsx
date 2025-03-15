import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import AddPanel from "./components/Add";
import TransactionCard from "./components/Transaction";
import GoalPanel from "./components/Goal";
import RemovePanel from "./components/Remove";
import Settings from "./components/Settings";

export default function Index() {
  useEffect(() => {
    loadEntries();
  }, []);

  const [isAddPanelVisible, setAddPanelVisible] = useState(false);
  const [isGoalPanelVisible, setGoalPanelVisible] = useState(false);
  const [isRemovePanelVisible, setRemovePanelVisible] = useState(false);
  const [isSettingsPanelVisible, setSettingsPanelVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [goal, setGoal] = useState(0);
  const [percent, setPercent] = useState(0);
  const [entries, setEntries] = useState<
    { emoji: string; title: string; amount: number }[]
  >([]);

  useEffect(() => {
    if (goal > 0) {
      setPercent(parseFloat(((current / goal) * 100).toFixed(2)));
    } else {
      setPercent(0);
    }
  }, [current, goal]);

  const loadEntries = async () => {
    const storedEntries = await AsyncStorage.getItem("entries");
    const storedGoal = await AsyncStorage.getItem("goal");
    if (storedEntries) {
      const parsedEntries = JSON.parse(storedEntries);
      setEntries(parsedEntries);
      const total = parsedEntries.reduce(
        (sum: any, entry: { amount: any }) => sum + entry.amount,
        0
      );
      setCurrent(total);
    } else {
      setEntries([]);
      setCurrent(0);
    }
    if (storedGoal) {
      setGoal(parseFloat(storedGoal));
    } else {
      setGoal(0);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
    if (goal > 0) {
      setPercent(parseFloat(((current / goal) * 100).toFixed(2)));
    } else {
      setPercent(0);
    }
  }, [current, goal]);

  const handleAddPress = () => {
    setAddPanelVisible(true);
  };

  const handleCloseAddPanel = () => {
    setAddPanelVisible(false);
  };

  const handleGoalPress = () => {
    setGoalPanelVisible(true);
  };

  const handleCloseGoalPanel = () => {
    setGoalPanelVisible(false);
  };

  const handleRemovePress = () => {
    setRemovePanelVisible(true);
  };

  const handleCloseRemovePanel = () => {
    setRemovePanelVisible(false);
  };

  const handleSettingsPress = () => {
    setSettingsPanelVisible(true);
  };

  const handleCloseSettingsPanel = () => {
    setSettingsPanelVisible(false);
  };

  const handleAddEntry = async (entry: {
    emoji: string;
    title: string;
    amount: number;
  }) => {
    const newEntries = [...entries, entry];
    setEntries(newEntries);
    const newCurrent = current + entry.amount;
    setCurrent(newCurrent);
    await AsyncStorage.setItem("entries", JSON.stringify(newEntries));
    setAddPanelVisible(false);
  };

  const handleRemoveEntry = async (entry: {
    emoji: string;
    title: string;
    amount: number;
  }) => {
    const newEntries = [...entries, { ...entry, amount: -entry.amount }];
    setEntries(newEntries);
    const newCurrent = current - entry.amount;
    setCurrent(newCurrent);
    await AsyncStorage.setItem("entries", JSON.stringify(newEntries));
    setRemovePanelVisible(false);
  };

  const handleSetGoal = async (newGoal: number) => {
    setGoal(newGoal);
    await AsyncStorage.setItem("goal", newGoal.toString());
    setGoalPanelVisible(false);
  };

  const resetValues = async () => {
    try {
      await AsyncStorage.removeItem("entries");
      await AsyncStorage.removeItem("goal");
      setEntries([]);
      setCurrent(0);
      setGoal(0);
      setPercent(0);
      console.log("Values have been reset to initial state");
      loadEntries(); // Ajoutez cet appel pour rafraîchir les valeurs
    } catch (error) {
      console.error("Error resetting values:", error);
    }
  };

  //resetValues();

  return (
    <View style={mainStyles.container}>
      {isAddPanelVisible && (
        <View style={styles.overlay}>
          <View style={styles.panelContainer}>
            <AddPanel
              onClose={handleCloseAddPanel}
              onAddEntry={handleAddEntry}
            />
          </View>
        </View>
      )}
      {isGoalPanelVisible && (
        <View style={styles.overlay}>
          <View style={styles.panelContainer}>
            <GoalPanel
              onClose={handleCloseGoalPanel}
              onSetGoal={handleSetGoal}
            />
          </View>
        </View>
      )}
      {isRemovePanelVisible && (
        <View style={styles.overlay}>
          <View style={styles.panelContainer}>
            <RemovePanel
              onClose={handleCloseRemovePanel}
              onRemoveEntry={handleRemoveEntry}
            />
          </View>
        </View>
      )}
      {isSettingsPanelVisible && (
        <View style={styles.overlay}>
          <View style={styles.panelContainer}>
            <Settings
              onClose={handleCloseSettingsPanel}
              loadEntries={loadEntries}
            />
          </View>
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
          <TouchableOpacity
            style={moneyInfo.button}
            onPress={handleRemovePress}
          >
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
          <TouchableOpacity style={moneyInfo.button} onPress={handleGoalPress}>
            <Ionicons name="ribbon-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={mainStyles.hairline} />
      <Text style={mainStyles.title}>Transactions</Text>
      <ScrollView style={transactionStyles.scrollContainer}>
        {entries.length > 0 ? (
          entries.map((entry, index) => (
            <TransactionCard key={index} entry={entry} />
          ))
        ) : (
          <Text style={transactionStyles.emptyText}>
            This is where it all begins 📍
          </Text>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={handleSettingsPress}
      >
        <Ionicons name="settings-outline" size={30} color="#000" />
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 10,
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
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    left: -35,
    top: -60,
    width: "121%",
    height: "120%",
  },
  panelContainer: {
    width: "80%", // Ajustez la largeur du panneau
    height: "30%", // Ajustez la hauteur du panneau
    backgroundColor: "#FFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});

const transactionStyles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    textAlign: "center",
  },
});
