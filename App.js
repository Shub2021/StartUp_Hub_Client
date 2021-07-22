import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, EvilIcons } from "@expo/vector-icons";

import { StatusBar, ActivityIndicator } from "react-native";
// import { StatusBar } from "expo-status-bar";

import Tabss from "./navigation/tabs";
import Item from "./screens/client/Item";
import ItemLocation from "./screens/client/ItemLocation";
import Profile from "./screens/Investor/Profile";
import CreateInvestment from "./screens/Investor/CreateInvestment";
import SubscribedStartups from "./screens/Investor/SubscribedStartups";
import ViewPlan from "./screens/Investor/ViewPlan";
import Notifications from "./screens/Investor/Notifications";
import HomeInvestor from "./screens/Investor/HomeInvestor";
import CompleteProfile from "./screens/Investor/CompleteProfile";
import InvestorRegistration from "./screens/Investor/InvesterRegistration";
import UpdatePlan from "./screens/Investor/UpdatePlan";
import ItemReviews from "./screens/client/ItemReviews";
import Login from "./screens/login";
import Register from "./screens/client/ClientRegistration";
import postRegisterForm from "./screens/postRegisterForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";

const Stack = createStackNavigator();
const ClientStack = createStackNavigator();
const InvestorStack = createStackNavigator();
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
          activeTintColor: "#4991ff",
          inactiveTintColor: "#8d8d8e",
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

function LoadClientScreens() {
  return (
    <ClientStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ClientStack.Screen name="Home" component={Tabss} />
      <ClientStack.Screen name="Item" component={Item} />
      <ClientStack.Screen name="ItemLocation" component={ItemLocation} />
      <ClientStack.Screen name="ItemReviews" component={ItemReviews} />
    </ClientStack.Navigator>
  );
}

function LoadInvestor() {
  return (
    <InvestorStack.Navigator>
      <InvestorStack.Screen
        name="Profile"
        component={RootHome}
        options={{ ...myOptions, title: "Profile" }}
      />
      <InvestorStack.Screen
        name="ViewPlan"
        component={ViewPlan}
        options={{ ...myOptions, title: "ViewPlan" }}
      />
      <InvestorStack.Screen
        name="CreateInvestment"
        component={CreateInvestment}
        options={{ ...myOptions, title: "CreateInvestment" }}
      />
      <InvestorStack.Screen
        name="Notifications"
        component={Notifications}
        options={{ ...myOptions, title: "Notifications" }}
      />
      <InvestorStack.Screen
        name="SubscribedStartups"
        component={SubscribedStartups}
        options={{ ...myOptions, title: "SubscribedStartups" }}
      />
      <InvestorStack.Screen
        name="HomeInvestor"
        component={HomeInvestor}
        options={{ ...myOptions, title: "HomeInvestor" }}
      />
      <InvestorStack.Screen
        name="CompleteProfile"
        component={CompleteProfile}
        options={{ ...myOptions, title: "Complete Profile" }}
      />
      <InvestorStack.Screen
        name="UpdatePlan"
        component={UpdatePlan}
        options={{ ...myOptions, title: "Update Plan" }}
      />
    </InvestorStack.Navigator>
  );
}

export default function App() {
  const [loading, setloading] = React.useState(true);
  const [islogged, setLogged] = React.useState(false);
  const [data, setData] = React.useState("");
  const [type, setType] = React.useState("");

  // React.useEffect(() => {
  //   getData();
  // });

  const getData = async () => {
    try {
      var jsonValue = "";
      jsonValue = await AsyncStorage.getItem("token");
      //console.log(jsonValue);
      const email = await AsyncStorage.getItem("email");
      const name = await AsyncStorage.getItem("name");
      const type = await AsyncStorage.getItem("type");

      setType(type);
      setData(jsonValue);
      if (jsonValue) {
        setLogged(true);
        //console.log("done");
      } else {
        setLogged(false);
        //console.log("hmm");
      }
      setloading(false);
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    getData();
  });
  const [loaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : islogged ? (
        type === "client" ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            // initialRouteName={"Home"}
          >
            <Stack.Screen
              name="LoadClientScreens"
              component={LoadClientScreens}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ ...myOptions, title: "Login" }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ ...myOptions, title: "Register" }}
            />
            <Stack.Screen
              name="postRegisterForm"
              component={postRegisterForm}
              options={{ ...myOptions, title: "Account Type" }}
            />
            <Stack.Screen
              name="InvestorRegistration"
              component={InvestorRegistration}
              options={{ ...myOptions, title: "Investor Registration" }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="LoadInvestor" component={LoadInvestor} />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ ...myOptions, title: "Login" }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ ...myOptions, title: "Register" }}
            />
            <Stack.Screen
              name="postRegisterForm"
              component={postRegisterForm}
              options={{ ...myOptions, title: "Account Type" }}
            />
            <Stack.Screen
              name="InvestorRegistration"
              component={InvestorRegistration}
              options={{ ...myOptions, title: "Investor Registration" }}
            />
          </Stack.Navigator>
        )
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ ...myOptions, title: "Login" }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ ...myOptions, title: "Register" }}
          />
          <Stack.Screen
            name="postRegisterForm"
            component={postRegisterForm}
            options={{ ...myOptions, title: "Account Type" }}
          />
          <Stack.Screen
            name="InvestorRegistration"
            component={InvestorRegistration}
            options={{
              ...myOptions,
              title: "Investor Registration",
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="LoadClientScreens"
            component={LoadClientScreens}
          />
          <Stack.Screen name="LoadInvestor" component={LoadInvestor} />
        </Stack.Navigator>
      )}
      <StatusBar barStyle="light-content" />
    </NavigationContainer>
  );
}
