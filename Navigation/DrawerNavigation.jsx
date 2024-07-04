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
const DrawerNavigation = ({ navigation }) => {
  const [modal, setModal] = useState(false);
  const [isYesPressed, setIsYesPressed] = useState(false);
  const [isNoPressed, setIsNoPressed] = useState(false);
  const dispatch = useDispatch();
  // function showToast(message) {
  //   ToastAndroid.show(message, ToastAndroid.SHORT);
  // }
  const toast = useToast();
  const handleYesLogout = async () => {
    //  await AsyncStorage.removeItem("token");
    //  const savedEmail = await AsyncStorage.getItem("token")
    //  console.log(savedEmail,"flflflflflflflflflflflflfl")
    // console.log("token start removeing")
    // await AsyncStorage.removeItem("token");
    // dispatch(setAuthToken(null));
    // console.log("token remove successfully ")
    // // navigation.navigate("Login");
    // const token = await AsyncStorage.getItem('token');
    //       console.log(token ,"in drawer navigation before funcrion call ")
    try {
      setModal(false);
      // showToast("Wait a Second");
      toast.show("Wait a Second", { type: "sucess" });
      const res = await appApi.logout();
      console.log(res?.status, "mxmxmxmxmxm");
      if (res?.status) {
        // showToast("Logout Successfully");
        toast.show("Logout Successfully", { type: "sucess" });
        await AsyncStorage.removeItem("token");
        dispatch(setAuthToken(null));
        // await AsyncStorage.removeItem("token");
        // const token = await AsyncStorage.getItem('token');
        // console.log(token ,"in drawer navigation")
        // dispatch(setAuthToken(null));
      }
    } catch (error) {
      // navigation.navigate("Login");
      console.log(error, "hihi");
      // showToast("Logout Successfully");
      toast.show("Logout Successfully", { type: "sucess" });
      await AsyncStorage.removeItem("token");
      dispatch(setAuthToken(null));
    } finally {
    }
  };

  // const handleYesLogout = async () => {
  //   await AsyncStorage.removeItem("token");
  //   const savedEmail = await AsyncStorage.getItem("token");
  //   console.log(savedEmail, "flflflflflflflflflflflflfl");

  //   try {
  //     setModal(false);
  //     showToast("Wait a Second");

  //     const res = await appApi.logout();
  //     console.log(res, "??????????????????????????");

  //     if (res?.status) {
  //       showToast("Logout Successfully");
  //       navigation.navigate("Login");
  //     } else if (res?.message === "Unauthenticated.") {
  //       showToast("Error");
  //       console.log("bbbbbbbbbb");
  //     }
  //   } catch (error) {
  //     let errorMessage = "An unexpected error occurred";

  //     if (error.response) {
  //       const { response } = error;

  //       // Check if the response data is a string that starts with "<"
  //       if (typeof response.data === 'string' && response.data.trim().startsWith('<')) {
  //         errorMessage = "Received an HTML response from the server.";
  //       } else {
  //         // Try to parse the response data as JSON
  //         try {
  //           const responseData = JSON.parse(response.data);
  //           if (response.status === 401 && responseData.message) {
  //             errorMessage = responseData.message;
  //           } else {
  //             errorMessage = JSON.stringify(responseData);
  //           }
  //         } catch (e) {
  //           errorMessage = response.data.toString();
  //         }
  //       }
  //     } else if (error.request) {
  //       // Request was made but no response was received
  //       errorMessage = "No response received from server";
  //     } else {
  //       // Something happened in setting up the request that triggered an error
  //       errorMessage = error.message;
  //     }

  //     showToast(errorMessage);
  //     console.log(errorMessage, "hihi333333333333");
  //   } finally {
  //     // Any cleanup operations
  //   }
  // };

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
    </View>
  );
};

export default DrawerNavigation;
