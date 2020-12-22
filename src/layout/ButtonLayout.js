import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors, mock, sizes } from "../theme/variables";

export default function ButtonLayout({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.listItem__footer}>
        <Text style={styles.listItem__footer__text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
  },
  listItem__footer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: "95%",
    backgroundColor: colors.ELEMENT_BACKGROUND,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "center",
  },
  listItem__footer__text: {
    color: colors.TEXT_PRIMARY,
    fontSize: 20,
    fontWeight: "bold",
  },
});
