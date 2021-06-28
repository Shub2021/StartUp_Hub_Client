import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Tabs from "./navigation/tabs";
import Home from "./screens/client/home";
import Profile from './screens/Investor/Profile';
import  CreateInvestment  from './screens/Investor/CreateInvestment';
import SubscribedStartups from './screens/Investor/SubscribedStartups';
import ViewPlan from './screens/Investor/ViewPlan';
import Notifications from './screens/Investor/Notifications'
import HomeInvestor from './screens/Investor/HomeInvestor';


const Stack = createStackNavigator();

const myOptions = {
  title:'Profile',
  headerTintColor:'white',
  headerStyle:{
    backgroundColor:'#0396FF',
  }
}



export default function App() {
  const type = 'Profile';
  return (
    <NavigationContainer>
      
        {
          type === 'client' ? (
            <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        // initialRouteName={"Home"}
      >
          <Stack.Screen name="Home" component={Tabs} />
          </Stack.Navigator>
          ) : (<Stack.Navigator>
          <Stack.Screen name="Profile" component={Profile} options={{...myOptions, title:'Profile'}}  />
          {/* <Stack.Screen name="ViewPlan" component={ViewPlan} options={{...myOptions, title:'ViewPlan'}}  /> */}
          <Stack.Screen name="CreateInvestment" component={CreateInvestment} options={{...myOptions, title:'CreateInvestment'}} />
          <Stack.Screen name="SubscribedStartups" component={SubscribedStartups} options={{...myOptions, title:'SubscribedStartups'}} />
          </Stack.Navigator>)
        }
        
      
    </NavigationContainer>
  );

}
