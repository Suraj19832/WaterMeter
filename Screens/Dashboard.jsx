import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text,View,StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';


function Dashboard (){

  const [toggleScheduleCompleted,setToggleScheduleCompleted] = useState(false);

  const styles = StyleSheet.create({
    topToggle:{
        height:50,
        width:"90%",
        margin:"auto",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginTop:20

    },
    scheduleBtn:{
        backgroundColor:toggleScheduleCompleted?"#F6F6F6":"#5EC2C6" ,
        height:45,
        width:"46%",
        borderRadius:10,
        borderWidth:toggleScheduleCompleted?1.5:0,
        borderColor:"#5EC2C6"
        

    },
    completedBtn:{
        height:45,
        width:"46%",
        borderRadius:10,
        borderWidth:!toggleScheduleCompleted?1.5:0,
        borderColor:"#5EC2C6",
        backgroundColor:!toggleScheduleCompleted?"#F6F6F6":"#5EC2C6"
    },
    ScheduleText:{
        color:toggleScheduleCompleted?"#5EC2C6":"white",
        textAlign:"center",
        fontSize:15,
        paddingTop:10
    },
    completeText :{
        color:!toggleScheduleCompleted?"#5EC2C6":"white",
        textAlign:"center",
        fontSize:15,
        paddingTop:10,
        height:40
    },
    prevNextMain:{
        height:50,
        width:"90%",
        margin:"auto",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginTop:20
    },
    prevBtn:{
     borderWidth:1.5,
     height:45,
     width:"25%",
     borderRadius:10,
     borderColor:"#FF6900",
     display:"flex",
     flexDirection:"row",
     justifyContent:"center",
     alignItems:"center",
     gap:10,
    },
    dateView:{
        height:45,
        width:"45%",
        borderRadius:10,
        backgroundColor:"#104F9C",
        color:"white"
        
    },
    prevNextTxt:{
        color:"black",
        fontSize:16,
        textAlign:"center",
        paddingBottom:5,
        paddingRight:4
    },
    dateTxt:{
        color:"white",
        textAlign:"center",
        fontSize:17,
        paddingTop:8, 
    }

})




    return(
        <SafeAreaView>
          <ScrollView>
            <View style={styles.topToggle} >
                <TouchableOpacity onPress={()=> setToggleScheduleCompleted(false)} style={styles.scheduleBtn} >
                    <Text style={styles.ScheduleText} >
                        Scheduled-To do
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity  onPress={()=> setToggleScheduleCompleted(true)} style={styles.completedBtn} >
                <Text style={styles.completeText} >
                  Completed Visits
                    </Text>
                    
                    </TouchableOpacity>

            </View>

            <View style={styles.prevNextMain} >
                <TouchableOpacity onPress={()=> setToggleScheduleCompleted(false)} style={styles.prevBtn} >
                <AntDesign name="left" size={20} color="black" />
                    <Text style={styles.prevNextTxt} >
                     Prev
                    </Text>
                   

                </TouchableOpacity>

                <View  onPress={()=> setToggleScheduleCompleted(true)} style={styles.dateView} >
                <Text style={styles.dateTxt} >
                 June 2024
                    </Text>
                    
                    </View>

                <TouchableOpacity  onPress={()=> setToggleScheduleCompleted(true)} style={styles.prevBtn} >
                <Text style={styles.prevNextTxt} >
                  Next 
                    </Text>
                    <AntDesign name="right" size={20} color="black" />
                    
                    </TouchableOpacity>

            </View>
          </ScrollView>
        </SafeAreaView>
    )
}




export default Dashboard;