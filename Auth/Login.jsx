import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import appApi from "../Helper/Api";
import CheckBox from "react-native-check-box";

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState({});
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  console.log(checked, "<=================");

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

  const handleLogin = () => {
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
        .then((res) => {
          showToast(res?.message);
          setIsLoading(false);
          setDisabledBtn(false);
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
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <ScrollView>
        <ImageBackground
          source={require("../assets/bgLogin3.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={{ marginTop: "85%" }}>
            <Text style={styles.heading}>Login</Text>
            <View>
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Email or Username"
                style={styles.email}
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
                style={styles.password}
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
                      onClick={() => setChecked(!checked)}
                      isChecked={checked}
                    />
                  </View>
                </View>
                <Text style={styles.remember}>Remember Me</Text>
              </View>

              <TouchableOpacity>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width * 1,
    height: Dimensions.get("window").height * 1,
  },
  heading: {
    fontSize: 25,
    textAlign: "center",
    height: 40,
    marginTop: 20,
    color: "#5EC2C6",
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
    // marginBottom: "5%",
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
    fontSize: 13,
  },
  forgot: {
    fontWeight: "light",
    color: "#104F9C",
    height: 20,
    fontSize: 13,
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
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Roboto",
    lineHeight: 21.09,
    color: "#FFFFFF",
  },
});

export default Login;
