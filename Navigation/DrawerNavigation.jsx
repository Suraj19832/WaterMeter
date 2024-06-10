import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions,Image,Modal } from "react-native";
import logo from '../assets/HYRA REAL ESTATE LOGO 1.png';
import { AntDesign, FontAwesome6, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { colorCodes } from '../ColorCodes/Colors';


const DrawerNavigation = ({navigation}) => {

    const [modal,setModal] = useState(false);

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
        },
        ModalMain:{
            height:160,
            width:"80%",
            backgroundColor:"white",
            borderRadius:15,
            margin:"auto",
            elevation:10
        },
        modalBtnMain:{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-between",
            width:"85%",
            margin:"auto",
      
        },
        yesBtn:{
            height:40,
            width:"45%",
         
            borderRadius:7,
            backgroundColor:colorCodes.navyBlueButton
        },
        noBtn:{
            height:40,
            width:"45%",
            borderWidth:1,
            borderRadius:7,
            borderColor:colorCodes.navyBlueButton
        },
        modalText:{
            textAlign:"center",
            fontSize:18,
            paddingTop:20,
           
            

        },
        yesNo:{
            fontSize:18,
            textAlign:"center",
            color:"white",
            paddingTop:5

        }
    })




  return (
    <View style={styles.mainView} >
  {modal? <View style={{height:"100%",width:"100%", backgroundColor:"#0000006e",position:"absolute",zIndex:10}} >
          
          </View>:null}
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
 <Modal
 animationType='slide'
 transparent
 visible={modal}
 >
    <View style={styles.ModalMain}>
    <Text style={styles.modalText} >
        Are you sure you want to
        
    </Text>
    <Text  style={[styles.modalText,{paddingTop:5}]}>
    Log Out?
    </Text>

    <View style={styles.modalBtnMain} >
        <TouchableOpacity  onPress={()=> setModal(false)}  style={styles.yesBtn} >
            <Text  style={styles.yesNo} >
            Yes
            </Text>
        </TouchableOpacity>
        <TouchableOpacity   onPress={()=> setModal(false)} style={styles.noBtn} >
            <Text   style={[styles.yesNo,{color:colorCodes.navyBlueButton}]}>
                No
            </Text>
        </TouchableOpacity>
    </View>
    </View>

 </Modal>
 <TouchableOpacity onPress={()=>{alert("Profile added")}} style={styles.changePass} >
 <FontAwesome6  style={{marginLeft:20}} name="user-plus" size={24} color="#104F9C" />
<Text style={styles.changePassText} >
   Profile
</Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={()=>setModal(true) } style={styles.changePass} >
 <MaterialIcons  style={{marginLeft:20}} name="logout" size={24} color="#104F9C" />
<Text style={styles.changePassText} >
    Log Out
</Text>
 </TouchableOpacity>
    </View>
  )




}



export default DrawerNavigation;