import image12 from '../assets/Rectangle22.png'
import { View, TouchableOpacity, StyleSheet, ImageBackground, Image } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Dashboard from '../Screens/Dashboard';
import Completion from './../Screens/Completion';
import MeterSelection from './../Screens/MeterSelection';
import Login from '../Auth/Login';
import MeterSection from '../Screens/MeterSection';
import userIcon from '../assets/Frame (1).png'
import listIcon from '../assets/Frame (2).png'
import centerIcon from '../assets/Filled-yellow-only.png'
import scheduled from '../assets/Layer 2.png'
import camera from '../assets/camera.png'
import activelistIcon from '../assets/Group (1).png'
import activescheduleIcon from '../assets/Group (2).png'
import activecenterIcon from '../assets/outline-OuterYellowBlue-InnerBlue.png'
import activecameraIcon from '../assets/Group (4).png'
import { useState } from 'react';


const Tab = createBottomTabNavigator();

export const CustomTabBar = ({ state, descriptors, navigation }) => {
    const [activeIcon, setActiveIcon] = useState(null);
    const drawerNavigation = useNavigation(); 
    return (
        <View style={{ backgroundColor: "white" }}>
            <Image source={image12} style={{ width: '100%', height: 100, backgroundColor: '#fff', }} />
            
            <View style={styles.tabBar}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    let iconName;
                    let activeIconName;
                    if (route.name === "Dashboard") {
                        iconName = camera;
                        activeIconName =activecameraIcon
                    } else if (route.name === "Completion") {
                        iconName = scheduled;
                        activeIconName=activescheduleIcon
                    } else if (route.name === "MeterSelection") {
                        iconName = centerIcon;
                        activeIconName =activecenterIcon
                    } else if (route.name === "SummaryScreen") {
                        iconName = listIcon;
                        activeIconName =activelistIcon;
                        
                    } else if (route.name === "MeterScreen") {
                        iconName = userIcon;
                    }

                    const onPress = () => {
                        // if (route.name === "MeterReadingScanner") {
                        //     navigation.openDrawer(); // Open drawer for the last icon
                        //   } else {
                        //     setActiveIcon(route.name); // Otherwise, update the active icon
                        //   }
                        // console.log(`Navigating to ${route.name}`);
                        // const event = navigation.emit({
                        //     type: "tabPress",
                        //     target: route.key,
                        // });

                        // if (!isFocused && !event.defaultPrevented) {
                        //     navigation.navigate(route.name);
                        // }

                        if (route.name === 'MeterScreen') {
                            drawerNavigation.openDrawer(); // Open drawer for the last icon
                        } else {
                            setActiveIcon(route.name); // Otherwise, update the active icon
                            if (!isFocused) {
                                navigation.navigate(route.name);
                            }
                        }

                    };

                    return (
                        <View
                        >
                   
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
                                    style={[route.name === "MeterSelection" ? styles.middleTab : null, { zIndex: 10, }]}
                                >
                                
                                 <Image
          source={activeIcon === route.name ? activeIconName : iconName}
          style={styles.icon}
          resizeMode='contain'
        />
                                </View>
                            </TouchableOpacity>

                        </View>
                    );
                })}
            </View>
        </View>
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
        backgroundColor: 'transparent',
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
        marginTop: -100,
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
    icon:{
        width:45,
        height:40
    }
});

