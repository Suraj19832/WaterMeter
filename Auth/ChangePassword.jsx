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
      showToast("new and confirm password should be matched");
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
          console.log(err, "error form chnge password");
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

  

 

  console.log("+++++++++++++++++++++++++", currentPassword);
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
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.heading}>Change Password</Text>
            <View style={styles.inputContainer}>
              {/* <View style={styles.input}>
                <TextInput
                  placeholder="Current Password"
                  placeholderTextColor="#656263"
                  style={styles.inputfield}
                  secureTextEntry={!showCurrentPass}
                  onChangeText={(text) => setCurrentPassword(text)}
                  value={currentPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowCurrentPass(!showCurrentPass)}
                >
                  {showCurrentPass ? (
                    <Feather name="eye" size={18} color="#656263" />
                  ) : (
                    <MaterialCommunityIcons
                      name="eye-off-outline"
                      size={18}
                      color="#656263"
                    />
                  )}
                </TouchableOpacity>
              </View> */}

              {/* <View style={[styles.input, isFocused && styles.inputFocused]}>
      <Animated.Text style={[styles.placeholder, { top: animatedPlaceholderPosition }, (isFocused || currentPassword) && styles.placeholderFocused]}>
        {isFocused || currentPassword ? 'Current Password' : ''}
      </Animated.Text>
      <TextInput
        placeholder={!isFocused && !currentPassword ? 'Current Password' : ''}
        placeholderTextColor="#656263"
        style={[styles.inputfield, isFocused && styles.inputfieldFocused]}
        secureTextEntry={!showCurrentPass} // Assuming you want secure entry by default
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={(text) => setCurrentPassword(text)}
        value={currentPassword}
      />
      <TouchableOpacity
        onPress={() => setShowCurrentPass(!showCurrentPass)}
        style={styles.eyeIcon}
      >
        {showCurrentPass ? (
          <Feather name="eye" size={18} color="#656263" />
        ) : (
          <MaterialCommunityIcons
            name="eye-off-outline"
            size={18}
            color="#656263"
          />
        )}
      </TouchableOpacity>
    </View> */}

              <InputField
                setValue={setCurrentPassword}
                value={currentPassword}
                placeholderValue="Current Password"
              />

              <InputField
                setValue={setNewPassword}
                value={newPassword}
                placeholderValue="Enter New Password"
              />

              <InputField
                setValue={setConfirmPassword}
                value={confirmPassword}
                placeholderValue="Confirm Password"
              />

              {/* 
              <View style={styles.input}>
                <TextInput
                  placeholder="Enter New Password"
                  placeholderTextColor="#656263"
                  style={styles.inputfield}
                  secureTextEntry={!showNewPass}
                  onChangeText={(text) => setNewPassword(text)}
                  value={newPassword}
                />
                <TouchableOpacity onPress={() => setShowNewPass(!showNewPass)}>
                  {showNewPass ? (
                    <Feather name="eye" size={18} color="#656263" />
                  ) : (
                    <MaterialCommunityIcons
                      name="eye-off-outline"
                      size={18}
                      color="#656263"
                    />
                  )}
                </TouchableOpacity>
              </View> */}
              {/* <View style={styles.input}>
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor="#656263"
                  style={styles.inputfield}
                  secureTextEntry={!showConfirmPass}
                  onChangeText={(text) => setConfirmPassword(text)}
                  value={confirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPass(!showConfirmPass)}
                >
                  {showConfirmPass ? (
                    <Feather name="eye" size={18} color="#656263" />
                  ) : (
                    <MaterialCommunityIcons
                      name="eye-off-outline"
                      size={18}
                      color="#656263"
                    />
                  )}
                </TouchableOpacity>
              </View> */}
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
    height: Dimensions.get("window").height * 0.44,
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
  // input: {
  //   borderWidth: 1,
  //   borderColor: "#2198C9",
  //   paddingVertical: 13,
  //   marginVertical: 10,
  //   borderRadius: 17,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   paddingHorizontal: 17,
  // },
  // inputfield: {
  //   fontFamily: "Roboto",
  //   fontWeight: "500",
  //   fontSize: 14,
  //   lineHeight: 16.41,
  //   width: "90%",
  // },

  input: {
    borderWidth: 1,
    borderColor: "#2198C9",
    paddingVertical: 13,
    marginVertical: 10,
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 17,
    position: "relative", // Ensure relative positioning for absolute children
  },

  inputfield: {
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16.41,
    width: "90%",
    color: "#000",
  },
  inputfieldFocused: {
    fontSize: 12, // Adjust font size when focused
    color: "#333", // Change text color when focused
  },
  placeholder: {
    position: "absolute",
    left: 17,
    color: "#656263",
    fontSize: 14,
    zIndex: 1,
  },
  placeholderFocused: {
    top: -10, // Move placeholder up when focused
    fontSize: 12, // Adjust font size when focused
    color: "#A6A6A6",
    backgroundColor: "#f3f1f1",
    // backgroundColor:"rgb(243,241,239)"
  },
  // efeded
  eyeIcon: {
    position: "absolute",
    right: 17,
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
