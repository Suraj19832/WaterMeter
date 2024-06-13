import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SubmitButton({
  text,
  bgColor,
  height,
  width,
  textSize,
  loading,
}) {
  const styles = StyleSheet.create({
    submitButton: {
      // height: height,
      // width: width,
      paddingVertical:10,
      paddingHorizontal:7,
      borderRadius: 10,
      backgroundColor: bgColor,
      justifyContent: "center",
      alignItems: "center",
    },
    submitButtonText: {
      color: "white",
      fontSize: textSize,
      // textAlign:"center",
      // paddingTop:8 ,
      // height:50,
      fontWeight: "500",
    },
  });

  return (
    <View style={styles.submitButton}>
      {loading ? (
        <ActivityIndicator
          size={24}
          color={"#FFFFFF"}
          style={{ alignSelf: "center", width: "100%" }}
        />
      ) : (
        <Text style={styles.submitButtonText}>{text}</Text>
      )}
    </View>
  );
}
