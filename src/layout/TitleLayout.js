import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, mock, sizes } from "../theme/variables";

export default function TitleLayout({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "95%",
    height: 45,
    marginTop: 10,
    marginBottom: 15,
    justifyContent: "center",
    borderBottomColor: colors.ELEMENT_BACKGROUND,
    borderBottomWidth: 4,
  },
  title: {
    height: 40,

    color: colors.TEXT_PRIMARY,
    fontSize: sizes.TITLE,
    fontWeight: "bold",
  },
});
