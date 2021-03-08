import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SessionScreen from "./src/screen/session/SessionScreen";
import CustomersScreen from "./src/screen/customer/CustomersScreen";
import AddCustomerScreen from "./src/screen/customer/AddCustomerScreen";
import DrawerLayout from "./src/layout/DrawerLayout";
import { colors, mock } from "./src/theme/variables";
import { StyleSheet } from "react-native";
import CustomerOverviewScreen from "./src/screen/customer/CustomerOverviewScreen";
import DrinkCategoriesScreen from "./src/screen/drinks/DrinkCategoriesScreen";
import AddDrinksScreen from "./src/screen/drinks/AddDrinkScreen";
import SessionBillScreen from "./src/screen/session/SessionBillScreen";
import PastSessionsScreen from "./src/screen/session/PastSessionsScreen";
import LoginScreen from "./src/screen/account/LoginScreen";

const DrawerNavigator = createDrawerNavigator();
const CustomersNavigator = createStackNavigator();
const PastNavigator = createStackNavigator();
const SessionNavigator = createStackNavigator();
const PaymentNavigator = createStackNavigator();
const StockNavigator = createStackNavigator();
const AccountNavigator = createStackNavigator();

export function CustomersStack() {
  return (
    <CustomersNavigator.Navigator
      headerMode="none"
      initialRouteName="Customers"
    >
      <CustomersNavigator.Screen name="Customers" component={CustomersScreen} />
      <CustomersNavigator.Screen
        name="Add new customer"
        component={AddCustomerScreen}
      />
      <CustomersNavigator.Screen
        name="Customer overview"
        component={CustomerOverviewScreen}
      />
    </CustomersNavigator.Navigator>
  );
}

export function PastStack() {
  return(
    <PastNavigator.Navigator headerMode="none" initialRouteName="Sessions Overview">
      <PastNavigator.Screen
        name="Sessions Overview"
        component={PastSessionsScreen}>
      </PastNavigator.Screen>
      <PastNavigator.Screen
        name="Past session"
        component={SessionScreen}/>
    </PastNavigator.Navigator>
  )
}

export function SessionStack() {
  return (
    <SessionNavigator.Navigator headerMode="none" intialRouteName="Current Session">
      <SessionNavigator.Screen
        name="Session"
        component={SessionScreen}
      />
      <SessionNavigator.Screen
        name="Drink Categories"
        component={DrinkCategoriesScreen}
      />
      <SessionNavigator.Screen
        name="Add Drink"
        component={AddDrinksScreen}
      />
      <SessionNavigator.Screen
        name="Session Bill"
        component={SessionBillScreen}
      />
    </SessionNavigator.Navigator>
  );
}

export function PaymentStack() {
  return (
    <PaymentNavigator.Navigator headerMode="none">

    </PaymentNavigator.Navigator>
  )
}

export function StockStack() {
  return (
    <StockNavigator.Navigator headerMode="none">
      
    </StockNavigator.Navigator>
  )
}

export function AccountStack() {
  return (
    <AccountNavigator.Navigator headerMode="none">
      <AccountNavigator.Screen
        name="Login"
        component={LoginScreen}
      />
    </AccountNavigator.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator.Navigator
        sceneContainerStyle={{ backgroundColor: "black" }}
        initialRouteName="Session"
        drawerStyle={styles.drawer}
        drawerContentOptions={{
          activeTintColor: colors.TEXT_PRIMARY,
          activeBackgroundColor: colors.ELEMENT_BACKGROUND_SELECTED,
          inactiveTintColor: colors.TEXT_PRIMARY,
          labelStyle: {
            fontSize: 30,
            fontWeight: "bold",
          },
        }}
      >
        <DrawerNavigator.Screen name="Session" component={SessionStack} />
        <DrawerNavigator.Screen name="Past" component={PastStack} />
        <DrawerNavigator.Screen name="Customers" component={CustomersStack} />
        <DrawerNavigator.Screen name="Payments" component={PaymentStack} />
        <DrawerNavigator.Screen name="Stock" component={StockStack} />
        <DrawerNavigator.Screen name="Account" component={AccountStack} />
      </DrawerNavigator.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: colors.ELEMENT_BACKGROUND,
    width: 240,
  },
  drawerItem: {},
});
