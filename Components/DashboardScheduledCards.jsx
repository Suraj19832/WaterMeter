import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Modal,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import SubmitButton from "../Components/SubmitButton";
import { colorCodes } from "../ColorCodes/Colors";

function DashboardScheduledCards({
  items,
  index,
  onPress,
  expandSchedule,
  navigation,
}) {
  console.log(items, "<<<<<<<<<<schedule");
  const [modalVisible, setModalVisible] = useState(false);
  const firstCapitalize = (text) => {
    const words = text?.split(" ");
    for (let i = 0; i < words?.length; i++) {
      words[i] = words[i][0]?.toUpperCase() + words[i]?.substring(1);
    }
    return words?.join(" ");
  };
  function formatDate(inputDate) {
    if (!inputDate) {
      return ""; // or any default value you prefer
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
    <View style={styles.propertyCards}>
      <View style={styles.cardContentTop}>
        <View style={styles.topFirst}>
          <Text style={styles.propertyTxt}>Property</Text>
          <Text style={styles.besidePropertyTxt}>
            : {items?.id} {" | "} {items?.name}
          </Text>
        </View>

        <View>
          <Text style={styles.contentDateTxt}>
            {formatDate(items?.reading_date?.on)}
          </Text>
        </View>
      </View>

      {items?.status?.name == "past due" ? (
        <View style={styles.belowContentMain}>
          <View style={styles.belowFirst}>
            <View
              style={[
                styles.status,
                { backgroundColor: items?.status?.colorCode },
              ]}
            >
              <Text style={styles.statusTxt}>
                {firstCapitalize(items?.status?.name)}
              </Text>
            </View>
            <Text style={styles.daysTxt}>{items?.status?.days} Days</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <ImageBackground
                source={require("../assets/Background 1.png")}
                resizeMode="cover"
                style={styles.image}
              ></ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={styles.belowSecond}>
            <Text style={{ fontWeight: 500 }}>
              {items?.meter?.total} meters
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (expandSchedule == index) {
                  onPress(null);
                } else {
                  onPress(index);
                }
              }}
              style={styles.expandBtn}
            >
              {index == expandSchedule ? (
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
      ) : (
        <View style={styles.belowContentMainNotPast}>
          <View
            style={[
              styles.status,
              {
                backgroundColor:
                  items?.status?.name == "in process"
                    ? items?.status?.colorCode
                    : "#FFB604",
                width: "25%",
              },
            ]}
          >
            <Text style={styles.statusTxt}>
              {firstCapitalize(items?.status?.name)}
            </Text>
          </View>

          <View style={styles.belowSecond}>
            <Text style={{ fontWeight: 500 }}>
              {items?.meter?.total} meters
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (expandSchedule == index) {
                  onPress(null);
                } else {
                  onPress(index);
                }
              }}
              style={styles.expandBtn}
            >
              {index == expandSchedule ? (
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
      )}

      {index == expandSchedule ? (
        <View style={styles.expandContent}>
          <View style={{ marginBottom: 10, flexDirection: "row" }}>
            <Text style={styles.expandHeadingFTxt}>Address :</Text>
            <Text style={styles.expandHeadingSTxt}>{items?.address}</Text>
          </View>
          <View style={styles.expandContentHeading}>
            <Text style={styles.expandContentFTxt}>Total Meters :</Text>

            <Text style={styles.expandContentSTxt}>{items?.meter?.total}</Text>
          </View>

          <View style={styles.expandContentHeading}>
            <Text style={styles.expandContentFTxt}>Total Meters Pending :</Text>

            <Text style={styles.expandContentSTxt}>
              {items?.meter?.pending}
            </Text>
          </View>

          <View style={styles.expandContentHeading}>
            <Text style={styles.expandContentFTxt}>Next Reading Date :</Text>

            <Text style={styles.expandContentSTxt}>
              {formatDate(items?.reading_date?.next)}
            </Text>
          </View>

          <View style={styles.expandContentHeading}>
            <Text style={styles.expandContentFTxt}>Last Reading Date :</Text>

            <Text style={styles.expandContentSTxt}>
              {formatDate(items?.reading_date?.last)}
            </Text>
          </View>

          <View style={[styles.expandContentBottomPart, {}]}>
            <Text style={styles.expandContentFTxt}>Estimate Time :</Text>

            <Text style={styles.expandContentSTxt}>
              {convertToDuration(items?.estimate_time_in_sec)}
            </Text>
            <TouchableOpacity
              style={{ marginLeft: 20, marginBottom: 6 }}
              onPress={() =>
                navigation.navigate("MeterScreen", { PopertyId: items?.id })
              }
            >
              <SubmitButton
                textSize={14}
                bgColor={colorCodes.submitButtonEnabled}
                text="Start Reading"
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image
              source={
                items?.image !== null
                  ? { uri: items?.image }
                  : require("../assets/icons/no-image.jpg")
              }
              style={styles.modalImage}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Image
                source={require("../assets/icons/close.png")}
                style={{ height: 20, width: 20 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
export default DashboardScheduledCards;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: Dimensions.get("window").width * 1,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: Dimensions.get("window").height * 0.3,
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    right: 20,
    top: -15,
  },
  propertyCards: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#2198C9",
    marginBottom: 20,
    paddingHorizontal: 13,
  },

  cardContentTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  topFirst: {
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
    fontSize: 11,
    height: 25,
    fontWeight: "500",
    color: "#989898",
  },
  belowContentMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  belowFirst: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  status: {
    backgroundColor: "#C53636",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusTxt: {
    color: "white",
    textAlign: "center",
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 16,
  },
  daysTxt: {
    color: "#C53636",
    height: 20,
    fontWeight: "500",
  },
  belowContentMainNotPast: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  belowSecond: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
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
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: colorCodes.bgLightGrey,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  expandContentHeading: {
    flexDirection: "row",
    alignItems: "center",
  },
  expandHeadingFTxt: {
    color: "#104F9C",
    fontWeight: "500",
    fontSize: 16,
    //   paddingLeft: 10,
    //   paddingTop: 15,/
    //   height: 45,
  },
  expandHeadingSTxt: {
    fontWeight: "500",
    fontSize: 16,
    paddingLeft: 10,
    //   paddingTop: 15,
    //   height: 45,
  },
  expandContentFTxt: {
    color: "#0099ff",
    fontWeight: "400",
    fontSize: 12,
    height: 30,
    //   paddingLeft: 10,
  },
  expandContentSTxt: {
    color: "grey",
    fontWeight: "400",
    fontSize: 12,
    height: 30,
    paddingLeft: 8,
  },
  expandContentButton: {
    height: 37,
    width: 110,
    borderRadius: 10,
    //   backgroundColor: "#FF8902",
    //   marginLeft: 20,
  },
  completedNextDate: {
    color: "#0099ff",
    fontWeight: "400",
    fontSize: 14,
    //   height: 20,
  },
  belowContentCompleted: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 90,
    //   marginTop: 8,
    //   marginBottom: 15,
  },
  expandContentCompletedButton: {
    height: 37,
    width: 150,
    //   borderRadius: 10,/
    //   backgroundColor: "#FF8902",
    marginLeft: 155,
  },
  expandContentCompleted: {
    height: 255,
    //   width: "90%",
    margin: "auto",
    //   marginBottom: 20,
    //   borderRadius: 15,
    //   backgroundColor: "#e7e7e7",
  },
  expandContentBottomPart: {
    //   display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
  },
});
