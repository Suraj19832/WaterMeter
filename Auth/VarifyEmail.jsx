import React, { useState } from "react";
import { Dimensions, Image, ImageBackground, Text } from "react-native";
import { Button } from "react-native";
import { View, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import bgLogin2 from "../assets/bgLogin2.jpg";
import CheckBox from "react-native-check-box";
import { ScrollView } from "react-native-gesture-handler";
import { Feather, FontAwesome5, Fontisto } from "@expo/vector-icons";
import SubmitButton from "../Components/SubmitButton";

function VarifyEmail({ navigation }) {
//   const [checked, setChecked] = useState(true);

 

  
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
const [email, setEmail] = useState("");
const [emailError, setEmailError] = useState(null);
//   const [isConfirmPassword ,setIsConfirmPassword] = useState("");
//   const passwordsMatch = isNewPassword && isConfirmPassword && isNewPassword === isConfirmPassword;

const handleEmailChange = (text) => {
    setEmail(text);
    if (text.trim()) {
      setEmailError(null);
    }
  };
  const validateEmail = () => {
    // Regular expression pattern to validate email format
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
 
  return (
    <SafeAreaView>
      <ScrollView style={{height:'auto'}}>
     
        <ImageBackground
          source={require("../assets/BackgroundImage.png")}
          resizeMode='cover'
          style={styles.image}
        />
        <View style={{ position: "absolute" }}>
          <Image
            source={require("../assets/Rectangle 11.png")}
            style={{ height: Dimensions.get("window").height*0.44, width: Dimensions.get("window").width ,zIndex:1}}
           
          />
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
              style={{ height: 105, width: 158 ,zIndex:2}}
            ></Image>
          </View>
          <View style={{ alignItems:'center',justifyContent:'center'}}>
            <Text style={styles.heading}>Enter Your Email Id</Text>
    
       
            


    <View style={styles.fields_main}>
      <View style={styles.input_box}>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Email"
          placeholderTextColor={"rgba(166, 166, 166, 1)"}
          onChangeText={handleEmailChange}
          onBlur={validateEmail}
          value={email}
        />
     
     <Fontisto name="email" size={14} color="rgba(101, 98, 99, 1)" />
      
      </View>
    </View>
    {emailError ? (
                <Text style={{ color: "red" }}>{emailError}</Text>
              ) : null}
  
            <View style={{marginVertical:20 ,marginBottom:20}}>
            <SubmitButton  text="Submit"
        // bgColor={passwordsMatch  ?"rgba(255, 137, 2, 1)":"rgba(255, 137, 2, 0.5)"}
        height={48}
        width={246}
        textSize={18} />
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
    zIndex:0
  },
  heading: {
    fontSize: 28,
    textAlign: "center",
    fontWeight:'500',
    lineHeight:32,
    marginTop:30,
    color: "#5EC2C6",
    marginBottom:20
  },
  





 


  // shourya

  img: {
    opacity: "10%",
  },
  fields_main: {
    marginTop: 17,
    width:'85%'
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
    height:"100%",
    fontSize:20
  },
});

export default VarifyEmail;
