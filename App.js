import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";

import Tabs from "./navigation/tabs";
import Item from "./screens/client/Item";
import ItemLocation from "./screens/client/ItemLocation";
import Profile from "./screens/Investor/Profile";
import CreateInvestment from "./screens/Investor/CreateInvestment";
import SubscribedStartups from "./screens/Investor/SubscribedStartups";
import ViewPlan from "./screens/Investor/ViewPlan";
import Notifications from "./screens/Investor/Notifications";
import HomeInvestor from "./screens/Investor/HomeInvestor";
import ItemReviews from "./screens/client/ItemReviews";

const Stack = createStackNavigator();

const myOptions = {
  title: "Profile",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#0396FF",
  },
};

export default function App() {
  const type = "client";
  return (
    <NavigationContainer>
      {type === "client" ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          // initialRouteName={"Home"}
        >
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="Item" component={Item} />
          <Stack.Screen name="ItemLocation" component={ItemLocation} />
          <Stack.Screen name="ItemReviews" component={ItemReviews} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ ...myOptions, title: "Profile" }}
          />
          {/* <Stack.Screen name="ViewPlan" component={ViewPlan} options={{...myOptions, title:'ViewPlan'}}  /> */}
          <Stack.Screen
            name="CreateInvestment"
            component={CreateInvestment}
            options={{ ...myOptions, title: "CreateInvestment" }}
          />
          <Stack.Screen
            name="SubscribedStartups"
            component={SubscribedStartups}
            options={{ ...myOptions, title: "SubscribedStartups" }}
          />
        </Stack.Navigator>
      )}

      <StatusBar barStyle="light-content" />
    </NavigationContainer>
  );
}
