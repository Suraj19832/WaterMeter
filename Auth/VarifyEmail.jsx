import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native";
import { View, StyleSheet } from "react-native";
// import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import bgLogin2 from "../assets/bgLogin2.jpg";
import CheckBox from "react-native-check-box";
import { ScrollView } from "react-native-gesture-handler";
import { Feather, FontAwesome5, Fontisto } from "@expo/vector-icons";
import SubmitButton from "../Components/SubmitButton";
import appApi from "../Helper/Api";
import InputField from "../Components/InputField";
import { colorCodes } from "../ColorCodes/Colors";

function VarifyEmail({ navigation }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);

  const [loading, setloading] = useState(false);
  const handleEmailChange = (text) => {
    setEmail(text);
    if (text.trim()) {
      setEmailError(null);
    }
  };
  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setEmailError("Email is required");
    } else if (!emailPattern.test(email)) {
      setEmailError("Invalid email format");
    } else {
      // setEmailError("");
      setEmailError(null);
    }
  };
  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }
  const handleVerifyEmail = () => {
    setloading(true);
    const data = {
      email: email,
    };
    appApi.verifyEmail(data).then((res) => {
      if (res?.status) {
        showToast(res?.message);
        setloading(false);
        navigation.navigate("VerifyOTP", {
          email: email,
          timer: res?.resendInSec,
        });
      } else {
        showToast("Unable to send OTP");
        setloading(false);
      }
    });
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
              height: Dimensions.get("window").height * 0.445,
              width: Dimensions.get("window").width,
            }}
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
            <Text style={styles.heading}>Enter Your Email Id</Text>

            <View style={styles.fields_main}>
              <InputField
                setValue={handleEmailChange}
                value={email}
                placeholderValue="Enter Your Email"
                isemail={true}
                validateEmail={validateEmail}
              />
            </View>

            {emailError ? (
              <Text style={{ color: colorCodes.error }}>{emailError}</Text>
            ) : null}

            <View style={{ marginVertical: 20, marginBottom: 20 }}>
              <TouchableOpacity
                disabled={!email || emailError !== null || loading}
                onPress={handleVerifyEmail}
              >
                <SubmitButton
                  text="Send OTP"
                  bgColor={
                    email && emailError === null
                      ? "rgba(255, 137, 2, 1)"
                      : "rgba(255, 137, 2, 0.5)"
                  }
                  height={48}
                  width={180}
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
    color: colorCodes.heading,
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
  input: {
    position: "relative",
    color: "black",
    width: "90%",
    height: "100%",
    fontSize: 14,
  },
});

export default VarifyEmail;
