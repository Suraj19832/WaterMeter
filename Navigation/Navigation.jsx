

// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import SplashScreen from "../Screens/SplashScreen";
// import Login from "../Auth/Login";
// import Dashboard from "../Screens/Dashboard";
// import MeterSection from "../Screens/MeterSection";
// import EditProfile from "../Auth/EditProfile";
// import SummaryScreen from "../Screens/SummaryScreen";
// import ForgotPassword from "../Auth/ForgotPassword";
// import OcrCaptured from "../Screens/OcrCaptured";
// import Completion from "../Screens/Completion";
// import MeterSelection from "../Screens/MeterSelection";
// import { CustomTabBar } from "./TabNavigator";
// // import { newTab } from "./NewTab";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import DrawerNavigation from "./DrawerNavigation";
// import ChangePassword from "./../Auth/ChangePassword";
// import VerifyOTP from "./../Auth/VerifyOTP";
// import VerifyEmail from "./../Auth/VarifyEmail";
// import MeterReading from "../Screens/MeterReading";
// import MeterReadingScanner from "../Screens/MeterReadingScanner";
// import { useSelector } from "react-redux";
// import { selectAuthToken } from "../redux/slices/Authslice";
// // import { useEffect } from "react";
// import { useNavigation } from "@react-navigation/native";

// const Stack = createStackNavigator();
// const Bottom = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();
// const DashboardStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="Dashboard" component={Dashboard} />
//     {/* <Stack.Screen name="SummaryScreen" component={SummaryScreen} /> */}
//     <Stack.Screen name="MeterScreen" component={MeterSection} />
//     <Stack.Screen name="OcrCaptured" component={OcrCaptured} />
//     {/* <Stack.Screen name="MeterReading" component={MeterReading} /> */}
//     <Stack.Screen name="meterReadingScanner" component={MeterReadingScanner} />
//   </Stack.Navigator>
// );

// const TabNavigator = () => (
//   <Bottom.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
//   <Bottom.Screen name="Dashboard" component={DashboardStack} options={{ headerShown: false }} />
//     <Bottom.Screen name="Completion" component={Dashboard} options={{ headerShown: false }} />
  
//     <Bottom.Screen name="MeterScreen" component={MeterSection} options={{ headerShown: false }}  />
//     <Bottom.Screen name="SummaryScreen" component={SummaryScreen} options={{ headerShown: false }}  />
//     <Bottom.Screen name="MeterSelection" component={MeterSelection} options={{ headerShown: false }} />
//     {/* <Bottom.Screen name="MeterSelection" component={MeterSelection} options={{ headerShown: false }}  /> */}
//   </Bottom.Navigator>
// );

// const DrawerNav = () => (
//   <Drawer.Navigator
//     screenOptions={{
//       headerShown: false,
//       drawerPosition: "right",
//       drawerStyle: { backgroundColor: "#ffffe200" },
//     }}
//     drawerContent={(props) => <DrawerNavigation {...props} />}
//   >
//     <Drawer.Screen name="Dash" component={TabNavigator} />
//   </Drawer.Navigator>
// );
// const AuthStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="Login" component={Login} />
//     <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
//     <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
//     <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
//   </Stack.Navigator>
// );
// const MainStack = () => {
//   const authToken = useSelector(selectAuthToken);

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {authToken !== null ? (
//         <>
//         <Stack.Screen name="Main" component={DrawerNav} />
//         <Stack.Screen name="ChangePassword" component={ChangePassword} />
//         <Stack.Screen name="EditProfile" component={EditProfile} />
//       </>
//       ) : (
//         <Stack.Screen name="Auth" component={AuthStack} />
//       )}
//     </Stack.Navigator>
//   );
// };

// const NavigationComponent = () => (
//   <NavigationContainer>
//     <MainStack />
//   </NavigationContainer>
// );

// export default NavigationComponent;


import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "../Screens/SplashScreen";
import Login from "../Auth/Login";
import Dashboard from "../Screens/Dashboard";
import MeterSection from "../Screens/MeterSection";
import EditProfile from "../Auth/EditProfile";
import SummaryScreen from "../Screens/SummaryScreen";
import ForgotPassword from "../Auth/ForgotPassword";
import OcrCaptured from "../Screens/OcrCaptured";
import Completion from "../Screens/Completion";
import MeterSelection from "../Screens/MeterSelection";
import { CustomTabBar } from "./TabNavigator";
// import { newTab } from "./NewTab";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerNavigation from "./DrawerNavigation";
import ChangePassword from "./../Auth/ChangePassword";
import VerifyOTP from "./../Auth/VerifyOTP";
import VerifyEmail from "./../Auth/VarifyEmail";
import MeterReading from "../Screens/MeterReading";
import MeterReadingScanner from "../Screens/MeterReadingScanner";
import { useSelector } from "react-redux";
import { selectAuthToken } from "../redux/slices/Authslice";
// import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();
const Bottom = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const DashboardStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Dashboard" component={Dashboard} />
    {/* <Stack.Screen name="SummaryScreen" component={SummaryScreen} /> */}
    <Stack.Screen name="MeterScreen" component={MeterSection} />
    <Stack.Screen name="OcrCaptured" component={OcrCaptured} />
    {/* <Stack.Screen name="MeterReading" component={MeterReading} /> */}
    {/* <Stack.Screen name="meterReadingScanner" component={MeterReadingScanner} /> */}
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Bottom.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
  <Bottom.Screen name="DashboardBottom" component={DashboardStack} options={{ headerShown: false }} />
    <Bottom.Screen name="meterReadingScanner" component={MeterReadingScanner} options={{ headerShown: false }} />
  
    <Bottom.Screen name="MeterScreen" component={MeterSection} options={{ headerShown: false }}  />
    <Bottom.Screen name="SummaryScreen" component={SummaryScreen} options={{ headerShown: false }}  />
    <Bottom.Screen name="MeterSelection" component={MeterSelection} options={{ headerShown: false }} />
    {/* <Bottom.Screen name="MeterSelection" component={MeterSelection} options={{ headerShown: false }}  /> */}
  </Bottom.Navigator>
);

const DrawerNav = () => (
  <Drawer.Navigator
    screenOptions={{
      headerShown: false,
      drawerPosition: "right",
      drawerStyle: { backgroundColor: "#ffffe200" },
    }}
    drawerContent={(props) => <DrawerNavigation {...props} />}
  >
    <Drawer.Screen name="Dash" component={TabNavigator} />
  </Drawer.Navigator>
);
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
    <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  </Stack.Navigator>
);
const MainStack = () => {
  const authToken = useSelector(selectAuthToken);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authToken !== null ? (
        <>
        <Stack.Screen name="Main" component={DrawerNav} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </>
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

const NavigationComponent = () => (
  <NavigationContainer>
    <MainStack />
  </NavigationContainer>
);

export default NavigationComponent;