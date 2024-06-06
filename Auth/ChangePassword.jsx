import React, { useState } from "react";
import { Dimensions, Image, ImageBackground, Text } from "react-native";
import { Button } from "react-native";
import { View, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import bgLogin2 from "../assets/bgLogin2.jpg";
import CheckBox from "react-native-check-box";
import { ScrollView } from "react-native-gesture-handler";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import SubmitButton from "../Components/SubmitButton";

function ChangePassword({ navigation }) {
  const [checked, setChecked] = useState(true);

  const handleLogin = () => {
    alert("Logged in successfully");
  };

  const handleCheckBoxToggle = () => {
    setChecked(!checked);
  };
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <SafeAreaView>
      <ScrollView style={{height:'auto'}}>
        {/* <ImageBackground
                    source={require('../assets/bgLogin3.jpg')}
                    resizeMode="cover"
                    style={styles.image}
                >

                    <View  style={{marginTop:'80%'}}>
                        <Text style={styles.heading} >
                        Change Password
                        </Text>
                        <TextInput placeholder="Email or Username"  style={styles.email} />
                  

                        <TextInput   placeholder="Password"  style={styles.password} />
                        <View style={styles.RememberPassword} >
                            <View style={styles.rememberMain}>
                           <View>
                           <View >
                           <CheckBox onClick={()=> setChecked(!checked)} isChecked={checked}  />
                           
                           </View>
                           </View>
                              <Text  style={styles.remember}>
                                Remember Me
                              </Text>
                            </View>

                            <View>
                                <Text style={styles.forgot} >
                                    Forgot Password?
                                </Text>
                                
                            </View>
                        </View>

                        <TouchableOpacity onPress={handleLogin} style={styles.loginBtn} >
                            <Text style={styles.loginTxt } >
                                Login
                            </Text>
                        </TouchableOpacity>

                       
                    </View>
                    <TouchableOpacity onPress={()=>navigation.navigate("Dashboard")} style={{margin:"auto",}} >
                <Text>
                    Go to Dashboard
                </Text>
            </TouchableOpacity>
                 
                </ImageBackground> */}
        {/* <View>
          <Image
            source={require("../assets/BackgroundImage.png")}
            style={styles.img}
            resizeMode="stretch"
          />
        </View> */}

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
            <Text style={styles.heading}>Change Password</Text>
            {/* <TextInput placeholder="Current Password" style={styles.password} /> */}
{/* 
            <TextInput placeholder="Enter New Password" style={styles.password} /> */}
   
            {/* <TextInput placeholder="Enter New Password" style={styles.password} />/ */}
       
            

<View style={styles.fields_main}>
      <View style={styles.input_box}>
        {/* <Text>chnage</Text> */}
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          placeholderTextColor={"rgba(166, 166, 166, 1)"}
          secureTextEntry={!isPasswordVisible}  
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <FontAwesome5 
            name={isPasswordVisible ? "eye" : "eye-slash"} 
            size={14} 
            color="black" 
          />
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.fields_main}>
      <View style={styles.input_box}>
        <TextInput
          style={styles.input}
          placeholder="Enter New Password"
          placeholderTextColor={"rgba(166, 166, 166, 1)"}
          secureTextEntry={!isPasswordVisible}  
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <FontAwesome5 
            name={isPasswordVisible ? "eye" : "eye-slash"} 
            size={14} 
            color="black" 
          />
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.fields_main}>
      <View style={styles.input_box}>
        <TextInput
          style={styles.input}
          placeholder="Enter New Password"
          placeholderTextColor={"rgba(166, 166, 166, 1)"}
          secureTextEntry={!isPasswordVisible}  
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <FontAwesome5 
            name={isPasswordVisible ? "eye" : "eye-slash"} 
            size={14} 
            color="black" 
          />
        </TouchableOpacity>
      </View>
    </View>
            <View style={{marginVertical:20 ,marginBottom:20}}>
            <SubmitButton  text="Submit"
        bgColor="rgba(255, 137, 2, 0.5)"
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
    opacity: 0.2,
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
  email: {
    height: 60,
    width: "85%",
    borderWidth: 1,
    margin: "auto",
    borderRadius: 18,
    borderColor: "#2198C9",
    paddingLeft: 20,
    fontSize: 14,
    marginTop: 30,
    marginBottom: 20,
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
    marginBottom:20
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
    // backgroundColor: "rgba(255, 199, 0, 0.2)",
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 18,
    gap: 8,
    borderWidth: 1,
    borderColor: "#2198C9",
    fontSize: 14,

     height: 60,
    // width: "85%",
    // borderWidth: 1,
    // margin: "auto",
    // borderRadius: 18,
    // borderColor: "#2198C9",
    // paddingLeft: 20,
    // fontSize: 14,
    // marginBottom:20
  },
  input: {
    position: "relative",
    color: "black",
    width: "90%",
    height:"100%"
  },
});

export default ChangePassword;
