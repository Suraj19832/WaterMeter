import React, { useEffect, useState } from "react";
import { ToastProvider, useToast } from "react-native-toast-notifications";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../redux/slices/Authslice";
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
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import appApi from "../Helper/Api";
import CheckBox from "react-native-check-box";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { colorCodes } from "../ColorCodes/Colors";
import { Ionicons } from '@expo/vector-icons'; 
function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState({});
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showPassword, setShowPassword] = useState(false); 
  const dispatch = useDispatch();
  const toast = useToast();

  console.log(latitude, longitude, "????????????????????");

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        console.log(latitude, longitude, "<<<<<<<<<<<<");
        setLocationPermission(true);
      } else {
        setLocationPermission(false);
        Alert.alert(
          "Location Permission Denied",
          "Please allow location permission to use this app."
        );
      }
    } catch (err) {
      console.warn(err, "::::::::::::");
      setLocationPermission(false);
    }
  };
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const saveLocationApi = () => {
    const data = {
      lat: latitude,
      lng: longitude,
    };
    console.log("checking");
    appApi
      .saveLocationApi(data)
      .then((res) => {
        console.log(res, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<response");
      })
      .catch((err) => {
        console.log(err, "<<<<<<<<<<<<<<<<<<<<<error");
      });
  };

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
    if (locationPermission === false) {
      requestLocationPermission();
      return;
    }
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
          console.log(res?.status ,"status ")
          if (res?.status) {
            
            toast.show(res?.message, { type: "sucess" });
            await AsyncStorage.setItem("token", res?.authorization?.token);
            dispatch(setAuthToken(res?.authorization?.token));
            // dispatch(setAuthToken(null));
        
            const savedEmail = await AsyncStorage.getItem("token")
   console.log(savedEmail,"flflflflflflflflflflflflfl")
            saveLocationApi();
            if (checked) {
              await AsyncStorage.setItem("email", email);
              await AsyncStorage.setItem("password", password);
            } else {
              await AsyncStorage.removeItem("email");
              await AsyncStorage.removeItem("password");
            }
            // navigation.navigate("Dashboard");
          } else {
            toast.show(res?.message, { type: "warning" });
          }
        })
        .catch((err) => {
          console.log(err, "error from api");
          toast.show(err.message, { type: "warning" });
          setIsLoading(false);
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
    <KeyboardAvoidingView behavior="padding">
      <ScrollView contentContainerStyle={{}}>
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
              <TouchableOpacity
                onPress={() => {
                  toast.show("hello", { type: "warning" });
                }}
              >
                <Text style={styles.heading}>Login</Text>
              </TouchableOpacity>
              <View>
                <TextInput
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  placeholder="Email or Username"
                  placeholderTextColor={colorCodes.placeholder}
                  style={styles.email}
                />
                {validationError.email && (
                  <Text style={{ color: "red", fontWeight: "500", left: 45 }}>
                    {validationError.email}
                  </Text>
                )}
              </View>
              <View style={styles.viewpass}>
                <TextInput
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  placeholder="Password"
                  placeholderTextColor={colorCodes.placeholder}
                  style={styles.password}
                  secureTextEntry={!showPassword}
                />
                  <TouchableOpacity
        style={{paddingRight:20}}
        onPress={() => setShowPassword(!showPassword)}
      >
        <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={16} color="rgba(101, 98, 99, 1)" />
      </TouchableOpacity>
                {validationError.password && (
                  <Text style={{ color: "red", fontWeight: "500", left: 45 }}>
                    {validationError.password}
                  </Text>
                )}
              </View>

{/* <View>
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        placeholderTextColor={colorCodes.placeholder}
        style={styles.password}
        secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
      />
      <TouchableOpacity
        style={{ position: 'absolute', right: 10, top: 12 }}
        onPress={() => setShowPassword(!showPassword)}
      >
        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
      </TouchableOpacity>
      {validationError.password && (
        <Text style={{ color: 'red', fontWeight: '500', left: 45 }}>
          {validationError.password}
        </Text>
      )}
    </View> */}

              <View style={styles.RememberPassword}>
                <View style={styles.rememberMain}>
                  <View>
                    <View>
                      <CheckBox
                        onClick={handleCheckBoxToggle}
                        isChecked={checked}
                        checkBoxColor={colorCodes.yaleBlue}
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
    color: colorCodes.heading,
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
    borderColor: colorCodes.borderColor,
    paddingLeft: 20,
    fontSize: 14,
    marginTop: "7%",
    fontWeight: "400",
    color: colorCodes.placeholderFill,
  },
  viewpass:{
    height: 60,
    width: "85%",
    borderWidth: 1,
    margin: "auto",
    borderRadius: 18,
    borderColor: colorCodes.borderColor,
    marginTop: "4%",
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row'
  },
  password: {
   
    paddingLeft: 20,
    fontSize: 14,
    fontWeight: "400",
    color: colorCodes.placeholderFill,
     width: "85%"
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
    color: colorCodes.yaleBlue,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 16.41,
    fontFamily: "Roboto",
  },
  forgot: {
    color: colorCodes.yaleBlue,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 16.41,
    fontFamily: "Roboto",
  },
  rememberMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtn: {
    alignSelf: "center",
    backgroundColor: colorCodes.submitButtonEnabled,
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
    color: colorCodes.white,
  },
});

export default Login;
