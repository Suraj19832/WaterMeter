import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import appApi from "../Helper/Api";
import InputField from "../Components/InputField";
import { DoLogout } from "../Helper/Helper";

function ChangePassword({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const validation = () => {
    if (newPassword !== confirmPassword) {
      showToast("New and Confirm password should  match");
      return false;
    }
    if (currentPassword.length < 8) {
      showToast("The current password field must be at least 8 characters");
      return false;
    }
    return true;
  };

  const handleConfirmPassword = () => {
    if (validation() === false) {
      return;
    } else {
      const data = {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      };
      setIsLoading(true);
      setDisabledBtn(true);
      appApi
        .changePassword(data)
        .then((res) => {
          setIsLoading(false);
          setDisabledBtn(false);
          if (res?.status) {
            showToast(res?.message);
            navigation.navigate("Dashboard");
          } else {
            showToast(res?.message);
          }
        })
        .catch((err) => {
          DoLogout()
          setIsLoading(false);
          setDisabledBtn(false);
        });
    }
  };

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  useEffect(() => {
    if (
      currentPassword.length > 0 &&
      newPassword.length > 0 &&
      confirmPassword.length > 0
    ) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [currentPassword, newPassword, confirmPassword]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground
          source={require("../assets/BackgroundImage.png")}
          resizeMode="cover"
          style={styles.image}
          imageStyle={{ opacity: 0.1 }}
        >
          <View style={styles.content}>
            <Image
              source={require("../assets/Rectangle 11.png")}
              style={styles.rectangleImg}
            />
            <Image
              source={require("../assets/HYRA REAL ESTATE LOGO 1.png")}
              style={styles.diamondImg}
            />
            <TouchableOpacity
              onPress={navigation.goBack}
              style={{ position: "absolute" ,zIndex:1}}
            >
              <Image
                source={require("../assets/left-arrow.png")}
                style={{
                  height: 22,
                  width: 12,
                  position: "absolute",
                  top: 45,
                  left: 20,
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.heading}>Change Password</Text>
            <View style={styles.inputContainer}>
          
              <InputField
                setValue={setCurrentPassword}
                value={currentPassword}
                placeholderValue="Current Password"
                ispassword={true}
              />

              <InputField
                setValue={setNewPassword}
                value={newPassword}
                placeholderValue="Enter New Password"
                ispassword={true}
              />

              <InputField
                setValue={setConfirmPassword}
                value={confirmPassword}
                placeholderValue="Confirm Password"
                ispassword={true}
              />

            
            </View>
            <TouchableOpacity
              style={[styles.submitBtn, { opacity: disabledBtn ? 0.5 : 1 }]}
              disabled={disabledBtn}
              onPress={handleConfirmPassword}
            >
              {isLoading ? (
                <ActivityIndicator size={"small"} />
              ) : (
                <Text style={styles.submitText}>Change Password</Text>
              )}
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  content: {
    position: "relative",
  },
  rectangleImg: {
    height: Dimensions.get("window").height * 0.445,
    width: Dimensions.get("window").width,
  },
  diamondImg: {
    height: 101,
    width: 139,
    position: "absolute",
    top: 100,
    alignSelf: "center",
  },
  heading: {
    fontSize: 28,
    textAlign: "center",
    color: "#5EC2C6",
    fontFamily: "Roboto",
    fontWeight: "700",
    // lineHeight: 32.81,
  },
  inputContainer: {
    marginHorizontal: 25,
    marginTop: 20,
  },
  

  // end
  submitBtn: {
    alignSelf: "center",
    backgroundColor: "#FF8902",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 30,
    width: 246,
    alignItems: "center",
  },
  submitText: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Roboto",
    lineHeight: 21.09,
    color: "#FFFFFF",
  },
});

export default ChangePassword;
