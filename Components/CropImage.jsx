import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const CropImage = () => {
  return (
    <View style={styles.container}  >
        <TouchableOpacity>
        <Text>CropImage</Text>
        </TouchableOpacity>
   
    </View>
  )
}

export default CropImage
const styles =StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    btnStyle:{
backgroundColor:"blue",
height:48,
alignItems:'center',
justifyContent:'center'
    }
})