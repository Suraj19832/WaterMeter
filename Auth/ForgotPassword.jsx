import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  ToastAndroid,
} from "react-native";
import { Button } from "react-native";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
// import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import bgLogin2 from "../assets/bgLogin2.jpg";
import CheckBox from "react-native-check-box";
import { ScrollView } from "react-native-gesture-handler";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import SubmitButton from "../Components/SubmitButton";
import { useRoute } from "@react-navigation/native";
import appApi from "../Helper/Api";

function ForgotPassword({ navigation }) {
  //   const [checked, setChecked] = useState(true);
  const route = useRoute();
  const { email, otp } = route.params;
  const [loading, setloading] = useState(false);
  // console.log(email ,otp,"iouioouiouiouo")

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState("");
  const [isConfirmPassword, setIsConfirmPassword] = useState("");
  const [passwordLength, setpasswordLength] = useState(true);
  const passwordsMatch =
    isNewPassword && isConfirmPassword && isNewPassword === isConfirmPassword;
  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }
  const handleForgotPassword = () => {
    setloading(true);
    if (isNewPassword?.length >= 8) {
      const data = {
        email: email,
        otp: otp,
        password: isNewPassword,
        password_confirmation: isConfirmPassword,
      };
      appApi
        .ForgotPassword(data)
        .then((res) => {
          if (res?.status) {
            showToast(res?.message);
            setloading(false);
            navigation.navigate("Login");
          }
        })
        .catch((err) => {
          showToast("Server Error");
          setloading(false);
        });
    } else {
      setpasswordLength(false);
      setloading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView style={{ height: "auto" }}>
        <ImageBackground
          source={require("../assets/BackgroundImage.png")}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={{ position: "absolute" }}>
          <Image
            source={require("../assets/Rectangle 11.png")}
            style={{
              height: Dimensions.get("window").height * 0.44,
              width: Dimensions.get("window").width,
            }}
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            style={{ position: "absolute" }}
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
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              width: "100%",
              height: "50%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../assets/HYRA REAL ESTATE LOGO 1.png")}
              style={{ height: 105, width: 158, zIndex: 2 }}
            ></Image>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.heading}>Forgot Password?</Text>

            <View style={styles.fields_main}>
              <View style={styles.input_box}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter New Password"
                  placeholderTextColor={"rgba(166, 166, 166, 1)"}
                  secureTextEntry={!isPasswordVisible}
                  value={isNewPassword}
                  onChangeText={(text) => {
                    setIsNewPassword(text);
                  }}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <FontAwesome5
                    name={isPasswordVisible ? "eye" : "eye-slash"}
                    size={14}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>
            {!passwordLength && isNewPassword?.length < 8 && (
              <Text style={{ color: "red" }}>
                Password must be of 8 character
              </Text>
            )}
            <View style={styles.fields_main}>
              <View style={styles.input_box}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Confirm Password"
                  placeholderTextColor={"rgba(166, 166, 166, 1)"}
                  secureTextEntry={!isPasswordVisible}
                  value={isConfirmPassword}
                  onChangeText={(text) => {
                    setIsConfirmPassword(text);
                  }}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <FontAwesome5
                    name={isPasswordVisible ? "eye" : "eye-slash"}
                    size={14}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginVertical: 20, marginBottom: 20 }}>
              <TouchableOpacity
                disabled={!passwordsMatch}
                onPress={handleForgotPassword}
              >
                <SubmitButton
                  text="Submit"
                  bgColor={
                    passwordsMatch
                      ? "rgba(255, 137, 2, 1)"
                      : "rgba(255, 137, 2, 0.5)"
                  }
                  height={48}
                  width={246}
                  textSize={18}
                  loading={loading}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* </ImageBackground> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width * 1,
    height: Dimensions.get("window").height * 1,
    opacity: 0.1,
    position: "relative",
    zIndex: 0,
  },
  heading: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 32,
    marginTop: 30,
    color: "#5EC2C6",
    marginBottom: 20,
  },

  // shourya

  img: {
    opacity: "10%",
  },
  fields_main: {
    marginTop: 17,
    width: "85%",
  },
  inputHeading: {
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 27,
    color: "rgba(0, 54, 126, 1)",
    paddingBottom: 10,
  },
  input_box: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 18,
    gap: 8,
    borderWidth: 1,
    borderColor: "#2198C9",
    fontSize: 14,

    height: 60,
  },
  input: {
    position: "relative",
    color: "black",
    width: "90%",
    height: "100%",
    fontSize: 20,
  },
});

export default ForgotPassword;
