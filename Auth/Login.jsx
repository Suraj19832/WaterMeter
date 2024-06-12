import React, { useEffect, useState } from "react";
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
} from "react-native";
import appApi from "../Helper/Api";
import CheckBox from "react-native-check-box";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState({});
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const loadRememberedData = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem("email");
        const savedPassword = await AsyncStorage.getItem("password");
        if (savedEmail && savedPassword) {
          setEmail(savedEmail);
          setPassword(savedPassword);
          setChecked(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadRememberedData();
  }, []);

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  const errors = {};
  const validation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email == null) {
      errors.email = "email id is required";
    }
    if (email == "") {
      errors.email = "email id is required";
    }
    if (!emailRegex.test(email)) {
      errors.email = "incorrect email format";
    }
    if (password == null) {
      errors.password = "password is required";
    }
    if (password == "") {
      errors.password = "password is required";
    }
    if (password !== "") {
      if (password.length < 7) {
        errors.password = "password should be more than 6";
      }
    }
    setValidationError({});

    if (Object.keys(errors).length > 0) {
      setValidationError(errors);
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validation() === false) {
      return;
    } else {
      const data = {
        email: email,
        password: password,
      };
      setIsLoading(true);
      setDisabledBtn(true);
      appApi
        .login(data)
        .then(async (res) => {
          setIsLoading(false);
          setDisabledBtn(false);
          if (res?.status) {
            showToast(res?.message);
            await AsyncStorage.setItem("token", res?.authorization?.token);
            console.log(res?.authorization?.token);
            if (checked) {
              await AsyncStorage.setItem("email", email);
              await AsyncStorage.setItem("password", password);
            } else {
              await AsyncStorage.removeItem("email");
              await AsyncStorage.removeItem("password");
            }
            navigation.navigate("Dashboard");
          } else {
            showToast(res?.message);
          }
        })
        .catch((err) => {
          console.log(err, "error from api");
          setIsLoading(false);
          setDisabledBtn(false);
        });
    }
  };

  useEffect(() => {
    if (email && password) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [email, password]);

  const handleCheckBoxToggle = () => {
    setChecked(!checked);
  };
  return (
    <View style={styles.container}>
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
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.heading}>Login</Text>
          <View>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email or Username"
              placeholderTextColor="#656263"
              style={styles.email}
              // autoComplete={true}
            />
            {validationError.email && (
              <Text style={{ color: "red", fontWeight: "500", left: 45 }}>
                {validationError.email}
              </Text>
            )}
          </View>
          <View>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              placeholderTextColor="#656263"
              style={styles.password}
              // autoComplete={true}
            />
            {validationError.password && (
              <Text style={{ color: "red", fontWeight: "500", left: 45 }}>
                {validationError.password}
              </Text>
            )}
          </View>

          <View style={styles.RememberPassword}>
            <View style={styles.rememberMain}>
              <View>
                <View>
                  <CheckBox
                    onClick={handleCheckBoxToggle}
                    isChecked={checked}
                  />
                </View>
              </View>
              <Text style={styles.remember}>Remember Me</Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("VerifyEmail")}
            >
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleLogin}
            disabled={disabledBtn}
            style={[styles.submitBtn, { opacity: disabledBtn ? 0.5 : 1 }]}
          >
            {isLoading ? (
              <ActivityIndicator size={"small"} />
            ) : (
              <Text style={styles.submitText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
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
    lineHeight: 32.81,
  },
  email: {
    height: 60,
    width: "85%",
    borderWidth: 1,
    margin: "auto",
    borderRadius: 18,
    borderColor: "#2198C9",
    paddingLeft: 20,
    fontSize: 14,
    marginTop: "7%",
    fontWeight: "400",
  },
  password: {
    height: 60,
    width: "85%",
    borderWidth: 1,
    margin: "auto",
    borderRadius: 18,
    borderColor: "#2198C9",
    paddingLeft: 20,
    fontSize: 14,
    marginTop: "4%",
    fontWeight: "400",
  },
  RememberPassword: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
    width: "85%",
    margin: "auto",
    justifyContent: "space-between",
    alignItems: "center",
  },
  remember: {
    fontWeight: "light",
    color: "#104F9C",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 16.41,
    fontFamily: "Roboto",
  },
  forgot: {
    color: "#104F9C",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 16.41,
    fontFamily: "Roboto",
  },
  rememberMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtn: {
    height: 50,
    width: 150,
    margin: "auto",
    marginTop: 40,
    borderRadius: 8,
    backgroundColor: "#ff770065",
  },
  loginTxt: {
    textAlign: "center",
    fontSize: 18,
    paddingTop: 10,
    height: 50,
    color: "white",
  },
  submitBtn: {
    alignSelf: "center",
    backgroundColor: "#FF8902",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 30,
    width: 130,
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

export default Login;
