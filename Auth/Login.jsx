import React, { useState } from "react";
import { Dimensions, ImageBackground, Text } from "react-native";
import { Button } from "react-native";
import { View, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import bgLogin2 from "../assets/bgLogin2.jpg";
import CheckBox from 'react-native-check-box'
import { ScrollView } from "react-native-gesture-handler";




function Login({ navigation }) {

const [checked,setChecked] = useState(true)


const handleLogin =()=>{
    alert("Logged in successfully")
}

const handleCheckBoxToggle = () => {
    setChecked(!checked);
  };


    return (
        <SafeAreaView style={{backgroundColor:"white"}} >
            <ScrollView>
                <ImageBackground
                    source={require('../assets/bgLogin3.jpg')}
                    resizeMode="cover"
                    style={styles.image}
                >

                    <View  style={{marginTop:"85%"}}>
                        <Text style={styles.heading} >
                            Login
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
                 
                </ImageBackground>
            </ScrollView>

       

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    image: {
    
        width:Dimensions.get('window').width * 1,
        height:Dimensions.get('window').height * 1
    },
    heading:{
        fontSize:25,
        textAlign:"center",
        height:40,
        marginTop:20,
        color:"#5EC2C6",
    },
    email:{
        height:60,
        width:"85%",
        borderWidth:1,
        margin:"auto",
        borderRadius:18,
        borderColor:"#2198C9",
        paddingLeft:20,
        fontSize:14,
        marginTop:"7%",
        marginBottom:"5%",

    },
    password:{
        height:60,
        width:"85%",
        borderWidth:1,
        margin:"auto",
        borderRadius:18,
        borderColor:"#2198C9",
        paddingLeft:20,
        fontSize:14,
    },
    RememberPassword:{
        display:"flex",
        flexDirection:"row",
        marginTop:15,
        width:"85%",
        margin:"auto",
        justifyContent:"space-between",
        alignItems:"center",
    },
    remember:{
        fontWeight:"light",
        color:"#104F9C",
        fontSize:13
    },
    forgot:{
        fontWeight:"light",
        color:"#104F9C",
        height:20,
        fontSize:13
    },
    rememberMain:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    loginBtn:{
        height:50,
        width:150,
        margin:"auto",
        marginTop:40,
        borderRadius:8,
        backgroundColor:"#ff770065"
    },
    loginTxt:{
        textAlign:"center",
        fontSize:18,
        paddingTop:10,
        height:50,
        color:"white"
    }

  
});








export default Login;