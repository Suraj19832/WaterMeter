import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
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
// import { Svg } from "react-native-svg";


const Stack = createStackNavigator();

// Custom Tab Bar Icon Component
const Tab = createBottomTabNavigator();

// Custom Tab Bar Component
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
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
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tab}
          >
            <View
              style={route.name === "MeterSelection" ? styles.middleTab : null}
            >
              {/* <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={202}
                height={50}
                fill="none"
                {...props}
              >
                <Path
                  fill="#000"
                  d="M65 27.54v-.084C71.483 40.801 85.167 50 101 50c15.833 0 29.517-9.199 36-22.544v.085C151.743 10.663 173.423 0 197.593 0c1.479 0 2.948.04 4.407.119V0H0v.119A81.721 81.721 0 0 1 4.407 0C28.577 0 50.257 10.663 65 27.54z"
                />
              </Svg> */}
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
        );
      })}
    </View>
  );
};

// Custom Tab Navigator
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
    backgroundColor: "#0F77AF",
    paddingBottom: 5,
    paddingTop: 5,
    height: 70, // Adjust the height to fit the icons and padding
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  middleTab: {
    position: "absolute",
    bottom: 25,
    width: 70,
    height: 70,
    backgroundColor: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});

// Main App Component with Stack Navigator
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
