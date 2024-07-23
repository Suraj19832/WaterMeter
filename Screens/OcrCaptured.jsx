import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, Text, ImageBackground, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import SubmitButton from "../Components/SubmitButton";

export default function OcrCaptured({ navigation }) {

  const route = useRoute();
  const { meterName, id, name, otp, pendingmeterReading } = route.params ?? {};
  console.log(pendingmeterReading)

  const styles = StyleSheet.create({
    headArrow: {
      width: "90%",
      margin: "auto",
      height: 30,
      marginTop: 10,
    },
    propertyName: {
      width: "90%",
      height: 50,
      margin: "auto",
      marginTop: 30,
      borderRadius: 15,
      backgroundColor: "#e7e7e7",
      shadowColor: "#2198C9",
      elevation: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    propertyNameFTxt: {
      fontSize: 23,
      color: "#0B9ED2",
      fontWeight: "500",
      paddingBottom: 5,
      letterSpacing: 0.5,
    },
    propertyNameSTxt: {
      fontSize: 22,
      color: "#0B9ED2",
      height: 30,
      letterSpacing: 0.5,
    },

    pendingMeters: {
      backgroundColor: "#197AB6",
      borderRadius: 30,
      paddingVertical: 4,
      paddingHorizontal: 8,
      alignSelf: "flex-end",
    },
    pendingMetersTxt: {
      color: "white",
      textAlign: "center",
      lineHeight: 16,
      fontSize: 12,
      fontWeight: "500",
      fontSize: 12,
    },
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.headArrow}>
          <TouchableOpacity
            style={{ marginTop: 5 }}
            onPress={() => navigation.navigate("Dashboard")}
          >
            <Image
              source={require("../assets/left-arrow (1).png")}
              style={{ height: 22, width: 12 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ gap: 80 }}>
          <View style={styles.propertyName}>
            <Text style={styles.propertyNameFTxt}>{id} |</Text>
            <Text style={styles.propertyNameSTxt}> {name}</Text>
          </View>
          <View
            style={{
              height: "auto",
              alignItems: "center",
              width: "90%",
              alignSelf: "center",
              gap: 40,
            }}
          >
            <Image
              source={require("../assets/right_icon (1).png")}
              style={{ height: 80, width: 80 }}
            ></Image>
            <Text
              style={{
                color: "rgba(152, 152, 152, 1)",
                fontSize: 24,
                lineHeight: 28,
                fontWeight: 500,
              }}
            >
              {otp} OCR Captured
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 24,
                  lineHeight: 28,
                  color: "rgba(11, 158, 210, 1)",
                }}
              >
                Meter :
              </Text>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 24,
                  lineHeight: 28,
                  color: "rgba(152, 152, 152, 1)",
                }}
              >
                {" "}
                {meterName}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("SummaryScreen",{id,name,pendingmeterReading})}
            >
              <SubmitButton
                text="Submit Another"
                bgColor="rgba(255, 137, 2, 1)"
                height={44}
                width={154}
                textSize={18}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: "auto",
              alignItems: "center",
              width: "90%",
              alignSelf: "center",
            }}
          >
            <View style={styles.pendingMeters}>
              <Text style={styles.pendingMetersTxt}>{pendingmeterReading} Meters Pending</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
