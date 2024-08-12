// import image12 from "../assets/Rectangle22.png";
// import {
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   ImageBackground,
//   Image,
// } from "react-native";
// import { NavigationContainer, useFocusEffect, useNavigation } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import Dashboard from "../Screens/Dashboard";
// import Completion from "./../Screens/Completion";
// import MeterSelection from "./../Screens/MeterSelection";
// import Login from "../Auth/Login";
// import MeterSection from "../Screens/MeterSection";
// import userIcon from "../assets/Frame (3).png";
// import listIcon from "../assets/Frame (2).png";
// import centerIcon from "../assets/Filled-yellow-only.png";
// import scheduled from "../assets/Layer 2.png";
// import camera from "../assets/camera.png";
// import activelistIcon from "../assets/Group (1).png";
// import activescheduleIcon from "../assets/Group (2).png";
// import activecenterIcon from "../assets/outline-OuterYellowBlue-InnerBlue.png";
// import activecameraIcon from "../assets/Group (4).png";

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {setBooleanValue, selectBooleanValue, selectStringValue ,setStringValue } from '../redux/slices/UniqueSlice';

// const Tab = createBottomTabNavigator();


// export const CustomTabBar = ({ state, descriptors, navigation }) => {
//   const activeTab = useSelector(selectStringValue);
//   const dispatch = useDispatch();
//   const drawerNavigation = useNavigation();

//   const [previousIndex, setPreviousIndex] = useState(state.index);

//   // Update active tab when screen focuses
//   useFocusEffect(() => {
//     setPreviousIndex(state?.index);
//     dispatch(setStringValue(state?.routes[state?.index]?.name));
//   });

//   const handleTabPress = (routeName) => {
//     if (routeName === 'MeterSelection') {
//       drawerNavigation.openDrawer();
//     } else {
//       dispatch(setStringValue(routeName));
//       if (routeName !== activeTab) {
//         navigation.navigate(routeName);
//       }
//     }
//   };

//   return (
//     <View style={{ backgroundColor: "white" ,width:'100%' }}>
//     <Image
//       source={image12}
//       style={{ width: "100%", height: 100, backgroundColor: "rgba(242, 242, 242, 1)" }}
//       resizeMode="cover"
//     />
//       <View style={styles.tabBar}>
//         {state.routes.map((route, index) => {
//           const { options } = descriptors[route.key];
//           const isFocused = state.index === index || activeTab === route.name;

//           let iconName, activeIconName;

//           switch (route.name) {
//             case 'meterReadingScanner':
//               iconName = camera;
//               activeIconName = activecameraIcon;
//               break;
//             case 'DashboardBottom':
//               iconName = scheduled;
//               activeIconName = activescheduleIcon;
//               break;
//             case 'MeterScreen':
//               iconName = centerIcon;
//               activeIconName = activecenterIcon;
//               break;
//             case 'SummaryScreen':
//               iconName = listIcon;
//               activeIconName = activelistIcon;
//               break;
//             case 'MeterSelection':
//               iconName = userIcon;
//               activeIconName = userIcon;
//               break;
//             default:
//               iconName = null;
//               activeIconName = null;
//           }

//           return (
//             <View key={route.key}>
//               <TouchableOpacity
//                 accessibilityRole="button"
//                 accessibilityState={isFocused ? { selected: true } : {}}
//                 accessibilityLabel={options?.tabBarAccessibilityLabel}
//                 testID={options?.tabBarTestID}
//                 onPress={() => handleTabPress(route?.name)}
//                 activeOpacity={1}
//               >
//                 <View style={[route.name === 'MeterScreen' ? styles.middleTab : null, { zIndex: 10 }]}>
//                   <Image
//                     source={isFocused ? activeIconName : iconName}
//                     style={styles.icon}
//                     resizeMode="contain"
//                   />
//                 </View>
//               </TouchableOpacity>
//             </View>
//           );
//         })}
//       </View>
//     </View>
//   );
// };



// new 

import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setStringValue, selectStringValue } from '../redux/slices/UniqueSlice';



import image12 from "../assets/Rectangle22.png";
import userIcon from "../assets/Frame (3).png";
import listIcon from "../assets/Frame (2).png";
import centerIcon from "../assets/Filled-yellow-only.png";
import scheduled from "../assets/Layer 2.png";
import camera from "../assets/camera.png";
import activelistIcon from "../assets/Group (1).png";
import activescheduleIcon from "../assets/Group (2).png";
import activecenterIcon from "../assets/outline-OuterYellowBlue-InnerBlue.png";
import activecameraIcon from "../assets/Group (4).png";

export const CustomTabBar = ({ state, descriptors, navigation }) => {
  const activeTab = useSelector(selectStringValue);
  const dispatch = useDispatch();
  const drawerNavigation = useNavigation();

  const [previousIndex, setPreviousIndex] = useState(state.index);

  // Update active tab when screen focuses
  useFocusEffect(() => {
    setPreviousIndex(state?.index);
    dispatch(setStringValue(state?.routes[state?.index]?.name));
  });

  const handleTabPress = (routeName) => {
    if (routeName === 'MeterSelection') {
      drawerNavigation.openDrawer();
    } else if(routeName === "DashboardBottom"){
      navigation.navigate("Dashboard")
      navigation.navigate("DashboardBottom")
    }else{
      dispatch(setStringValue(routeName));
    }
  };

  return (
    <View style={{ backgroundColor: "white" ,width:'100%' }}>
      <Image
        source={image12}
        style={{ width: "100%", height: 100, backgroundColor: "rgba(242, 242, 242, 1)" }}
        resizeMode="cover"
      />
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index || activeTab === route.name;

          let iconName, activeIconName;

          switch (route.name) {
            case 'meterReadingScanner':
              iconName = camera;
              activeIconName = activecameraIcon;
              break;
            case 'DashboardBottom':
              iconName = scheduled;
              activeIconName = activescheduleIcon;
              break;
            case 'MeterScreen':
              iconName = centerIcon;
              activeIconName = activecenterIcon;
              break;
            case 'SummaryScreen':
              iconName = listIcon;
              activeIconName = activelistIcon;
              break;
            case 'MeterSelection':
              iconName = userIcon;
              activeIconName = userIcon;
              break;
            default:
              iconName = null;
              activeIconName = null;
          }

          return (
            <View key={route.key}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options?.tabBarAccessibilityLabel}
                testID={options?.tabBarTestID}
                onPress={() => handleTabPress(route?.name)}
                activeOpacity={1}
              >
                <View style={[route.name === 'MeterScreen' ? styles.middleTab : null, { zIndex: 10 }]}>
                  <Image
                    source={isFocused ? activeIconName : iconName}
                    style={styles.icon}
                    resizeMode="contain"
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
    backgroundColor: "transparent",
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
  icon: {
    width: 45,
    height: 40,
  },
});
