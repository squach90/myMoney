import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

let today = new Date().toLocaleDateString();

interface TransactionProps {
  entry: {
    emoji: string;
    title: string;
    amount: number;
  };
  onDelete: (entry: { emoji: string; title: string; amount: number }) => void;
}

export default function TransactionCard({ entry, onDelete }: TransactionProps) {
  const renderRightActions = () => (
    <View style={styles.rightAction}>
      <TouchableOpacity onPress={() => onDelete(entry)}>
        <Ionicons name="trash-outline" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <View style={transactionCardStyles.container}>
          <View style={transactionCardStyles.emojieView}>
            {entry.emoji ? (
              <Text style={{ fontSize: 32 }}>{entry.emoji}</Text>
            ) : (
              <Text style={{ fontSize: 32 }}>{entry.title.charAt(0)}</Text>
            )}
          </View>
          <View style={transactionCardStyles.textContainer}>
            <Text style={transactionCardStyles.topText}>{entry.title}</Text>
            <Text style={transactionCardStyles.bottomText}>{today}</Text>
          </View>
          <Text style={transactionCardStyles.amountText}>{entry.amount}€</Text>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rightAction: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: 20,
    width: 40,
    height: "50%",
    borderRadius: 10,
  },
});

const transactionCardStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#F7F7F7",

    borderRadius: 10,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  emojieView: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  topText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomText: {
    fontSize: 12,
    color: "gray",
  },
  amountText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
