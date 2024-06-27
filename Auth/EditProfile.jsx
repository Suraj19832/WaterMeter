import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Image, ImageBackground, Text } from "react-native";
import { Button } from "react-native";
import { View, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import SubmitButton from "../Components/SubmitButton";
import { useSelector } from "react-redux";
import { selectAuthToken ,setAuthToken } from "../redux/slices/Authslice";
import appApi from "../Helper/Api";
import { ToastAndroid } from "react-native";
import InputField from "../Components/InputField";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { setAuthToken } from "../redux/slices/Authslice";
import { useDispatch } from "react-redux";
function EditProfile({ navigation }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(true);
  const authToken = useSelector(selectAuthToken);
  const [loading, setloading] = useState(false);
  console.log(authToken, "redux setup");
  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }
  useEffect(() => {
    const fetchData = async () => {
      console.log("pppp[pppppppppppppppppppppp");

      try {
        const res = await appApi.profile();
        if (res?.status) {
          setEmail(res?.data?.email);
        }
      } catch (err) {
        console.log(err);
        showToast("Login again");
        async function handleLoginPress () {
          // showToast("Login again");
        await AsyncStorage.removeItem("token");
  dispatch(setAuthToken(null));
          navigation.navigate("Login"); // Navigate to the login screen
        }
        Alert.alert(
          "Token Expire",
          "Login Again",
          [
            {
              text: "Login",
              onPress: handleLoginPress, // Navigate to the login screen
            },
          ],
          { cancelable: false }
        );
      }
    };

    fetchData();
  }, []);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [firstname, setfirstname] = useState();
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
  const handleEdit = async () => {
    try {
      setloading(true);
      const data = {
        name: firstname,
      };
      const res = await appApi.editProfile(data);
      if (res?.status) {
        showToast(res?.message);
        navigation.navigate("Dashboard");
      } else {
        showToast("Login Agian");
      }
    } catch (error) {
      console.log(error);
      setloading(false);
      showToast("Login again");
    } finally {
      console.log("api call complete");
      // setloading(false)
      setloading(false);
    }
  };
  return (
    <SafeAreaView>
      <ScrollView style={{ height: "auto" }}>
        <ImageBackground
          source={require("../assets/BackgroundImage.png")}
          resizeMode="cover"
          style={styles.image}
        />

        <View style={{ position: "absolute" }}>
          <View style={{ position: "absolute", zIndex: 2 }}>
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
                  top: 30,
                  left: 20,
                }}
              />
            </TouchableOpacity>
          </View>

          <Image
            source={require("../assets/Rectangle 11.png")}
            style={{
              height: Dimensions.get("window").height * 0.44,
              width: Dimensions.get("window").width,
              zIndex: 1,
            }}
          />

          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              width: "100%",
              height: "40%",
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
            <Text style={styles.heading}>Edit Profile</Text>

            <InputField
              setValue={setfirstname}
              value={firstname}
              placeholderValue="Name"
              ispassword={false}
            />

            <InputField
              setValue={handleEmailChange}
              value={email}
              placeholderValue="Enter your Email id"
              ispassword={false}
            />
            {emailError ? (
              <Text style={{ color: "red" }}>{emailError}</Text>
            ) : null}

            <View style={{ marginVertical: 20, marginBottom: 20 }}>
              <TouchableOpacity
                disabled={!email || emailError != null || !firstname || loading}
                onPress={handleEdit}
              >
                <SubmitButton
                  text="Edit Profile"
                  bgColor={
                    email && emailError == null && firstname && !loading
                      ? "rgba(255, 137, 2, 1)"
                      : "rgba(255, 137, 2, 0.5)"
                  }
                  height={47}
                  width={139}
                  textSize={18}
                  loading={loading}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* </ImageBackground> */}
      </ScrollView>
    </SafeAreaView>
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
    marginTop: 12,
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
    fontSize: 14,
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
    color: "rgba(16, 79, 156, 1)",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 16,
  },
  forgot: {
    fontWeight: "500",
    color: "#104F9C",
    height: 20,
    fontSize: 14,
    lineHeight: 16,
  },
  rememberMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProfile;
