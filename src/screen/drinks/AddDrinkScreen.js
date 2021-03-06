import React, { useEffect, useState } from "react";
import * as api from "../../service/BarApiService.js";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList,
} from "react-native";
import variables, { colors, mock, sizes } from "../../theme/variables.js";
import StackHeaderLayout from "../../layout/StackHeaderLayout";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ceil } from "react-native-reanimated";

export default function AddDrinksScreen({ route, navigation }) {
  const [drinks, setDrinks] = useState([]);
  const { customer, category } = route.params;

  useEffect(() => {
    api.getDrinksByCategory(category)
  .then((json) => setDrinks(json))
  .catch((error) => alert(error));
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StackHeaderLayout navigation={navigation} />
      <Text style={styles.title}>{category.name}</Text>
      <View style={styles.content}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          data={drinks}
          renderItem={({ item }) => listItem(navigation, item, customer)}
        />
      </View>
    </SafeAreaView>
  );
}

function listItem(navigation, drink, customer) {
  return (
    <TouchableOpacity
      onPress={() => handlePress(navigation, drink, customer)}
    >
      <View style={styles.listItem}>
        <Text style={styles.listItem__name}>{drink.brand} {drink.name}</Text>
        <Text style={styles.listItem__price}>€{drink.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

function handlePress(navigation, drink, customer) {
  api.addDrink(customer, drink);
  
  navigation.navigate("Session");
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.BACKGROUND,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  content: {
    flex: 1,
    width: "100%",
  },
  title: {
    height: 40,
    margin: 10,
    color: colors.TEXT_PRIMARY,
    fontSize: sizes.TITLE,
    fontWeight: "bold",
  },
  list: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
  },
  listItem: {
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.BACKGROUND,
    borderBottomColor: colors.ELEMENT_BACKGROUND,
    borderBottomWidth: 2,
    paddingVertical: 10,
    width: "95%",
  },
  listItem__name: {
    fontSize: 20,
    color: colors.TEXT_PRIMARY,
    width: "80%",
  },
  listItem__price: {
    fontSize: 20,
    color: colors.TEXT_PRIMARY,
    fontWeight: "bold",
    marginLeft: "auto",
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
    color: colors.TEXT_SECONDARY,
    fontSize: 20,
    fontWeight: "bold",
  },
});
