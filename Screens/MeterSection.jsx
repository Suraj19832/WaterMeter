import { AntDesign, Entypo, FontAwesome6 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View,StyleSheet,Text, ImageBackground,Modal } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import SubmitButton from '../Components/SubmitButton'
import { colorCodes } from '../ColorCodes/Colors'
import { Button,  } from 'react-native'


export default function MeterSection({navigation}) {

const [selectMeter,setSelectMeter] = useState(false);
const [modal,setModal] = useState(false);
const [modal2,setModal2] = useState(false);

    const styles = StyleSheet.create({
      headArrow:{
        width:"90%",
        margin:"auto",
        height:30,
        marginTop:10,
      },
      propertyName:{
        width:"90%",
        height:50,
        margin:"auto",
        marginTop:30,
        borderRadius:15,
        backgroundColor:colorCodes.bgLightGrey,
        shadowColor:"#2198C9",
        elevation:10,
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",

      },
      propertyNameFTxt:{
        fontSize:23,
        color:"#0B9ED2",
        fontWeight:"500",
        paddingBottom:5,
        letterSpacing:0.5

      },
      propertyNameSTxt:{
        fontSize:22,
        color:"#0B9ED2",
        height:30,
        letterSpacing:0.5
      },
      meterLabel:{
       fontSize:18,
       color:"#0B9ED2",
       fontWeight:"400",
       paddingTop:30,
       paddingLeft:20,
       height:60,
      },
      upperDropdown:{
       borderWidth:1,
       width:"90%",
       height:50,
       margin:"auto",
       marginTop:20,
       borderRadius:15,
       borderColor:"#0B9ED2",
       display:"flex",
       flexDirection:"row",
       justifyContent:"space-around",
       alignItems:"center",
       gap:220
      },
      upDropDownTxt:{
        color:"grey",
        fontSize:18,
        fontWeight:"500",
        paddingBottom:5
      },
      betweenDropDowns:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
      },
      meterNotes:{
        width:"90%",
        height:40,
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        marginTop:20
      },
      meterNotesTxt:{
       fontSize:17,
       color:"#0F77AF",
       paddingLeft:20
      },
      downDropDownTxt:{
        color:"grey",
        fontSize:16,
        fontWeight:"400",
        height:25
      },
      downDropDown:{
        borderWidth:1,
        width:"90%",
        height:50,
        margin:"auto",
        marginTop:20,
        borderRadius:15,
        borderColor:"#0B9ED2",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        gap:100
      },
      pendingMeters:{
        height:30,
        width:"31%",
        borderRadius:100,
        alignSelf:"end",
        backgroundColor:"#197AB6",
        marginTop:20,
        marginLeft:250
      },
      pendingMetersTxt:{
        color:"white",
        textAlign:"center",
        paddingTop:5,
        height:30,
        fontSize:12
      },
      selectMeterBtn:{
        height: 40,
        width: 120,
        borderRadius: 10,
        backgroundColor: "#FF8902",
        margin:"auto",
        marginTop:60
      },
      selectMeterTxt:{
        color:"white",
        fontSize:16,
        textAlign:"center",
        paddingTop:8 
      },
      imageShow:{
        height:130,
        width:"90%",
 
        margin:"auto",

        backgroundColor:"#414141",
        borderRadius:8

      },
      meterNameScan:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
      

      },
      Modal:{
        margin:"auto",
        width:"90%",
        backgroundColor:"white",
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center",
        height:200,
        shadowColor:"black",
        elevation:50

},
ModalText:{
fontSize:17,
textAlign:"center",
padding:10,

},
ModalButton:{
backgroundColor:colorCodes.submitButtonEnabled,
color:"white",
width:100,
height:35,
textAlign:"center",
paddingTop:6,
borderRadius:10,
marginLeft:"60%",
marginTop:"6%"
},
meterRead:{
  height:"27%",
  width:"90%",
  borderWidth:1,
  margin:"auto",
  borderRadius:15,
  borderColor:"#2198C9",
  marginTop:"10%"
  
},
bottomPartInfoBtn:{
  display:"flex",
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"space-between",
  width:"90%",
  margin:"auto",

},
meterText:{
  color:colorCodes.navyBlueButton,
  fontSize:18,
  paddingLeft:15,
  paddingTop:8
},
readingMain:{
  display:"flex",
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"space-between",
  width:"95%",
  margin:"auto",

},
inputBox:{
  borderWidth:1,
  height:50,
  width:50,
  borderRadius:10,
  borderColor:"#0B9ED2",
  elevation:5,
  backgroundColor:"white"
}
       
      
    })








  return (
    <SafeAreaView>
      <View style={{backgroundColor:"white"}} >
        {modal || modal2 ? <View style={{height:"100%",width:"100%", backgroundColor:"#0000006e",position:"absolute",zIndex:10}} >
          
          </View>:null}
       
      <View style={styles.headArrow} >
        <TouchableOpacity onPress={()=> navigation.navigate("Dashboard") } >
        <AntDesign name='left'  size={25} color="#0B9ED2" />
        </TouchableOpacity>
      </View>

      <View  style={styles.propertyName}>
       <Text style={styles.propertyNameFTxt} >
          M01 {" "} | 
       </Text>
       <Text style={styles.propertyNameSTxt} >
        {" "}  Masari Heights
       </Text>
      </View>

      {selectMeter?<View style={{}} >
      <View style={styles.imageShow}  >

      </View>

      <View style={[styles.meterNameScan,{width:"95%"}]} >
      <Text style={[styles.meterLabel,{fontSize:23,fontWeight:"400",paddingTop:10}]} >
        Meter : <Text style={{color:"grey"}}>
            A10
        </Text>
      </Text>
      <TouchableOpacity>
      <SubmitButton textSize={14} bgColor={colorCodes.submitButtonEnabled} height={40} width={93} text="Scan" />

      </TouchableOpacity>

      </View>

      <Modal>
        
      </Modal>


      <View style={styles.meterRead}>
        <Text style={styles.meterText} >
          Meter Reading : 
        </Text>
        <View style={styles.readingMain} >
          <View style={styles.inputBox} ></View>
          <View style={styles.inputBox} ></View>
          <View style={styles.inputBox} ></View>
          <View style={styles.inputBox} ></View>
          <View style={styles.inputBox} ></View>

        </View>

      </View>
      
      <View style={styles.bottomPartInfoBtn} >
      <Entypo name="info-with-circle" size={24} color="black" />
      <TouchableOpacity style={{margin:"auto"}} >
      <SubmitButton text="Submit Reading" textSize={18} bgColor={colorCodes.submitButtonEnabled} height={45} width={180} />
      </TouchableOpacity>
     
      <FontAwesome6 onPress={()=> setModal(true)}  style={{marginTop:5,marginLeft:10}} name="edit" size={22} color="#0F77AF" />

      </View>


      </View>:<View>
      <Text style={styles.meterLabel} >
        Meter : 
      </Text>

      <TouchableOpacity style={styles.upperDropdown} >
        <Text style={styles.upDropDownTxt} >
            A10
        </Text>
        <AntDesign size={20} color="grey" name='down'  />

      </TouchableOpacity>
      <View style={styles.betweenDropDowns} >
      <Text style={styles.meterLabel} >
        Make : <Text style={{color:"grey"}}>
            YongXi
        </Text>
      </Text>
      <TouchableOpacity>
       <ImageBackground style={{height:27,width:27,marginTop:30,marginRight:15}} resizeMode="cover" source={require("../assets/Frame.png")} >

       </ImageBackground>
      </TouchableOpacity>
      </View>
      <View style={styles.meterNotes} >
        <Text style={styles.meterNotesTxt} >
            Meter Notes :
        </Text>
    
        <FontAwesome6 onPress={()=> setModal(true)}  style={{marginTop:5,marginLeft:10}} name="edit" size={22} color="#0F77AF" />
     

       <Modal visible={modal}
       animationType='slide'
       transparent
       
   
       >
        <View     style={styles.Modal}  >
          <Text style={styles.ModalText} >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro rerum quaerat nostrum eaque, molestias deserunt tempora libero quas blanditiis laborum!
          </Text>
         
           <Text style={styles.ModalButton} onPress={()=> setModal(false)} >
            Submit
           </Text>
       

        </View>

       </Modal>
   
      </View>
      <TouchableOpacity style={styles.downDropDown} >
        <Text style={styles.downDropDownTxt} >
            Completed Readings
        </Text>
        <AntDesign size={20} color="grey" name='down'  />

      </TouchableOpacity>
      <View style={styles.pendingMeters} >
        <Text  style={styles.pendingMetersTxt} >
            99 Meters Pending
        </Text>
      </View>

      <TouchableOpacity onPress={()=> setSelectMeter(!selectMeter)} style={{margin:"auto",marginTop:50}} >
<SubmitButton  text="Select Meter" height={40} width={120} bgColor="#FF8902" textSize={14} />

</TouchableOpacity>

      </View>}
  
  <View style={{backgroundColor:"white",height:150}}>

  </View>



      
      </View>
    </SafeAreaView>
  )
}
