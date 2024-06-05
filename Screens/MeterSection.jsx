import { AntDesign, FontAwesome6 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View,StyleSheet,Text, ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function MeterSection({navigation}) {



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
        backgroundColor:"#e7e7e7",
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
      }
    })








  return (
    <SafeAreaView>
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
        <TouchableOpacity>
        <FontAwesome6 style={{marginTop:5,marginLeft:10}} name="edit" size={22} color="#0F77AF" />
        </TouchableOpacity>
   
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

      <TouchableOpacity style={styles.selectMeterBtn} >
        <Text style={styles.selectMeterTxt} >
            Select Meter
        </Text>

      </TouchableOpacity>
      
     
    </SafeAreaView>
  )
}
