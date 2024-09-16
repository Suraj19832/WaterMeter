import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import SubmitButton from "../Components/SubmitButton";
import { colorCodes } from "../ColorCodes/Colors";
import { useDispatch } from "react-redux";
import { setBooleanValue, setStringValue } from "../redux/slices/UniqueSlice";
import { setMeterPropertyID } from "../redux/slices/MeterSlice";
import axios from "axios";

function DashboardScheduledCards({
  items,
  index,
  onPress,
  expandSchedule,
  navigation,
  date,
}) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageOnLoad, setImageOnLoad] = useState(false);

  const firstCapitalize = (text) => {
    const words = text?.split(" ");
    for (let i = 0; i < words?.length; i++) {
      words[i] = words[i][0]?.toUpperCase() + words[i]?.substring(1);
    }
    return words?.join(" ");
  };

  function convertDateToDDMMYY(dateString) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) {
      return "";
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime()) || date.getFullYear() < 1000) {
      return "";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  }

  function convertToDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    let duration = "";
    if (hours > 0) {
      duration += `${hours} hr `;
    }
    if (minutes > 0) {
      duration += `${minutes} mins`;
    }
    if (remainingSeconds > 0) {
      duration += `${remainingSeconds} sec`;
    }
    return duration?.trim();
  }

  function checkForImage(urll) {
    let regex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gim;
    if (urll.match(regex)) {
      return "valid";
    } else {
      return "invalid";
    }
  }

  useEffect(() => {
    const checkImageURL = async (url) => {
      setImageLoading(true);
      if (checkForImage(url) === "valid") {
        try {
          await axios.head(url);
          setImage(url);
          setImageLoading(false);
        } catch (error) {
          setImage(null);
          setImageLoading(false);
        }
      } else {
        setImage(null);
        setImageLoading(false);
      }
    };

    checkImageURL(items?.image_path);
  }, [items?.image_path, modalVisible]);

  return (
    <View style={styles.propertyCards}>
      <View style={styles.cardContentTop}>
        <View style={styles.topFirst}>
          <Text style={styles.propertyTxt}>Property : </Text>

          <Text style={styles.besidePropertyTxt}>
            {items?.id} {" | "} {items?.name}
          </Text>
        </View>

        <View style={{ width: "18%" }}>
          <Text style={styles.contentDateTxt}>
            {convertDateToDDMMYY(items?.reading_date?.on)}
          </Text>
        </View>
      </View>
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
          {items?.status?.days < 1 ? (
            ""
          ) : (
            <Text style={[styles.daysTxt, { color: items?.status?.colorCode }]}>
              {items?.status?.days} Days
            </Text>
          )}

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={require("../assets/viewImage.png")}
              resizeMode="cover"
              style={[styles.image, { height: 23, width: 21 }]}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.belowSecond}>
          <Text style={{ fontWeight: "500" }}>
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
      {index == expandSchedule ? (
        <View style={styles.expandContent}>
          <View style={[styles.expandContentHeading, { marginBottom: 7 }]}>
            <Text style={styles.expandHeadingFTxt}>Address :</Text>
            <Text style={styles.address}>{items?.address}</Text>
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
              {convertDateToDDMMYY(items?.reading_date?.next)}
            </Text>
          </View>

          <View style={styles.expandContentHeading}>
            <Text style={styles.expandContentFTxt}>Last Reading Date :</Text>

            <Text style={styles.expandContentSTxt}>
              {convertDateToDDMMYY(items?.last_reading_date)}
            </Text>
          </View>
          <View style={styles.expandContentHeading}>
            <Text style={styles.expandContentFTxt}>Readings Approval :</Text>

            <Text
              style={[
                styles.expandContentSTxt,
                {
                  color:
                    items?.reading_approval === "Processed"
                      ? "#2F8A16"
                      : items?.reading_approval === "N/A"
                      ? "grey"
                      : colorCodes.submitButtonEnabled,
                  fontWeight: "500",
                },
              ]}
            >
              {items?.reading_approval}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={[styles.expandContentBottomPart, {}]}>
              <Text style={styles.expandContentFTxt}>Estimate Time :</Text>

              <Text style={styles.expandContentSTxt}>
                {items?.estimate_time_in_sec
                  ? convertToDuration(items?.estimate_time_in_sec)
                  : "Not Available"}
              </Text>
            </View>
            {items?.reading_process !== "contact_admin" && (
              <View>
                <TouchableOpacity
                  style={{ marginBottom: 6 }}
                  onPress={() => {
                    dispatch(setBooleanValue(true));
                    dispatch(setStringValue("MeterSelection"));
                    const meterData = { propertyId: items?.id, date: date };
                    dispatch(setMeterPropertyID(meterData));
                    navigation.jumpTo("MeterScreen", {
                      PopertyId: items?.id,
                      date,
                      meter_reading_cycle_id: items?.meter_reading_cycle_id,
                    });
                  }}
                >
                  <SubmitButton
                    textSize={14}
                    bgColor={colorCodes.submitButtonEnabled}
                    text="Start Reading"
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          {items?.reading_process === "contact_admin" && (
            <View
              style={{
                flexDirection: "row",
                gap: 12,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/exclamation-mark.png")}
                style={styles.exclamation}
              />
              <Text style={{ color: "red" }}>
                Contact Admit to Close Readings
              </Text>
            </View>
          )}
        </View>
      ) : null}

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {image != null ? (
              <>
                {(imageLoading || imageOnLoad) && (
                  <ActivityIndicator size={"large"} color={"white"} />
                )}

                <Image
                  source={{
                    uri: image,
                  }}
                  style={styles.modalImage}
                  onLoadStart={() => {
                    setImageOnLoad(true);
                  }}
                  onError={() => {
                    setImageLoading(false), setImage(null);
                  }}
                  onLoad={() => setImageLoading(false)}
                  onLoadEnd={() => {
                    setImageOnLoad(false);
                  }}
                />
              </>
            ) : (
              <Image
                source={require("../assets/icons/no-image.jpg")}
                style={styles.modalImage}
              />
            )}
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
  exclamation: {
    height: 20,
    width: 20,
  },
  closeButton: {
    position: "absolute",
    right: 20,
    top: -15,
  },
  propertyCards: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colorCodes.borderColor,
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
    fontSize: 11,
    fontWeight: "500",
    color: colorCodes.secondaryLightGray,
    marginBottom: 5,
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
    backgroundColor: colorCodes.statusPast,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  statusTxt: {
    color: colorCodes.white,
    textAlign: "center",
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 16,
    minWidth: 60,
  },
  daysTxt: {
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
    borderColor: colorCodes.expandBorder,
    shadowColor: "black",
  },
  image: {
    width: 21,
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
    color: colorCodes.yaleBlue,
    fontWeight: "500",
    fontSize: 14,
  },
  expandHeadingSTxt: {
    fontWeight: "500",
    fontSize: 16,
    paddingLeft: 10,
  },
  expandContentFTxt: {
    color: "#0099ff",
    fontWeight: "400",
    fontSize: 12,
    height: 30,
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
  },
  completedNextDate: {
    color: "#0099ff",
    fontWeight: "400",
    fontSize: 14,
  },
  address: {
    fontWeight: "600",
    fontSize: 14,
    width: "80%",
    color: "rgba(89, 89, 89, 1)",
    paddingLeft: 10,
  },
  belowContentCompleted: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 90,
  },
  expandContentCompletedButton: {
    height: 37,
    width: 150,
    marginLeft: 155,
  },
  expandContentCompleted: {
    height: 255,
    margin: "auto",
  },
  expandContentBottomPart: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
  },
});
