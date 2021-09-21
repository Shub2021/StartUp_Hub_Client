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
import UpdateProfile from "./screens/Investor/UpdateProfile";
import InvestorRegistration from "./screens/Investor/InvesterRegistration";
import UpdatePlan from "./screens/Investor/UpdatePlan";
import Statistics from "./screens/Investor/Statistics";
import StartupProfile from "./screens/Investor/StartupProfile";
import StartupStatistics from "./screens/Investor/StartupStatistics";
import PostAgreement from "./screens/Investor/PostAgreement";
import ViewPostPlan from "./screens/Investor/ViewPostPlan";
import ItemReviews from "./screens/client/ItemReviews";
import ClientProfile from "./screens/client/Profile";
import Login from "./screens/login";
import forgotPassword from "./screens/forgotPassword";
import recovery from "./screens/recovery";
import Register from "./screens/client/ClientRegistration";
import postRegisterForm from "./screens/postRegisterForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import UserCart from "./screens/client/UserCart";
import ServicesHome from "./screens/client/ServicesHome";
import UserOrders from "./screens/client/UserOrders";
import SelectetService from "./screens/client/SelectedService";
import UserRequestedServices from "./screens/client/UserRequestedServices";
import StripeApp from "./screens/client/StripeApp";
import { StripeProvider } from "@stripe/stripe-react-native";

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
            } else if (route.name === "Statistics") {
              iconName = "stacked-line-chart";
            }

            return <MaterialIcons name={iconName} size={32} color={color} />;
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
        <Tabs.Screen name="Statistics" component={Statistics} />
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
    <StripeProvider publishableKey="pk_test_51JU5UCKmGZodwyxaN1Q24PTRnjRGzL7ePprbwfx9Nf2yiSu5sPvBKhdoyjJjhCgNT6heMbpZiEKBxHW3t5A2FEIT00B6Dg98nj">
      <ClientStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <ClientStack.Screen name="Home" component={Tabss} />
        <ClientStack.Screen name="Item" component={Item} />
        <ClientStack.Screen name="ItemLocation" component={ItemLocation} />
        <ClientStack.Screen name="ItemReviews" component={ItemReviews} />
        <ClientStack.Screen name="UserCart" component={UserCart} />
        <ClientStack.Screen name="ServicesHome" component={ServicesHome} />
        <ClientStack.Screen
          name="SelectetService"
          component={SelectetService}
        />
        <ClientStack.Screen name="UserOrders" component={UserOrders} />
        <ClientStack.Screen name="StripeApp" component={StripeApp} />
        <ClientStack.Screen name="ClientProfile" component={ClientProfile} />
        <ClientStack.Screen
          name="UserRequestedServices"
          component={UserRequestedServices}
        />
      </ClientStack.Navigator>
    </StripeProvider>
  );
}

function LoadInvestor() {
  return (
    <InvestorStack.Navigator>
      <InvestorStack.Screen
        name="Profile"
        component={RootHome}
        options={{ ...myOptions, title: "Startup Hub" }}
      />
      <InvestorStack.Screen
        name="ViewPlan"
        component={ViewPlan}
        options={{ ...myOptions, title: "ViewPlan" }}
      />
      <InvestorStack.Screen
        name="CreateInvestment"
        component={CreateInvestment}
        options={{ ...myOptions, title: "Create Investment" }}
      />
      <InvestorStack.Screen
        name="Notifications"
        component={Notifications}
        options={{ ...myOptions, title: "Notifications" }}
      />
      <InvestorStack.Screen
        name="SubscribedStartups"
        component={SubscribedStartups}
        options={{ ...myOptions, title: "Subscribed Startups" }}
      />
      <InvestorStack.Screen
        name="HomeInvestor"
        component={HomeInvestor}
        options={{ ...myOptions, title: "Hom" }}
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
      <InvestorStack.Screen
        name="Statistics"
        component={Statistics}
        options={{ ...myOptions, title: "Statistics" }}
      />
      <InvestorStack.Screen
        name="StartupProfile"
        component={StartupProfile}
        options={{ ...myOptions, title: "Startup Company" }}
      />
      <InvestorStack.Screen
        name="StartupStatistics"
        component={StartupStatistics}
        options={{ ...myOptions, title: "Startup Statistics" }}
      />
      <InvestorStack.Screen
        name="PostAgreement"
        component={PostAgreement}
        options={{ ...myOptions, title: "Post Agreement" }}
      />
      <InvestorStack.Screen
        name="ViewPostPlan"
        component={ViewPostPlan}
        options={{ ...myOptions, title: "Post Plan" }}
      />
      <InvestorStack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{ ...myOptions, title: "Update Profile" }}
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
              name="forgotPassword"
              component={forgotPassword}
              options={{ ...myOptions, title: "forgotPassword" }}
            />
            <Stack.Screen
              name="recovery"
              component={recovery}
              options={{ ...myOptions, title: "recovery" }}
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
            <Stack.Screen name="LoadInvestor" component={LoadInvestor} />
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
              name="forgotPassword"
              component={forgotPassword}
              options={{ ...myOptions, title: "forgotPassword" }}
            />
            <Stack.Screen
              name="recovery"
              component={recovery}
              options={{ ...myOptions, title: "recovery" }}
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
            <Stack.Screen
            name="LoadClientScreens"
            component={LoadClientScreens}
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
            name="forgotPassword"
            component={forgotPassword}
            options={{ ...myOptions, title: "forgotPassword" }}
          />
          <Stack.Screen
            name="recovery"
            component={recovery}
            options={{ ...myOptions, title: "recovery" }}
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
