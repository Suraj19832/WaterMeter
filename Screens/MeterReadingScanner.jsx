import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { colorCodes } from "../ColorCodes/Colors";
import appApi from "../Helper/Api";
import { getFileData } from "../Helper/Helper";
import { useToast } from "react-native-toast-notifications";
import * as ImageManipulator from "expo-image-manipulator";
import LoaderComponent from "../Components/LoaderComponent";

function MeterReadingScanner({ navigation }) {
  const route = useRoute();
  const {
    id,
    name,
    lastReading,
    lastReadingDate,
    avgUsage,
    totalDigit,
    meterName,
    meterImage,
    meterReading,
    completed_dataId,
    completed_note,
  } = route.params ?? {};
  const [scannedMeter, setScannedMeter] = useState(null);
  const [meterValue, setMeterValue] = useState(null);
  const [modalInfo, setModalInfo] = useState(false);
  const [otp, setOTP] = useState(
    meterReading?.split("") || Array(totalDigit)?.fill("")
  );
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [dataId, setDataId] = useState(null);
  const [notes, setNotes] = useState(completed_note || "");
  const [notesModalVisible, setNotesModalVisible] = useState(false);
  const [noteLoading, setnoteLoading] = useState(false);
  const [isRescanClicked, setIsRescanClicked] = useState(false);
  const toast = useToast();
  const [readingMismatchModalVisible, setReadingMismatchModalVisible] =
    useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(true);
  const [manualReading, setManualReading] = useState("");
  const [selectedReading, setSelectedReading] = useState(null);
  const [meReasons, setMeReasons] = useState([]);
  const [manualLoading, setManulLoading] = useState(false);

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

    const dateParts = inputDate?.split("-");
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
  const otpFields = useRef(
    Array(totalDigit)
      ?.fill()
      ?.map(() => React.createRef())
  );
  const handleOTPChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
    // realOtp = newOTP
    if (value !== "" && index < totalDigit - 1) {
      otpFields?.current[index + 1]?.current?.focus();
    } else if (value === "" && index > 0) {
      otpFields?.current[index - 1]?.current?.focus();
    }
  };
  const isOTPComplete = () => {
    return otp?.every((digit) => digit !== "");
  };
  const meternotesubmit = (note) => {
    setnoteLoading(true);
    const data = {
      propertyId: id,
      meter_id: meterName,
      note: note,
    };
    appApi
      .meternote(data)
      .then((res) => {
        if (res?.status) {
          toast.show(res?.message, { type: "success" });
          setnoteLoading(false);
        } else {
          toast.show("Failed to submit note", { type: "error" });
          setnoteLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const verifyNumber = async (imageFile) => {
    try {
      const data = {
        file: imageFile,
        property_id: id,
        meter_id: meterName,
      };
      const res = await appApi.meterScanner(data);
      setMeterValue(res?.ocrReading);
      setDataId(res?.dataId);
      setMeReasons(res?.meReasons);
      toast.show(res?.ocrReading, { type: "sucess", duration: 2000 });
      if (res?.ocrReading) {
        const newOTP = Array(totalDigit)
          ?.fill("")
          ?.map((_, index) => res?.ocrReading[index] || "");
        setOTP(newOTP);
      } else {
        toast.show("Unable to read !!", { type: "success", duration: 3000 });
      }
    } catch (err) {
      console.error(err, "Error while uploading image");
    } finally {
      setLoading(false);
    }
  };
  const handleScan = async () => {
    try {
      const permissionCamera =
        await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionCamera.granted) {
        toast.show("Camera permission denied!", { type: "error" });
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setLoading(true);
        setScannedMeter(result.assets[0].uri);
        setIsRescanClicked(scannedMeter !== null);

        // Resize image
        const resizedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 800 } }],
          { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG }
        );

        const fileData = getFileData(resizedImage);
        await verifyNumber(fileData);
      } else {
        toast.show("Scan Cancelled", { type: "success" });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error while scanning:", error);
      toast.show("Failed to launch the camera", { type: "warning" });
    }
  };
  const handleSubmit = () => {
    if (meterValue !== otp?.join("") || meterValue === null) {
      setReadingMismatchModalVisible(true);
      return;
    }
    setSubmitLoading(true);
    const data = {
      property_id: id,
      meter_id: meterName,
      data_id: completed_dataId ? completed_dataId : dataId,
      rescan: scannedMeter !== null ? "1" : "0", // Pass 1 if scannedMeter is not null, otherwise pass 0,
      ocr_reading: otp?.join(""),
      is_manual: meterValue !== otp?.join("") ? "1" : "0",
      note: completed_note ? completed_note : notes,
    };
    console.log(data, "::::::::::not_manual");
    appApi
      .submitReading(data)
      .then((res) => {
        if (res?.status) {
          setSubmitLoading(false);
          toast.show("Sucessfully Submitted", {
            type: "sucess",
            duration: 3000,
          });
          navigation.navigate("OcrCaptured", {
            meterName,
            id,
            name,
            otp: otp?.join(""),
            res,
            value: "ocr",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setSubmitLoading(false);
      });
  };
  const handleManualReadingSubmit = () => {
    setManulLoading(true);
    const data = {
      property_id: id,
      meter_id: meterName,
      data_id: completed_dataId ? completed_dataId : dataId,
      rescan: scannedMeter !== null ? "1" : "0", // Pass 1 if scannedMeter is not null, otherwise pass 0,
      ocr_reading: otp?.join(""),
      is_manual: meterValue !== otp?.join("") ? "1" : "0",
      note: completed_note ? completed_note : notes,
      me_reason: selectedReading,
    };
    console.log(data, ":::::::datamanualreading");
    appApi
      .submitReading(data)
      .then((res) => {
        if (res?.status) {
          setManulLoading(false);
          setReadingMismatchModalVisible(false);
          toast.show("Sucessfully Submitted", {
            type: "sucess",
            duration: 3000,
          });
          navigation.navigate("OcrCaptured", {
            meterName,
            id,
            name,
            otp: otp?.join(""),
            res,
            value: "me",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setManulLoading(false);
        setReadingMismatchModalVisible(false);
      });
  };
  const handleSelectionOptionMeter = (meterId) => {
    setSelectedReading(meterId);
    setIsDropdownVisible(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      // Reset the states when the screen comes into focus
      setScannedMeter(null);
      setMeterValue(null);
      setModalInfo(false);
      setOTP(Array(totalDigit).fill(""));
      setLoading(false);
      setSubmitLoading(false);
      setDataId(null);
      setSelectedReading(null);
      setMeReasons([]);
      setSelectedReading(null);
      setNotes(completed_note || "");
      setOTP(meterReading?.split("") || Array(totalDigit)?.fill(""));
    }, [totalDigit, completed_note])
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableOpacity
        style={{ marginTop: 5 }}
        onPress={() => navigation.navigate("MeterScreen")}
      >
        <Image
          source={require("../assets/left-arrow (1).png")}
          style={{ height: 22, width: 12 }}
        />
      </TouchableOpacity>
      {/* heading title */}
      <View style={{ paddingHorizontal: 4 }}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>
            {id} | {name}
          </Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{ marginBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        {/* scanner meter image display */}
        <View style={styles.scannerView}>
          {loading ? (
            <ActivityIndicator size={"large"} />
          ) : scannedMeter && scannedMeter ? (
            <Image
              source={{ uri: scannedMeter }}
              style={styles.scannedImage}
              resizeMode="cover"
            />
          ) : (
            meterImage && (
              <Image
                source={{ uri: meterImage }}
                style={styles.scannedImage}
                resizeMode="cover"
              />
            )
          )}
        </View>
        {/* scan button */}
        <View style={styles.scanheading}>
          <Text style={styles.scannerHeading}>
            <Text style={{ color: "#0B9ED2" }}>Meter :</Text> {meterName}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: loading
                ? colorCodes.submitButtonDisabled
                : colorCodes.submitButtonEnabled,
              paddingVertical: 10,
              paddingHorizontal: 25,
              borderRadius: 8,
            }}
            onPress={handleScan}
            disabled={loading}
          >
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}>
              {loading
                ? "Scanning...."
                : scannedMeter || meterImage
                ? "Rescan"
                : "Scan"}
            </Text>
          </TouchableOpacity>
        </View>
        {/* otp filling screen */}
        <View
          style={{
            borderWidth: 1,
            borderColor: colorCodes.borderColor,
            borderRadius: 15,
            paddingVertical: 16,
            paddingHorizontal: 15,
          }}
        >
          <Text style={styles.title}>Meter Reading :</Text>
          <View style={styles.otp}>
            {otp?.map((totalDigit, index) => {
              return (
                <TextInput
                  key={index}
                  style={styles.otpBox}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={(value) => handleOTPChange(index, value)}
                  // defaultValue={totalDigit}
                  value={totalDigit}
                  ref={otpFields?.current[index]}
                />
              );
            })}
          </View>
        </View>
        {/* info ,submit button, manual typing button */}
        <View style={styles.infoText}>
          <TouchableOpacity onPress={() => setModalInfo(true)}>
            <Image
              source={require("../assets/infoIcon.png")}
              style={{ height: 30, width: 30 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: isOTPComplete()
                ? colorCodes.submitButtonEnabled
                : colorCodes.submitButtonDisabled,
              paddingHorizontal: 15,
              paddingVertical: 12,
              borderRadius: 8,
              minWidth: 160,
            }}
            disabled={!isOTPComplete()}
          >
            {submitLoading ? (
              <ActivityIndicator size={"small"} />
            ) : (
              <Text
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                Submit Reading
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setNotesModalVisible(true)}>
            <Image
              source={require("../assets/write.png")}
              style={{ height: 30, width: 30 }}
            />
          </TouchableOpacity>
        </View>
        {/* info modal  */}
        <View style={{ position: "relative" }}>
          <Modal
            transparent={true}
            visible={modalInfo}
            onRequestClose={() => setModalInfo(false)}
            F
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={{ color: "#989898" }}>
                  <Text style={{ color: "#0B9ED2", fontWeight: 600 }}>
                    Last Reading :
                  </Text>{" "}
                  {lastReading ? lastReading : "N/A"}
                </Text>
                <Text style={{ color: "#989898" }}>
                  <Text style={{ color: "#0B9ED2", fontWeight: 600 }}>
                    Last Reading Date :
                  </Text>{" "}
                  {lastReadingDate ? formatDate(lastReadingDate) : "N/A"}
                </Text>
                <Text style={{ color: "#989898" }}>
                  <Text style={{ color: "#0B9ED2", fontWeight: 600 }}>
                    Avg Usage :
                  </Text>{" "}
                  {avgUsage ? avgUsage : "N/A"}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setModalInfo(false)}
              >
                <Image
                  source={require("../assets/icons/close.png")}
                  style={{ height: 20, width: 20 }}
                />
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={notesModalVisible}
        onRequestClose={() => setNotesModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Notes</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Enter your notes here..."
              value={notes}
              onChangeText={(text) => setNotes(text)}
              multiline
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setNotesModalVisible(false);

                  meternotesubmit(notes);

                  // setNotes("");
                }}
              >
                <Text style={styles.modalButtonText}>Submit Notes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setNotesModalVisible(false);
                  setNotes(completed_note || "");
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={readingMismatchModalVisible}
        transparent={true}
        onRequestClose={() => setReadingMismatchModalVisible(false)}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setReadingMismatchModalVisible(false)}
              style={styles.modalCloseButton}
            >
              <Text>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalHeading}>Select Reading</Text>
            <TouchableOpacity
              onPress={() => setIsDropdownVisible((prev) => !prev)} // Toggle dropdown visibility
              style={styles.dropdownButton}
            >
              <Text style={styles.dropdownButtonText}>
                {selectedReading || "Select meter reading"}
              </Text>
            </TouchableOpacity>
            {isDropdownVisible && (
              <View style={styles.dropdownContainer}>
                <ScrollView
                  nestedScrollEnabled={true}
                  style={{ maxHeight: 150 }}
                >
                  {meReasons.map((item, index) => {
                    return (
                      <TouchableOpacity
                        style={styles.dropdownOption}
                        onPress={() => handleSelectionOptionMeter(item.reason)}
                        key={index}
                      >
                        <Text style={styles.input}>{item.reason}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            )}
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: manualLoading
                    ? colorCodes.submitButtonDisabled
                    : colorCodes.submitButtonEnabled,
                },
              ]}
              onPress={handleManualReadingSubmit}
              disabled={manualLoading}
            >
              {manualLoading ? (
                <ActivityIndicator size={"small"} />
              ) : (
                <Text style={styles.buttonText}>Confirm reading</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {noteLoading && <LoaderComponent loading={noteLoading} />}
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  dropdownButton: {
    width: "100%",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  dropdownContainer: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
    marginBottom: 10,
  },
  dropdownOption: {
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  input: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    width: "60%",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "flex-end",
    paddingVertical: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  modalCloseButton: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  modalCloseIcon: {
    width: 24,
    height: 24,
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    textAlignVertical: "top",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    position: "absolute",
    width: "88%",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 30,
    gap: 10,
  },
  closeBtn: {
    bottom: 130,
    left: 140,
  },
  otp: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: colorCodes.otptext,
  },
  infoText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 50,
  },
  otpBox: {
    height: 50,
    width: "16%",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 14,
    paddingHorizontal: 8,
    fontWeight: "700",
    fontSize: 30,
    borderColor: colorCodes.otpbox,
    color: colorCodes.otp,
  },
  container: {
    marginHorizontal: 20,
    flex: 1,
    marginTop: 40,
  },
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
  scannerView: {
    marginVertical: 5,
    backgroundColor: "#414141",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  scanheading: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    alignItems: "center",
  },
  scannerHeading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#989898",
  },
  scannedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  notesInput: {
    height: 100,
    borderColor: "#0B9ED2",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    backgroundColor: colorCodes.submitButtonEnabled,
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
export default MeterReadingScanner;
