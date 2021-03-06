import React from "react";
import { SafeAreaView } from "react-native";
import * as api from "../../service/BarApiService.js";
import { StyleSheet, Text, View, Image } from "react-native";
import variables, { colors, mock } from "../../theme/variables.js";
import { Button } from "react-native";
import StackHeaderLayout from "../../layout/StackHeaderLayout.js";

export default function CustomerOverviewScreen({ route, navigation }) {
  const customer = api.getCustomerById(route.params);
  return (
    <SafeAreaView style={styles.container}>
      <StackHeaderLayout navigation={navigation} title={customer.name} />
      <View style={styles.content}>
        <Text style={styles.text}>{customer.id}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.BACKGROUND,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.TEXT_TERTIARY,
    fontSize: 50,
    fontWeight: "bold",
  },
});
