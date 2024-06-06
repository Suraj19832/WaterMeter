import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native";
import "react-native-gesture-handler";
import Login from "./Auth/Login";
import SplashScreen from "./Screens/SplashScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import Dashboard from "./Screens/Dashboard";
import MeterSection from "./Screens/MeterSection";

const Stack = createStackNavigator();
const App = () => {



  return (
  <NavigationContainer>

  <Stack.Navigator initialRouteName="Dashboard" >

  <Stack.Screen
  name="Login"
component={Login}
options={{ headerShown: false }}
/>
<Stack.Screen
  name="SplashScreen"
component={SplashScreen}
options={{ headerShown: false }}
/>
<Stack.Screen
  name="Dashboard"
component={Dashboard}
options={{ headerShown: false }}
/>

<Stack.Screen
  name="MeterScreen"
component={MeterSection}
options={{ headerShown: false }}
/>

  </Stack.Navigator>


  </NavigationContainer>
  );
};

export default App;
