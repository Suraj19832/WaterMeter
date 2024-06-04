import React, { useState } from "react";
import { Dimensions, ImageBackground, Text } from "react-native";
import { Button } from "react-native";
import { View, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import bgLogin2 from "../assets/bgLogin2.jpg";
import CheckBox from 'react-native-check-box'




function Login({ navigation }) {

const [checked,setChecked] = useState(true)


const handleLogin =()=>{
    alert("Logged in successfully")
}

const handleCheckBoxToggle = () => {
    setChecked(!checked);
  };


    return (
        <SafeAreaView >
            <View>
                <ImageBackground
                    source={require('../assets/bgLogin3.jpg')}
                    resizeMode="cover"
                    style={styles.image}
                >

                    <View  style={{marginTop:320}}>
                        <Text style={{fontSize:25,textAlign:"center",height:40,marginTop:20,color:"#5EC2C6",fontWeight:400}} >
                            Login
                        </Text>
                        <TextInput placeholder="Email or Username"  style={{height:60,width:"85%",borderWidth:1,margin:"auto",borderRadius:18,borderColor:"#2198C9",paddingLeft:20,fontSize:14,marginTop:30,marginBottom:20,}} />

                        <TextInput placeholder="Password"  style={{height:60,width:"85%",borderWidth:1,margin:"auto",borderRadius:18,borderColor:"#2198C9",paddingLeft:20,fontSize:14,}} />
                        <View style={{display:"flex",flexDirection:"row",marginTop:15,width:"85%",margin:"auto",justifyContent:"space-between",alignItems:"center",}} >
                            <View style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                           <View>
                           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                           <CheckBox onClick={()=> setChecked(!checked)} isChecked={checked}  />
                           
                           </View>
                           </View>
                              <Text  style={{fontWeight:"light",color:"#104F9C",fontSize:13}}>
                                Remember Me
                              </Text>
                            </View>

                            <View>
                                <Text style={{fontWeight:"light",color:"#104F9C",height:20,fontSize:13}} >
                                    Forgot Password?
                                </Text>
                                
                            </View>
                        </View>

                        <TouchableOpacity onPress={handleLogin} style={{height:50,width:150,margin:"auto",marginTop:40,borderRadius:8,backgroundColor:"#ff770065"}} >
                            <Text style={{textAlign:"center",fontSize:18,paddingTop:10,height:50,color:"white"}} >
                                Login
                            </Text>
                        </TouchableOpacity>

                       
                    </View>
                 
                </ImageBackground>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
  
    },
    image: {
    
        width:Dimensions.get('window').width * 1,
        height:Dimensions.get('window').height * 1
    },
  
});


export default Login;