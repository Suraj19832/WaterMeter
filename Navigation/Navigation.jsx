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
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerNavigation from "./DrawerNavigation";
import ChangePassword from './../Auth/ChangePassword';
import VerifyOTP from './../Auth/VerifyOTP';
import VerifyEmail from './../Auth/VarifyEmail';

const Stack = createStackNavigator();
const Bottom = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabNavigator = () => {
    return (
        <Bottom.Navigator tabBar={(props) => <CustomTabBar {...props} />} headerShown={false}>
            <Bottom.Screen name="Dashboard" options={{ headerShown: false }} component={Dashboard} />
            <Bottom.Screen name="Completion" options={{ headerShown: false }} component={Completion} />
            <Bottom.Screen name="MeterSelection" options={{ headerShown: false }} component={MeterSelection} />
            <Bottom.Screen name="MeterReading" options={{ headerShown: false }} component={OcrCaptured} />
            <Bottom.Screen name="MeterReadingScanner" options={{ headerShown: false }} component={MeterSection} />
        </Bottom.Navigator>
    );
};

const DrawerNav = () => (
    <Drawer.Navigator screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        drawerStyle: {
            backgroundColor:"#ffffe200"
        }
    }} drawerContent={DrawerNavigation}>
        <Drawer.Screen name="Dash" component={TabNavigator} />
       
    </Drawer.Navigator>
);

const MainStack = () => {
    return (
        <Stack.Navigator initialRouteName="Dashboard" headerShown={false}>
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
                name="Dashboard"
                component={DrawerNav}
                options={{ headerShown: false }}
            />
             <Stack.Screen
                name="VerifyOTP"
                component={VerifyOTP}
                options={{ headerShown: false }}
            />
                 <Stack.Screen
                name="VerifyEmail"
                component={VerifyEmail}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MeterScreen"
                component={MeterSection}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SummaryScreen"
                component={SummaryScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="OcrCaptured"
                component={OcrCaptured}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DrawerNav"
                component={DrawerNavigation}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}

const NavigationComponent = () => {
    return (
        <NavigationContainer style={{ backgroundColor: "white" }}>
            <MainStack />
        </NavigationContainer>

    );
};

export default NavigationComponent;
