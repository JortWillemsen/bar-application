import React from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import variables, { colors, mock } from "../theme/variables.js";
import { Button } from "react-native";
import HeaderLayout from "../layout/HeaderLayout";
import StackHeaderLayout from "../layout/StackHeaderLayout.js";
import TitleLayout from "../layout/TitleLayout.js";
import { TextInput } from "react-native";
import ButtonLayout from "../layout/ButtonLayout.js";

export default function AddCustomerScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StackHeaderLayout navigation={navigation} title="Add Customer" />
      <TitleLayout title="Add Customer" />
      <View style={styles.content}>
        <TextInput
          autoCapitalize="words"
          placeholderTextColor={colors.TEXT_SECONDARY}
          placeholder="Name"
          style={styles.input}
        ></TextInput>
        <TextInput
          name="telNumber"
          textContentType="telephoneNumber"
          autoCapitalize="words"
          placeholderTextColor={colors.TEXT_SECONDARY}
          placeholder="Phone number"
          keyboardType="number-pad"
          style={styles.input}
          maxLength={10}
        ></TextInput>
        <ButtonLayout
          title="Add customer"
          onPress={() => {
            addCustomer(navigation);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

function addCustomer(navigation) {
  navigation.navigate("Customers");
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
    justifyContent: "flex-start",
    width: "100%",
    alignItems: "center",
  },
  confirmButton: {
    width: "95%",
  },
  text: {
    color: colors.TEXT_TERTIARY,
    fontSize: 50,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 20,
    fontSize: 20,
    padding: 10,
    color: colors.TEXT_PRIMARY,
    borderColor: colors.INPUT_BORDER,
    borderWidth: 2,
    height: 50,
    borderRadius: 7,
    width: "95%",
  },
});
