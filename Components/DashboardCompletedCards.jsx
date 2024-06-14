import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import SubmitButton from "../Components/SubmitButton";
import { colorCodes } from "../ColorCodes/Colors";

export default function DashboardCompletedCards({
  items,
  index,
  onPress,
  expandCompleted,
}) {
  console.log(items, "<<<<<<<<<<<<<<<<<<<<<<<<complete");
  const styles = StyleSheet.create({
    topToggle: {
      height: 50,
      width: "90%",
      margin: "auto",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 20,
    },

    prevNextMain: {
      height: 50,
      width: "90%",
      margin: "auto",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    },
    prevBtn: {
      borderWidth: 1.5,
      height: 45,
      width: "24%",
      borderRadius: 10,
      borderColor: "#FF6900",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 5,
    },
    dateView: {
      height: 45,
      width: "46%",
      borderRadius: 10,
      backgroundColor: "#104F9C",
      color: "white",
    },
    prevNextTxt: {
      color: "#104F9C",
      fontSize: 16,
      textAlign: "center",
      paddingBottom: 5,
      paddingRight: 4,
      fontWeight: "500",
    },
    dateTxt: {
      color: "white",
      textAlign: "center",
      fontSize: 17,
      paddingTop: 8,
      height: 40,
    },
    propertyCards: {
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "#2198C9",
      marginBottom: 20,
    },
    cardsMain: {
      width: "90%",
      margin: "auto",
    },
    cardContentTop: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "92%",
      margin: "auto",
      alignItems: "center",
      marginTop: 15,
    },
    topFirst: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    propertyTxt: {
      fontSize: 15,
      height: 30,
      color: "#104F9C",
      fontWeight: "500",
    },
    scrollView: {
      marginTop: 35,
    },
    besidePropertyTxt: {
      fontSize: 15,
      height: 30,
      fontWeight: "500",
      color: "#595959",
    },
    contentDateTxt: {
      fontSize: 12,
      height: 25,
      fontWeight: "500",
      color: "#989898",
    },
    belowContentMain: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 45,
      marginTop: 10,
      marginBottom: 15,
    },
    belowFirst: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
    },
    status: {
      height: 30,
      width: 80,
      borderRadius: 100,
      backgroundColor: "#C53636",
    },
    statusTxt: {
      color: "white",
      textAlign: "center",
      paddingTop: 4,
      height: 30,
    },
    daysTxt: {
      color: "#C53636",
      height: 20,
      fontWeight: "500",
    },
    belowContentMainNotPast: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 130,
      marginTop: 8,
      marginBottom: 15,
    },
    belowSecond: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 15,
    },
    expandBtn: {
      borderWidth: 0.5,
      height: 25,
      width: 25,
      borderRadius: 100,
      borderColor: "#FE8700",
      shadowColor: "black",
    },
    image: {
      width: 23,
      height: 23,
    },
    expandContent: {
      height: 225,
      width: "95%",

      margin: "auto",
      marginBottom: 20,
      borderRadius: 15,
      backgroundColor: "#F2F2F2",
    },
    expandContentHeading: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    expandHeadingFTxt: {
      color: "#104F9C",
      fontWeight: "500",
      fontSize: 16,
      paddingLeft: 10,
      paddingTop: 15,
      height: 45,
    },
    expandHeadingSTxt: {
      fontWeight: "500",
      fontSize: 16,
      paddingLeft: 10,
      paddingTop: 15,
      height: 45,
    },
    expandContentFTxt: {
      color: "#0099ff",
      fontWeight: "400",
      fontSize: 14,
      height: 30,
      paddingLeft: 10,
    },
    expandContentSTxt: {
      color: "grey",
      fontWeight: "400",
      fontSize: 14,
      height: 30,
      paddingLeft: 10,
    },
    expandContentButton: {
      height: 37,
      width: 110,
      borderRadius: 10,
      backgroundColor: "#FF8902",
      marginLeft: 20,
    },
    completedNextDate: {
      color: "#0099ff",
      fontWeight: "400",
      fontSize: 14,
      height: 20,
    },
    belowContentCompleted: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "92%",
      margin: "auto",
      marginTop: 8,
      marginBottom: 15,
    },

    expandContentCompleted: {
      height: 255,
      width: "92%",
      margin: "auto",
      marginBottom: 20,
      borderRadius: 15,
      backgroundColor: colorCodes.bgLightGrey,
    },
  });

  return (
    <>
      <View key={index} style={styles.propertyCards}>
        <View style={styles.cardContentTop}>
          <View style={styles.topFirst}>
            <Text style={styles.propertyTxt}>Property</Text>
            <Text style={styles.besidePropertyTxt}>
              : {items?.id} {"  |  "} {items?.name}
            </Text>
          </View>

          <View>
            <Text style={styles.contentDateTxt}>{items?.date?.completed}</Text>
          </View>
        </View>

        <View style={styles.belowContentCompleted}>
          {index == expandCompleted ? (
            <View style={{ width: "37.5%" }}>
              <Text style={styles.completedNextDate}></Text>
              <Text
                style={[styles.completedNextDate, { color: "#989898" }]}
              ></Text>
            </View>
          ) : (
            <View>
              <Text style={styles.completedNextDate}>Next Reading Date :</Text>
              <Text style={[styles.completedNextDate, { color: "#989898" }]}>
                {items?.date?.next_reading}
              </Text>
            </View>
          )}

          <View style={styles.belowSecond}>
            <Text style={{ fontWeight: 500 }}>{items?.total_meter} meters</Text>
            <TouchableOpacity
              onPress={() => {
                if (expandCompleted == index) {
                  onPress(null);
                } else {
                  onPress(index);
                }
              }}
              style={styles.expandBtn}
            >
              {index == expandCompleted ? (
                <FontAwesome
                  style={{ marginLeft: 5.6, marginTop: 0 }}
                  name="angle-up"
                  size={20}
                  color="#FE8700"
                />
              ) : (
                <FontAwesome
                  style={{ marginLeft: 5.6, marginTop: 2 }}
                  name="angle-down"
                  size={20}
                  color="#FE8700"
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {index == expandCompleted ? (
          <View style={styles.expandContentCompleted}>
            <View style={styles.expandContentHeading}>
              <Text style={styles.expandHeadingFTxt}>Address :</Text>
              <Text style={styles.expandHeadingSTxt}>{items?.address}</Text>
            </View>
            <View style={styles.expandContentHeading}>
              <Text style={styles.expandContentFTxt}>Total Meters :</Text>

              <Text style={styles.expandContentSTxt}>{items?.total_meter}</Text>
            </View>

            <View style={styles.expandContentHeading}>
              <Text style={styles.expandContentFTxt}>Date Completed :</Text>

              <Text style={styles.expandContentSTxt}>
                {items?.date?.completed}
              </Text>
            </View>

            <View style={styles.expandContentHeading}>
              <Text style={styles.expandContentFTxt}>Task Completed In :</Text>

              <Text style={styles.expandContentSTxt}>
                {items?.task_completed_in_sec}
              </Text>
            </View>

            <View style={styles.expandContentHeading}>
              <Text style={styles.expandContentFTxt}>Next Reading Date :</Text>

              <Text style={styles.expandContentSTxt}>
                {items?.date?.next_reading}
              </Text>
            </View>
            <View style={styles.expandContentHeading}>
              <Text style={styles.expandContentFTxt}>Name :</Text>

              <Text style={styles.expandContentSTxt}>{items?.read_by}</Text>
            </View>

            <View
              style={[
                styles.expandContentHeading,
                { marginTop: 10, justifyContent: "flex-end" },
              ]}
            >
              <TouchableOpacity
                style={{ paddingRight: 10 }}
                onPress={() => {
                  alert("Reading...");
                }}
              >
                <SubmitButton
                  textSize={13}
                  bgColor={colorCodes.submitButtonEnabled}
                  height={37}
                  width={150}
                  text="Completion Summary"
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    </>
  );
}
