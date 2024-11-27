import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
} from "react-native";
import logo from "../assets/HYRA REAL ESTATE LOGO 1.png";
import appApi from "../Helper/Api";
import {
  AntDesign,
  FontAwesome6,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import { colorCodes } from "../ColorCodes/Colors";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuthToken } from "../redux/slices/Authslice";
import { useDispatch } from "react-redux";
import { ToastProvider, useToast } from "react-native-toast-notifications";
import Constants from 'expo-constants';


const DrawerNavigation = ({ navigation }) => {
  const [modal, setModal] = useState(false);
  const [isYesPressed, setIsYesPressed] = useState(false);
  const [isNoPressed, setIsNoPressed] = useState(false);
  const dispatch = useDispatch();

  const appVersion = 
    Constants.expoConfig?.version || // EAS Build/Bare Workflow
    Constants.manifest?.version || // Managed Workflow
    Constants.manifest2?.extra?.expoClient?.version || // Fallback for other cases
    'Version not available'; // Default fallback

  // console.log(appVersion, "App Version");

  const toast = useToast();

  const handleYesLogout = async () => {
    try {
      setModal(false);
      toast.show("Wait a Second", { type: "sucess" });
      const res = await appApi.logout();
      console.log(res,"logout logout")
      if (res?.status) {
        toast.show("Logout Successfully", { type: "sucess" });
        await AsyncStorage.removeItem("token");
        dispatch(setAuthToken(null));
      }
    } catch (error) {
      toast.show("Logout Successfully", { type: "sucess" });
      await AsyncStorage.removeItem("token");
      dispatch(setAuthToken(null));
    } finally {
    }
  };

  const styles = StyleSheet.create({
    mainView: {
      backgroundColor: "#197AB6",
      flex: 1,
      borderTopLeftRadius: 25,
      borderBottomLeftRadius: 25,
    },
    upLogo: {
      backgroundColor: "#F9F9F9",
      height: "27%",
      borderTopLeftRadius: 25,
      marginBottom: 15,
    },
    changePass: {
      height: 50,
      backgroundColor: "#F9F9F9",
      marginBottom: 8,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 20,
    },
    changePassText: {
      color: "#104F9C",
      fontSize: 20,
      textAlign: "center",
      height: 40,
      paddingTop: 6,
    },
    ModalMain: {
      height: 160,
      width: "80%",
      backgroundColor: "white",
      borderRadius: 15,
      margin: "auto",
      elevation: 10,
    },
    modalBtnMain: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "85%",
      margin: "auto",
    },
    yesBtn: {
      height: 40,
      width: "45%",
      borderWidth: 1,
      borderRadius: 7,
      borderColor: colorCodes.navyBlueButton,
    },
    noBtn: {
      height: 40,
      width: "45%",
      borderWidth: 1,
      borderRadius: 7,
      borderColor: colorCodes.navyBlueButton,
    },
    modalText: {
      textAlign: "center",
      fontSize: 18,
      paddingTop: 20,
    },
    yesNo: {
      fontSize: 18,
      textAlign: "center",
      color: "white",
      paddingTop: 5,
    },
  });

  return (
    <View style={styles.mainView}>
      {modal ? (
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#0000006e",
            position: "absolute",
            zIndex: 10,
          }}
        ></View>
      ) : null}
      <View style={styles.upLogo}>
        <Image
          source={require("../assets/HYRA REAL ESTATE LOGO 1.png")}
          style={{
            height: 170,
            width: 170,
            objectFit: "contain",
            marginLeft: "20%",
            marginTop: "10%",
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ChangePassword");
        }}
        style={styles.changePass}
      >
        <Fontisto
          style={{ marginLeft: 20 }}
          name="locked"
          size={24}
          color="#104F9C"
        />

        <Text style={styles.changePassText}>Change Password</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent visible={modal}>
        <View style={styles.ModalMain}>
          <Text style={styles.modalText}>Are you sure you want to</Text>
          <Text style={[styles.modalText, { paddingTop: 5 }]}>Log Out?</Text>

          <View style={styles.modalBtnMain}>
            <TouchableOpacity
              // onPress={() => {
              //   setModal(false);
              //   navigation.navigate("Login");
              // }}
              onPressIn={() => setIsYesPressed(true)}
        onPressOut={() => setIsYesPressed(false)}
              onPress={handleYesLogout}
              activeOpacity={1}
              style={[styles.yesBtn , { backgroundColor: isYesPressed ?  colorCodes.navyBlueButton : 'transparent'} ]}
            >
              <Text style={[styles.yesNo,{ color: isYesPressed? "white" : colorCodes.navyBlueButton }]}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
             onPressIn={() => setIsNoPressed(true)}
             onPressOut={() => setIsNoPressed(false)}
              onPress={() => setModal(false)}
              style={[styles.noBtn , { backgroundColor: isNoPressed ?  colorCodes.navyBlueButton : 'transparent'}]}
              activeOpacity={1}
            >
              <Text
                style={[styles.yesNo, { color: isNoPressed? "white" : colorCodes.navyBlueButton }]}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("EditProfile");
        }}
        style={styles.changePass}
      >
        <FontAwesome6
          style={{ marginLeft: 20 }}
          name="user-plus"
          size={24}
          color="#104F9C"
        />
        
        <Text style={styles.changePassText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setModal(true)}
        style={styles.changePass}
      >
        <MaterialIcons
          style={{ marginLeft: 20 }}
          name="logout"
          size={24}
          color="#104F9C"
        />
        <Text style={styles.changePassText}>Log Out</Text>
      </TouchableOpacity>
      <View style={{position:"absolute",bottom:14,alignSelf:"center"}}>
        <Text style={{color:colorCodes.secondaryLightGray}}>Version : {appVersion}</Text>
      </View>
    </View>
  );
};

export default DrawerNavigation;
