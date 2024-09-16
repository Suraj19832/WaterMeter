import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ActivityIndicator,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import appApi from "../Helper/Api";
import { useSelector } from "react-redux";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SummaryScreen({ navigation }) {
  const route = useRoute();
  const { id, name, meter_reading_cycle_id, reading_approval } =
    route.params ?? {};
  
  const {meterCycleId} = useSelector((state)=>state.readingCycleId)
    console.log(meterCycleId, "Meter Reading Cycle ID");
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [dropdownData, setDropdownData] = useState([]);
  const [hideIcon, setHideIcon] = useState(false);
  const [showImage, setShowImage] = useState(null);
  const [completeModal, setCompleteModal] = useState(false);
  const [resfreshing, setResfreshing] = useState(false);
  const [totalDigit, setTotalDigit] = useState(null);
  const [meterMake, setMeterMake] = useState("");
  const [avgUsage, setAvgUsage] = useState(null);
  const [completedNote, setCompletedNote] = useState("");
  const [cycleID, setCycleId] = useState(null);
  const [overridevalue, setOverrideValue] = useState("");
  const [completedUnit, setCompletedUnit] = useState({
    reading: "",
    readingType: "",
    readingDate: "",
  });

  

  function getLastFiveDigits(number) {
    // Convert the number to a string only if it's a valid number
    let numberStr =
      number !== undefined && number !== null ? number.toString() : "";

    // Split the string into integer and decimal parts if it's not empty
    if (numberStr) {
      let [integerPart, decimalPart] = numberStr.split(".");

      // If no decimal part, return the integer part
      if (!decimalPart) {
        return integerPart;
      }

      // Slice the first 5 digits of the decimal part and return the formatted string
      let truncatedDecimal = decimalPart.slice(0, 5);
      return `${integerPart}.${truncatedDecimal}`;
    }

    // Handle invalid or empty input cases
    return "";
  }

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

  const meterDetails = async (meterId) => {
    setLoading(true);
    setImageLoading(true);
      const data = {
        meter_id: meterId,
        meter_reading_cycle_id: meterCycleId,
      };
      console.log(data, "comppeteimahe");
      appApi
        .completedImage(data)
        .then((res) => {
          console.log(res, " completed image api response ========>");
          setCompletedUnit({
            reading: res?.data?.reading,
            readingType: res?.data?.readingType,
            readingDate: res?.data?.readingDate,
          });
          setShowImage(res?.data?.image);
          setTotalDigit(res?.data?.total_number_of_digit);
          setMeterMake(res?.data?.unit_id);
          setAvgUsage(res?.data?.avg_usage);
          setCompletedNote(res?.data?.note);
          setCycleId(res?.data?.meter_reading_cycle_id);
          setOverrideValue(res?.data?.meter_last_digit_override);
          setLoading(false);
          setImageLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setImageLoading(false);
        });
  };

  const handleDropdownValue = (items) => {
    console.log(items, ">>");
    setDropdownValue(items?.id);
    setToggleDropdown(false);
    meterDetails(items.id);
    setHideIcon(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      setResfreshing(true);
      const data = {
        meter_reading_cycle_id: meterCycleId,
      };
      console.log(data, "summary");
      appApi
        .summaryCompletion(data)
        .then((res) => {
          console.log(res, "summarycompletion api response=======>");
          setData(res?.data);
          setResfreshing(false);
          setDropdownData(res?.data?.completedMeters);
        })
        .catch((err) => {
          setResfreshing(false);
          console.log(err);
        });
      setCompletedUnit({});
      setDropdownValue(null);
      setHideIcon(false);
      setToggleDropdown(false)
    }, [meterCycleId])
  );

  if (resfreshing) {
    return (
      <View style={styles.resfreshing}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <SafeAreaView style={{ height: "100%" }}>
      <View style={styles.headArrow}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Image
            source={require("../assets/left-arrow (1).png")}
            style={{ height: 22, width: 12 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 4, marginHorizontal: 16 }}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>
            {id} | {name}
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.mainView}>
          <Text style={styles.summaryText}>Summary</Text>
          <Text style={styles.meterRead}>
            {data?.totalMeterRead} Meters Read
          </Text>

          <View style={styles.mainBox}>
            <View style={{ width: "100%", gap: 15 }}>
              <View style={styles.ocr}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.ocrpassedValue}>{data?.ocrPassed} :</Text>
                  <Text style={styles.ocrPassed}> OCR Passed</Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.manualEditValue}>
                    {data?.manualEdit} :
                  </Text>
                  <Text style={styles.manualEdit}> Manual Edit</Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {/* <View style={{ flexDirection: "row" }}>
                  <Text style={styles.potentialErrorValue}>06 :</Text>
                  <Text style={styles.potentialError}> Potential Error</Text>
                </View> */}

                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.meterNotesValue}>
                    {data?.manualNotes} :
                  </Text>
                  <Text style={styles.meterNotestext}> Meter Notes</Text>
                </View>
              </View>
            </View>

            {/* <View style={{ gap: 8 }}>
              <Text style={styles.taskCompleted}>
                Task completed in 35 mins
              </Text>
              <View style={styles.datetimeBox}>
                <Text style={styles.date}>28.05.2024</Text>
                <Text style={styles.time}>10:56 AM</Text>
              </View>
            </View> */}
          </View>
        </View>

        <View style={styles.latLongBox}>
          <View style={styles.latBox}>
            <Text style={styles.lat}>Lat : {getLastFiveDigits(data?.lat)}</Text>
          </View>

          <View style={styles.longBox}>
            <Text style={styles.longtext}>
              Long : {getLastFiveDigits(data?.lng)}
            </Text>
          </View>
        </View>

        <View style={styles.dropdownmain}>
          <View style={styles.fields_main}>
            <TouchableOpacity
              style={styles.input_box}
              onPress={() => setToggleDropdown(!toggleDropdown)}
            >
              <Text style={styles.completereading}>
                {dropdownValue ? `${dropdownValue}` : "Completed Readings"}
              </Text>
              <TouchableOpacity>
                <AntDesign
                  name="down"
                  size={16}
                  color="rgba(152, 152, 152, 1)"
                />
              </TouchableOpacity>
            </TouchableOpacity>
            {toggleDropdown && (
              <View style={{ zIndex: 100 }}>
                <ScrollView
                  contentContainerStyle={styles.dropdownBox}
                  scrollEnabled={true}
                  nestedScrollEnabled={true}
                  style={{
                    maxHeight: 150,
                  }}
                >
                  {dropdownData?.map((item, index) => {
                    return (
                      <TouchableOpacity
                        style={styles.dropdownOptBox}
                        key={index}
                        onPress={() => handleDropdownValue(item)}
                      >
                        <Text style={styles.dropdownOpttext}>{item?.id}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            )}
          </View>

          <View style={styles.completedStatus}>
            <Text style={styles.completedText}>Completed</Text>
          </View>

          <View style={{ marginVertical: 10 }}>
            {loading ? (
              <ActivityIndicator size={"small"} />
            ) : (
              <View
                style={{ flexDirection: "row", gap: 15, alignItems: "center" }}
              >
                {hideIcon && (
                  <TouchableOpacity
                    style={styles.imageButton}
                    onPress={() => setCompleteModal(true)}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "700",
                        textAlign: "center",
                      }}
                    >
                      Image
                    </Text>
                  </TouchableOpacity>
                )}
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "500",
                    color: "rgba(33, 152, 201, 1)",
                  }}
                >
                  {completedUnit?.reading} {completedUnit?.readingType}{" "}
                  {convertDateToDDMMYY(completedUnit?.readingDate)}
                </Text>
                {reading_approval !== "Processed" && hideIcon && (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("meterReadingScanner", {
                        id: id,
                        name: name,
                        meterName: meterMake,
                        meterImage: showImage,
                        meterReading: completedUnit?.reading,
                        totalDigit: totalDigit,
                        lastReading: completedUnit?.reading,
                        lastReadingDate: completedUnit?.readingDate,
                        avgUsage: avgUsage,
                        completed_note: completedNote,
                        billingId: cycleID,
                        date: completedUnit?.readingDate,
                        isOverRideValue: overridevalue,
                        completed_dataId: null, //api
                        flag: "testing", //progress
                        navigatePath: "summaryCompleted",
                      })
                    }
                  >
                    <Image
                      source={require("../assets/write.png")}
                      style={{ height: 30, width: 30 }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>
        <Modal
          transparent={true}
          visible={completeModal}
          onRequestClose={() => setCompleteModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContentt}>
              <TouchableWithoutFeedback
                style={styles.closeButtonn}
                onPress={() => {
                  setCompleteModal(false);
                }}
              >
                <Image
                  source={require("../assets/icons/close.png")}
                  style={styles.closeImage}
                />
              </TouchableWithoutFeedback>
              <View style={styles.imageBox}>
                {imageLoading ? (
                  <ActivityIndicator size="medium" style={styles.loading} />
                ) : (
                  showImage && (
                    <Image
                      source={{ uri: showImage }}
                      style={{ height: "100%", width: "100%" }}
                    />
                  )
                )}
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  completedStatus: {
    backgroundColor: "#2F8A16",
    paddingVertical: 6,
    borderRadius: 15,
    paddingHorizontal: 16,
    marginTop: 10,
    alignSelf: "flex-end",
  },
  completedText: { color: "white", fontWeight: "700" },
  resfreshing: {
    flex: 1,
    justifyContent: "center",
  },
  imageButton: {
    backgroundColor: "#197AB6",
    paddingVertical: 6,
    borderRadius: 15,
    paddingHorizontal: 16,
  },
  modalOverlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContentt: {
    height: Dimensions.get("window").height * 0.3,
    width: "100%",
  },
  imageBox: {
    height: 200,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  closeImage: {
    height: 20,
    width: 20,
    alignSelf: "flex-end",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonn: {},
  heading: {
    marginVertical: 20,
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
  headArrow: {
    marginHorizontal: 20,
    marginTop: 5,
  },
  propertyName: {
    borderRadius: 15,
    backgroundColor: "#e7e7e7",
    shadowColor: "#2198C9",
    elevation: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 10,
  },
  propertyNameFTxt: {
    fontSize: 24,
    color: "#0B9ED2",
    fontWeight: "600",
  },
  propertyNameSTxt: {
    fontSize: 24,
    color: "#0B9ED2",
    fontWeight: "500",
  },
  pendingMeters: {
    backgroundColor: "#197AB6",
    borderRadius: 30,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: "flex-end",
    marginTop: 24,
  },
  pendingMetersTxt: {
    color: "white",
    textAlign: "center",
    lineHeight: 16,
    fontSize: 12,
    fontWeight: "500",
    fontSize: 12,
  },
  fields_main: {
    marginTop: 12,
    width: "100%",
  },
  input_box: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#2198C9",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  input: {
    position: "relative",
    color: "black",
    width: "90%",
    height: "100%",
    fontSize: 20,
  },
  dropdownBox: {
    borderColor: "rgba(33, 152, 201, 1)",
    borderWidth: 1,
    borderRadius: 15,
  },
  dropdownOptBox: {
    paddingVertical: 11,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
    borderWidth: 0.5,
    borderColor: "rgba(89, 89, 89, 1)",
  },
  dropdownOpttext: {
    color: "rgba(89, 89, 89, 0.8)",
    fontSize: 18,
    fontWeight: "600",
  },
  pending: {
    height: "auto",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
  },
  mainView: {
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
  },
  summaryText: {
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 28,
    color: "rgba(11, 158, 210, 1)",
    marginTop: 20,
  },
  meterRead: {
    fontWeight: "500",
    fontSize: 24,
    lineHeight: 28,
    color: "rgba(89, 89, 89, 1)",
    marginVertical: 15,
  },
  meterNotestext: {
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 21,
    color: "rgba(152, 152, 152, 1)",
  },
  taskCompleted: {
    alignSelf: "center",
    fontWeightL: "400",
    fontSize: 16,
    color: "rgba(89, 89, 89, 1)",
  },
  datetimeBox: { flexDirection: "row", alignSelf: "center", gap: 16 },
  date: {
    alignSelf: "center",
    fontWeightL: "600",
    fontSize: 16,
    color: "rgba(89, 89, 89, 1)",
  },
  time: {
    alignSelf: "center",
    fontWeightL: "500",
    fontSize: 16,
    color: "rgba(89, 89, 89, 1)",
  },
  latBox: {
    width: 120,
    height: 24,
    backgroundColor: "rgba(33, 152, 201, 1)",
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center",
  },
  lat: {
    alignSelf: "center",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 16,
    color: "rgba(255, 255, 255, 1)",
  },
  longBox: {
    width: 120,
    height: 24,
    backgroundColor: "rgba(33, 152, 201, 1)",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  longtext: {
    alignSelf: "center",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 16,
    color: "rgba(255, 255, 255, 1)",
  },
  completereading: {
    color: "rgba(152, 152, 152, 1)",
    fontSize: 18,
    fontWeight: "600",
  },
  dropdownmain: {
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    marginTop: 24,
  },
  latLongBox: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  meterNotesValue: {
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 21,
    color: "rgba(11, 158, 210, 1)",
  },
  potentialError: {
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 21,
    color: "rgba(152, 152, 152, 1)",
  },
  potentialErrorValue: {
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 21,
    color: "rgba(11, 158, 210, 1)",
  },
  manualEdit: {
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 21,
    color: "rgba(152, 152, 152, 1)",
  },
  manualEditValue: {
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 21,
    color: "rgba(11, 158, 210, 1)",
  },
  ocrPassed: {
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 21,
    color: "rgba(152, 152, 152, 1)",
  },
  ocrpassedValue: {
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 21,
    color: "rgba(11, 158, 210, 1)",
  },
  ocr: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainBox: { gap: 24, width: "100%", marginTop: 15 },
});
