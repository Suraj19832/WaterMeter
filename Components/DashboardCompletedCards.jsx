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
  navigation,
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
      borderColor: colorCodes.buttonBorder,
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
      backgroundColor: colorCodes.yaleBlue,
      color: colorCodes.white,
    },
    prevNextTxt: {
      color: colorCodes.yaleBlue,
      fontSize: 16,
      textAlign: "center",
      paddingBottom: 5,
      paddingRight: 4,
      fontWeight: "500",
    },
    dateTxt: {
      color: colorCodes.white,
      textAlign: "center",
      fontSize: 17,
      paddingTop: 8,
      height: 40,
    },
    propertyCards: {
      borderWidth: 1,
      borderRadius: 10,
      borderColor: colorCodes.borderColor,
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
      color: colorCodes.yaleBlue,
      fontWeight: "500",
    },
    scrollView: {
      marginTop: 35,
    },
    besidePropertyTxt: {
      fontSize: 15,
      height: 30,
      fontWeight: "500",
      color: colorCodes.lightGray,
    },
    contentDateTxt: {
      fontSize: 10,
      height: 25,
      fontWeight: "500",
      color: colorCodes.secondaryLightGray,
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
      backgroundColor: colorCodes.statusPast,
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
      fontSize: 12,
      height: 26,
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
      fontSize: 12,
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

  function formatDate(inputDate) {
    if (!inputDate) {
      return "";
    }

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const dateParts = inputDate.split("-");
    const year = dateParts[0];
    const month = months[parseInt(dateParts[1], 10) - 1];
    const day = parseInt(dateParts[2], 10); // Convert day to integer

    const date = new Date(inputDate);
    const dayOfWeek = days[date.getDay()];

    const suffixes = ["th", "st", "nd", "rd"];
    const daySuffix =
      day % 10 === 1 && day !== 11
        ? suffixes[1]
        : day % 10 === 2 && day !== 12
        ? suffixes[2]
        : day % 10 === 3 && day !== 13
        ? suffixes[3]
        : suffixes[0];

    return `${dayOfWeek} ${month} ${day}${daySuffix}, ${year}`;
  }

  function convertToDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);

    let duration = "";
    if (hours > 0) {
      duration += `${hours}hr `;
    }
    if (minutes > 0) {
      duration += `${minutes}mins`;
    }

    return duration?.trim();
  }

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
            <Text style={styles.contentDateTxt}>
              {formatDate(items?.date?.completed)}
            </Text>
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
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.completedNextDate}>Next Reading Date : </Text>
              <Text style={[styles.completedNextDate, { color: "#989898" }]}>
                {items?.date?.next_reading
                  ? formatDate(items?.date?.next_reading)
                  : "N/A"}
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
                {formatDate(items?.date?.completed)}
              </Text>
            </View>

            <View style={styles.expandContentHeading}>
              <Text style={styles.expandContentFTxt}>Task Completed In :</Text>

              <Text style={styles.expandContentSTxt}>
                {convertToDuration(items?.task_completed_in_sec)}
              </Text>
            </View>

            <View style={styles.expandContentHeading}>
              <Text style={styles.expandContentFTxt}>Next Reading Date :</Text>

              <Text style={styles.expandContentSTxt}>
                {items?.date?.next_reading
                  ? formatDate(items?.date?.next_reading)
                  : "N/A"}
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
                onPress={() => navigation.navigate("SummaryScreen")}
              >
                <SubmitButton
                  textSize={13}
                  bgColor={colorCodes.submitButtonEnabled}
                  height={37}
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
