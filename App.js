import React from "react";
import { View, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Login from "./Screens/Login";
import SplashScreen from "./Screens/SplashScreen";
import Dashboard from "./Screens/Dashboard";
import MeterReadingScanner from "./Screens/MeterReadingScanner";
import MeterReading from "./Screens/MeterReading";
import MeterSelection from "./Screens/MeterSelection";
import Completion from "./Screens/Completion";
import SvgComponent from "./Screens/SvgComponent";
import image12 from './assets/Rectangle22.png'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <ImageBackground source={image12} style={{width:'100%',height:100}}>
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        let iconName;
        if (route.name === "Dashboard") {
          iconName = "camera";
        } else if (route.name === "Completion") {
          iconName = "calendar-clock";
        } else if (route.name === "MeterSelection") {
          iconName = "clipboard-check";
        } else if (route.name === "MeterReading") {
          iconName = "account";
        } else if (route.name === "MeterReadingScanner") {
          iconName = "gauge";
        }

        const onPress = () => {
          console.log(`Navigating to ${route.name}`);
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View 
          //  style={styles.tab}
           >
                      {/* <>
            {route.name === "MeterSelection" ? (
              <View style={{ marginTop: -20 ,zIndex:0}}>
                <SvgComponent />
              </View>
            ) : null}
          </> */}
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
           activeOpacity={1}
          >
            <View
              style={[route.name === "MeterSelection" ? styles.middleTab : null,{zIndex: 10,}]}
            >
              <MaterialCommunityIcons
                name={iconName}
                color={
                  isFocused
                    ? "orange"
                    : route.name === "MeterSelection"
                    ? "#0F77AF"
                    : "white"
                }
                size={45}
              />
            </View>
          </TouchableOpacity>

          </View>
        );
      })}
    </View>
   </ImageBackground> 
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Completion" component={Completion} />
      <Tab.Screen name="MeterSelection" component={MeterSelection} />
      <Tab.Screen name="MeterReading" component={MeterReading} />
      <Tab.Screen name="MeterReadingScanner" component={MeterReadingScanner} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    borderRadius: 25,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    // backgroundColor: "#0F77AF",
    padding: 8,
    height: 70,
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  middleTab: {
    // position: "absolute",
    // bottom: 25,
    // left:0,
    marginTop:-100,
    width: 70,
    height: 70,
    backgroundColor: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
});

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
