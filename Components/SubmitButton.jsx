import React from 'react'
import { View,Text,StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function SubmitButton({text,bgColor,height,width,textSize}) {

    const styles = StyleSheet.create({
        submitButton:{
            height: height,
            width: width,
            borderRadius: 10,
            backgroundColor: bgColor,
         
          },
          submitButtonText:{
            color:"white",
            fontSize:textSize,
            textAlign:"center",
            paddingTop:8 ,
            fontWeight:'500'

          },

    })



  return (
    <View style={styles.submitButton} >
    <Text style={styles.submitButtonText} >
       {text}
    </Text>

  </View>
  )
}
