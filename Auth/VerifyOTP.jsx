import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, ImageBackground, Text, TextInput, ToastAndroid, TouchableOpacity } from "react-native";
import { Button } from "react-native";
import { View, StyleSheet } from "react-native";
// import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import bgLogin2 from "../assets/bgLogin2.jpg";
import CheckBox from "react-native-check-box";
import { ScrollView } from "react-native-gesture-handler";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import SubmitButton from "../Components/SubmitButton";
import { useRoute } from "@react-navigation/native";
import appApi from "../Helper/Api";

function VerifyOTP({ navigation }) {
  const route = useRoute();
  const { email ,timer  } = route.params;
  const [loading, setloading] = useState(false)
    const [otp, setOtp] = useState(['', '', '', '']);
    const [time, setTime] = useState(timer);
    function showToast(message) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
    useEffect(() => {
      let timer;
      if (time > 0) {
        timer = setTimeout(() => {
          setTime(time - 1);
        }, 1000);
      }
  
      return () => clearTimeout(timer);
    }, [time]);
    // const [first, setfirst] = useState(0967)
    
  const [isButtonActive, setIsButtonActive] = useState(false);
  const otpInput1 = useRef(null);
  const otpInput2 = useRef(null);
  const otpInput3 = useRef(null);
  const otpInput4 = useRef(null);

  const invalidChars = ['.', ',', ' ', '-'];

  const handleInputChange = (text, index) => {
    if (invalidChars.includes(text)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text.length === 1 && index < 3) {
      switch (index) {
        case 0:
          otpInput2.current.focus();
          break;
        case 1:
          otpInput3.current.focus();
          break;
        case 2:
          otpInput4.current.focus();
          break;
      }
    }

    checkIfAllFieldsAreFilled(newOtp);
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      switch (index) {
        case 1:
          otpInput1.current.focus();
          break;
        case 2:
          otpInput2.current.focus();
          break;
        case 3:
          otpInput3.current.focus();
          break;
      }
    }
  };

  const checkIfAllFieldsAreFilled = (otpArray) => {
    const allFilled = otpArray.every(field => field.length === 1);
    setIsButtonActive(allFilled);
  };
const handleOTPVarification =()=>{
  setloading(true)
console.log("object")
  const otpINT =otp.join('')
  const data ={
    email :email,
    otp:otpINT
  }
  appApi.VerifyOTP(data).then((res)=>{
    // console.log(res.status)
    if (res?.status) {
      showToast(res?.message)
      setloading(false)
      navigation.navigate("ForgotPassword" ,{email ,otp:otpINT})
    }else{
      showToast(res?.message)
      setloading(false)
    }
  }
  )
  // console.log( parseInt(otpINT, 10))
}
const handleResendOTP =()=>{
  setloading(true)
  // console.log("hh")
  const data ={
    email :email
  }
  
appApi.verifyEmail(data)
.then((res)=>{
  // console.log(res?.status)
  if (res?.status) {
    showToast(res?.message)
   setTime(res?.resendInSec)
   setloading(false)
  //  console.log(res?.resendInSec)
  //  console.log()
  }
})
}
  
  return (
    <SafeAreaView>
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
              zIndex: 1,
            }}
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
              style={{ height: 105, width: 158, zIndex: 2 }}
            ></Image>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.heading}>OTP Verification</Text>
            <View>
              <Text style={styles.otpText}>
                Please Enter Verification code sent{" "}
              </Text>
              <View
                style={{ flexDirection: "row", gap: 4, alignSelf: "center" }}
              >
                <Text style={styles.otpText}>to your</Text>
                <Text style={[styles.otpText, { fontWeight: "600" }]}>
                  {email}
                </Text>
              </View>
            </View>

           





            <View style={styles.fields_main}>
      <View style={{ flexDirection: 'row', gap: 20 }}>
        <View style={styles.otpBoxes}>
          <TextInput
            style={styles.otpInputBoxes}
            keyboardType="numeric"
            maxLength={1}
            ref={otpInput1}
            value={otp[0]}
            onChangeText={(text) => handleInputChange(text, 0)}
            onKeyPress={(e) => handleKeyPress(e, 0)}
          />
        </View>
        <View style={styles.otpBoxes}>
          <TextInput
            style={styles.otpInputBoxes}
            keyboardType="numeric"
            maxLength={1}
            ref={otpInput2}
            value={otp[1]}
            onChangeText={(text) => handleInputChange(text, 1)}
            onKeyPress={(e) => handleKeyPress(e, 1)}
          />
        </View>
        <View style={styles.otpBoxes}>
          <TextInput
            style={styles.otpInputBoxes}
            keyboardType="numeric"
            maxLength={1}
            ref={otpInput3}
            value={otp[2]}
            onChangeText={(text) => handleInputChange(text, 2)}
            onKeyPress={(e) => handleKeyPress(e, 2)}
          />
        </View>
        <View style={styles.otpBoxes}>
          <TextInput
            style={styles.otpInputBoxes}
            keyboardType="numeric"
            maxLength={1}
            ref={otpInput4}
            value={otp[3]}
            onChangeText={(text) => handleInputChange(text, 3)}
            onKeyPress={(e) => handleKeyPress(e, 3)}
          />
        </View>
      </View>
      <View>
 
     {time === 0 ? (
      <TouchableOpacity onPress={handleResendOTP}>
 <Text style={{color:'rgba(94, 194, 198, 1)' ,fontWeight:'600',fontSize:14,lineHeight:21}}>Resend OTP</Text>
      </TouchableOpacity>
     
     ):(
      <Text style={{color:'rgba(166, 166, 166, 1)' ,fontWeight:'600',fontSize:14,lineHeight:21}}>Resend OTP in {time} seconds</Text>
     )}
      
    </View>
    </View>

   



      
            <View style={{ marginVertical: 20, marginBottom: 20 }}>

            
            <TouchableOpacity disabled={!isButtonActive || loading} onPress={handleOTPVarification}>
            <SubmitButton
                text="Verify"
                bgColor={
                    isButtonActive
                    ? "rgba(255, 137, 2, 1)"
                    : "rgba(255, 137, 2, 0.5)"
                }
                height={48}
                width={148}
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



  fields_main: {
    marginTop: 17,
    width: "85%",
    alignItems:'center',
    gap:20
  },


  otpText: {
    color: "rgba(166, 166, 166, 1)",
    fontSize: 12,
  },
  otpBoxes: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: "rgba(11, 158, 210, 0.3)",
    borderRadius: 10,
    alignItems:'center',
    justifyContent:'center'
  
  },
  otpInputBoxes: {
    height: 35,
    width: 18,
    fontSize: 30,
    color: "rgba(11, 158, 210, 1)",
  },
});

export default VerifyOTP;
