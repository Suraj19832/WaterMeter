import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import SubmitButton from "../Components/SubmitButton";
import { useSelector } from "react-redux";

export default function OcrCaptured({ navigation }) {
  const route = useRoute();
  const { meterName, id, name, otp, res, value } = route.params ?? {};
  const { meterDataParams } = useSelector((state) => state.MeterSlice);

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
    heading: {
      marginVertical: 12,
      marginHorizontal: 20,
      backgroundColor: "#F5F5F5",
      // Adding shadow properties
      shadowColor: "#2198C9",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 2,
      elevation: 7, // For Android shadow
      borderRadius: 10,
    },
    headingText: {
      fontFamily: "Roboto",
      fontWeight: "700",
      fontSize: 24,
      lineHeight: 28.13,
      color: "#0B9ED2",
      textAlign: "center",
      marginVertical: 12,
    },
    rightIcon:{
      height: "auto",
      alignItems: "center",
      width: "90%",
      alignSelf: "center",
      gap: 40,
    },
    capturedtext:{
      color: "rgba(152, 152, 152, 1)",
      fontSize: 24,
      lineHeight: 28,
      fontWeight: "500",
    },
    meter:{
      fontWeight: "600",
      fontSize: 24,
      lineHeight: 28,
      color: "rgba(11, 158, 210, 1)",
    },
    metername:{
      fontWeight: "500",
      fontSize: 24,
      lineHeight: 28,
      color: "rgba(152, 152, 152, 1)",
    }
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.headArrow}>
          <TouchableOpacity
            style={{ marginTop: 5 }}
            onPress={() =>
              navigation.navigate("MeterScreen", {
                PopertyId: meterDataParams?.propertyId,
                date: meterDataParams?.date,
              })
            }
          >
            <Image
              source={require("../assets/left-arrow (1).png")}
              style={{ height: 22, width: 12 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ gap: 40 }}>
          <View style={{ paddingHorizontal: 4 }}>
            <View style={styles.heading}>
              <Text style={styles.headingText}>
                {id} | {name}
              </Text>
            </View>
          </View>
          <View
            style={styles.rightIcon}
          >
            <Image
              source={require("../assets/right_icon (1).png")}
              style={{ height: 80, width: 80 }}
            ></Image>
            <Text
              style={styles.capturedtext}
            >
              {otp} {value === "me" ? "ME" : "OCR"} Captured
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={styles.meter}
              >
                Meter :
              </Text>
              <Text
                style={styles.metername}
              >
                {" "}
                {meterName}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MeterScreen", {
                  PopertyId: meterDataParams?.propertyId,
                  date: meterDataParams?.date,
                })
              }
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
            <View
              style={[
                styles.pendingMeters,
                {
                  backgroundColor:
                    res?.pendingMeterCount === 0 ? "#2F8A16" : "#197AB6",
                },
              ]}
            >
              {res?.pendingMeterCount === 0 ? (
                <Text style={styles.pendingMetersTxt}>Completed</Text>
              ) : (
                <Text style={styles.pendingMetersTxt}>
                  {res?.pendingMeterCount} Meters Pending
                </Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
