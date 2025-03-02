import React from "react";
import { StyleSheet, Text, View } from "react-native";

let today = new Date().toLocaleDateString();

interface TransactionProps {
  entry: {
    emoji: string;
    title: string;
    amount: number;
  };
}

export default function TransactionCard({ entry }: TransactionProps) {
  return (
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
      <View style={transactionCardStyles.priceContainer}>
        {entry.amount > 0 && (
          <Text style={transactionCardStyles.moneyTextGreen}>
            {entry.amount}€
          </Text>
        )}
        {entry.amount < 0 && (
          <Text style={transactionCardStyles.moneyText}>{entry.amount}€</Text>
        )}
      </View>
    </View>
  );
}

const transactionCardStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  emojieView: {
    flexDirection: "row",
    width: 52,
    height: 52,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  topText: {
    fontSize: 20,
    fontWeight: "600",
  },
  bottomText: {
    fontSize: 16,
    color: "#888888",
  },
  priceContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  moneyText: {
    fontSize: 20,
    fontWeight: "600",
  },
  moneyTextGreen: {
    fontSize: 20,
    fontWeight: "600",
    color: "#22950E",
  },
});
