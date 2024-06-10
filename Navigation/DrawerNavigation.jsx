import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions,Image } from "react-native";
import logo from '../assets/HYRA REAL ESTATE LOGO 1.png';
import { AntDesign, FontAwesome6, Fontisto, MaterialIcons } from '@expo/vector-icons';


const DrawerNavigation = ({navigation}) => {

    const styles = StyleSheet.create({
        mainView:{
            backgroundColor:"#197AB6",flex:1,borderTopLeftRadius:25,borderBottomLeftRadius:25
        },
        upLogo:{
          backgroundColor:"#F9F9F9",
          height:"27%",
          borderTopLeftRadius:25,
          marginBottom:15,
         
        },
        changePass:{
            height:50,
            backgroundColor:"#F9F9F9",
           marginBottom:8,
           display:"flex",
           flexDirection:"row",
           alignItems:"center",
           gap:20,
          

        },
        changePassText:{
            color:"#104F9C",
            fontSize:20,
            textAlign:"center",
            height:40,
            paddingTop:6,
        }
    })

const onPresss =()=>{
 

}



  return (
    <View style={styles.mainView} >

 <View style={styles.upLogo} >
<Image source={
    require("../assets/HYRA REAL ESTATE LOGO 1.png")
} style={{height:170,width:170,objectFit:"contain",marginLeft:"20%",marginTop:"17%"}}  />
 </View>
 <TouchableOpacity onPress={()=>{navigation.navigate("ChangePassword")}} style={styles.changePass} >
 <Fontisto style={{marginLeft:20}} name="locked" size={24} color="#104F9C" />

<Text style={styles.changePassText} >
    Change Password
</Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={()=>{alert("Profile added")}} style={styles.changePass} >
 <FontAwesome6  style={{marginLeft:20}} name="user-plus" size={24} color="#104F9C" />
<Text style={styles.changePassText} >
   Profile
</Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={()=>{alert("Logged out successfully")}} style={styles.changePass} >
 <MaterialIcons  style={{marginLeft:20}} name="logout" size={24} color="#104F9C" />
<Text style={styles.changePassText} >
    Log Out
</Text>
 </TouchableOpacity>
    </View>
  )




}



export default DrawerNavigation;