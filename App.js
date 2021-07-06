import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, EvilIcons } from "@expo/vector-icons";

// import Tabss from "./navigation/tabs";
import Home from "./screens/client/home";
import Profile from "./screens/Investor/Profile";
import CreateInvestment from "./screens/Investor/CreateInvestment";
import SubscribedStartups from "./screens/Investor/SubscribedStartups";
import ViewPlan from "./screens/Investor/ViewPlan";
import Notifications from "./screens/Investor/Notifications";
import HomeInvestor from "./screens/Investor/HomeInvestor";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const RootHome = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#e1e5ff" />
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;

            if (route.name === "Profile") {
              iconName = "account-circle";
            } else if (route.name === "HomeInvestor") {
              iconName = "home";
            } else if (route.name === "Notifications") {
              iconName = "notifications-none";
            } else if (route.name === "ViewPlan") {
              iconName = "view-in-ar";
            }

            return <MaterialIcons name={iconName} size={32} color={color} />;
            // return <EvilIcons name={iconName} size={32} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "red",
          inactiveTintColor: "gray",
        }}
      >
        <Tabs.Screen name="Profile" component={Profile} />
        <Tabs.Screen name="HomeInvestor" component={HomeInvestor} />
        <Tabs.Screen name="Notifications" component={Notifications} />
        <Tabs.Screen name="ViewPlan" component={ViewPlan} />
      </Tabs.Navigator>
    </>
  );
};

const myOptions = {
  title: "Profile",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#0396FF",
  },
};

export default function App() {
  const type = "Profile";
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
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Profile"
            component={RootHome}
            options={{ ...myOptions, title: "Profile" }}
          />
          <Stack.Screen
            name="ViewPlan"
            component={ViewPlan}
            options={{ ...myOptions, title: "ViewPlan" }}
          />
          <Stack.Screen
            name="CreateInvestment"
            component={CreateInvestment}
            options={{ ...myOptions, title: "CreateInvestment" }}
          />
          <Stack.Screen
            name="Notifications"
            component={Notifications}
            options={{ ...myOptions, title: "Notifications" }}
          />
          <Stack.Screen
            name="SubscribedStartups"
            component={SubscribedStartups}
            options={{ ...myOptions, title: "SubscribedStartups" }}
          />
          <Stack.Screen
            name="HomeInvestor"
            component={HomeInvestor}
            options={{ ...myOptions, title: "HomeInvestor" }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
