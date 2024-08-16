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
  Animated,
  Button,
} from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colorCodes } from "../ColorCodes/Colors";
import appApi from "../Helper/Api";
import { getFileData } from "../Helper/Helper";
import { useToast } from "react-native-toast-notifications";
import * as ImageManipulator from "expo-image-manipulator";
import LoaderComponent from "../Components/LoaderComponent";
import "react-native-gesture-handler";
import { CameraView, useCameraPermissions } from "expo-camera";
import {
  PinchGestureHandler,
  State,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

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
    billingId,
    date,
  } = route.params ?? {};
  console.log(
    billingId,
    date,
    id,
    meterName,
    completed_dataId,
    "KKKKKKKKKKKKK"
  );
  const CELL_COUNT = totalDigit;
  const [meterValue, setMeterValue] = useState(null);
  const [modalInfo, setModalInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [dataId, setDataId] = useState(null);
  const [notes, setNotes] = useState(completed_note ? completed_note : "");
  const [notesModalVisible, setNotesModalVisible] = useState(false);
  const [noteLoading, setnoteLoading] = useState(false);
  const toast = useToast();
  const [readingMismatchModalVisible, setReadingMismatchModalVisible] =
    useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(true);
  const [selectedReading, setSelectedReading] = useState(null);
  const [meReasons, setMeReasons] = useState([]);
  const [manualLoading, setManulLoading] = useState(false);
  const [value, setValue] = useState(meterReading || "");
  const [activeReadingButton, setActiveReadingButton] = useState(false);
  const [isRescan, setIsRescan] = useState(false);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  function convertDateToDDMMYY(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "";
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  }

  function getSubstring(data, count) {
    if (count > data?.length) {
      return data;
    }
    return data?.substring(0, count);
  }

  useEffect(() => {
    if (value.length >= CELL_COUNT) {
      setActiveReadingButton(true);
    } else {
      setActiveReadingButton(false);
    }
  }, [value]);

  const meternotesubmit = (note) => {
    if (note === "") {
      return;
    }
    setnoteLoading(true);
    const data = {
      propertyId: id,
      meter_id: meterName,
      note: note,
    };

    appApi
      .meternote(data)
      .then((res) => {
        setNotes(res?.data?.note);
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
  const handleSelectionOptionMeter = (meterId) => {
    setSelectedReading(meterId);
    setIsDropdownVisible(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      setMeterValue(null);
      setModalInfo(false);
      setSubmitLoading(false);
      setDataId(null);
      setSelectedReading(null);
      setMeReasons([]);
      setSelectedReading(null);
      setNotes(completed_note || "");
      setCapturedImage(null);
      setValue(meterReading || "");
    }, [totalDigit, completed_note, CELL_COUNT, meterReading])
  );

  const scanAnimation = useRef(new Animated.Value(1)).current;
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [zoom, setZoom] = useState(0);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);

  const onPinchEvent = (event) => {
    const newZoom = Math.min(
      Math.max(zoom + (event.nativeEvent.scale - 1) / 20, 0),
      1
    );
    setZoom(newZoom);
  };
  const onPinchStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const newZoom = Math.min(
        Math.max(zoom + (event.nativeEvent.scale - 1) / 20, 0),
        1
      );
      setZoom(newZoom);
    }
  };
  const startScanningAnimation = () => {
    scanAnimation.setValue(0);
    Animated.loop(
      Animated.timing(scanAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  };
  const verifyNumber = async (imageFile) => {
    setLoading(true);
    try {
      const data = {
        file: imageFile,
        property_id: id,
        meter_id: meterName,
        property_billing_cycle_id: billingId,
      };
      const res = await appApi.meterScanner(data);
      setMeterValue(getSubstring(res?.ocrReading, totalDigit));
      setDataId(res?.dataId);
      setMeReasons(res?.meReasons);
      toast.show(getSubstring(res?.ocrReading, totalDigit), {
        type: "sucess",
        duration: 2000,
      });
      if (res?.ocrReading) {
        setValue(getSubstring(res?.ocrReading, totalDigit));
        setLoading(false);
      } else {
        toast.show("Unable to read !!", { type: "success", duration: 3000 });
        setLoading(false);
      }
    } catch (err) {
      toast.show("something went wrong");
      console.error(err, "Error while uploading image");
      setLoading(false);
    }
  };

  const captureImage = async () => {
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        setCapturedImage(photo.uri);
        setIsCameraOpen(false);
        const resizedImage = await ImageManipulator.manipulateAsync(
          photo.uri,
          [{ resize: { width: 800 } }],
          { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG }
        );
        const fileData = getFileData(resizedImage);
        await verifyNumber(fileData);
      }
    } catch (error) {
      toast.show("Unable to capture image", { type: "error" });
      console.error(error);
    } finally {
    }
  };

  const handleScan = () => {
    setIsCameraOpen(!isCameraOpen);
    startScanningAnimation();
    captureImage();
    if (capturedImage) {
      setIsRescan(true);
    } else {
      setIsRescan(false);
    }
  };

  const handleSubmit = () => {
    if (meterValue !== value || meterValue === null) {
      setReadingMismatchModalVisible(true);
      return;
    }
    setSubmitLoading(true);
    const data = {
      property_id: id,
      meter_id: meterName,
      data_id: completed_dataId ? completed_dataId : dataId,
      rescan: isRescan ? "yes" : "no",
      ocr_reading: value,
      is_manual: meterValue !== value ? "1" : "0",
      note: notes ? notes : completed_note,
      property_billing_cycle_id: billingId,
      date: date,
    };
    console.log(data, "handlesubmit params");
    appApi
      .submitReading(data)
      .then((res) => {
        console.log(res, "handlesubmit");
        if (res?.status) {
          toast.show("Sucessfully Submitted", {
            type: "sucess",
            duration: 3000,
          });
          navigation.navigate("OcrCaptured", {
            meterName,
            id,
            name,
            otp: value,
            res,
            value: "ocr",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.show("something went wrong",{type:"error"})
      });
  };

  const handleManualReadingSubmit = () => {
    setManulLoading(true);
    const data = {
      property_id: id,
      meter_id: meterName,
      data_id: completed_dataId ? completed_dataId : dataId,
      rescan: isRescan ? "yes" : "no",
      ocr_reading: value,
      is_manual: meterValue !== value ? "1" : "0", // is_ocr in db
      note: notes ? notes : completed_note,
      me_reason: selectedReading,
      property_billing_cycle_id: billingId,
      date: date,
    };
    console.log(data, "handlemanual paramas");
    appApi
      .submitReading(data)
      .then((res) => {
        console.log(res, "handle manual submit response");
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
            otp: value,
            res,
            value: "me",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.show("something went wrong",{type:"error"})
        setManulLoading(false);
        setReadingMismatchModalVisible(false);
      });
  };

  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  const translateY = scanAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 0],
  });

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

      <ScrollView
        contentContainerStyle={{ marginBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        {/* heading title */}
        <View style={{ paddingHorizontal: 4 }}>
          <View style={styles.heading}>
            <Text style={styles.headingText}>
              {id} | {name}
            </Text>
          </View>
        </View>

        {isCameraOpen ? (
          <GestureHandlerRootView style={{}}>
            <PinchGestureHandler
              onGestureEvent={onPinchEvent}
              onHandlerStateChange={onPinchStateChange}
            >
              <View>
                <CameraView type={facing} zoom={zoom} ref={cameraRef}>
                  <Animated.View
                    style={[
                      styles.scanningOverlay,
                      { transform: [{ translateY }] },
                    ]}
                  />
                  <View>
                    <TouchableOpacity style={{ height: 200 }}>
                      <TouchableOpacity
                        onPress={captureImage}
                        style={styles.shutterIcon}
                      >
                        <Image
                          source={require("../assets/icons/shutter.png")}
                          style={{ height: 30, width: 30 }}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </View>
                </CameraView>
              </View>
            </PinchGestureHandler>
          </GestureHandlerRootView>
        ) : (
          <View
            style={{
              justifyContent: "center",
              backgroundColor: "#414141",
              height: 200,
              alignItems: "center",
            }}
          >
            {loading ? (
              <ActivityIndicator size={"large"} />
            ) : capturedImage && capturedImage ? (
              <Image
                source={{ uri: capturedImage }}
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
        )}

        {/* scan button */}
        <View style={styles.scanheading}>
          <Text style={styles.scannerHeading}>
            <Text style={{ color: "#0B9ED2" }}>Meter :</Text> {meterName}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor:
                isCameraOpen || loading
                  ? colorCodes.submitButtonDisabled
                  : colorCodes.submitButtonEnabled,
              paddingVertical: 10,
              paddingHorizontal: 25,
              borderRadius: 8,
            }}
            onPress={handleScan}
          >
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}>
              {isCameraOpen
                ? "Stop"
                : loading
                ? "Scanning"
                : capturedImage || meterImage
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
          <CodeField
            ref={ref}
            // {...props} //can remove for delete from end always
            value={value}
            onChangeText={(value) => setValue(value)}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.otpBox, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
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
              backgroundColor: activeReadingButton
                ? colorCodes.submitButtonEnabled
                : colorCodes.submitButtonDisabled,
              paddingHorizontal: 15,
              paddingVertical: 12,
              borderRadius: 8,
              minWidth: 160,
            }}
            disabled={!activeReadingButton}
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
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={{ color: "#989898" }}>
                  <Text style={{ color: "#0B9ED2", fontWeight: 600 }}>
                    Last Reading :
                  </Text>{" "}
                  {convertDateToDDMMYY(lastReading)}
                </Text>
                <Text style={{ color: "#989898" }}>
                  <Text style={{ color: "#0B9ED2", fontWeight: 600 }}>
                    Last Reading Date :
                  </Text>{" "}
                  {convertDateToDDMMYY(lastReadingDate)}
                </Text>
                <Text style={{ color: "#989898" }}>
                  <Text style={{ color: "#0B9ED2", fontWeight: 600 }}>
                    Avg Usage :
                  </Text>{" "}
                  {avgUsage}
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
          <View style={styles.modalContentNotes}>
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
                }}
              >
                <Text style={styles.modalButtonText}>Submit Notes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setNotesModalVisible(false);
                  // setNotes(completed_note || "");
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
          <View style={styles.modalContentExcuse}>
            <TouchableOpacity
              onPress={() => setReadingMismatchModalVisible(false)}
              style={styles.modalCloseButton}
            >
              <AntDesign name="close" size={22} color="black" />
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
  root: { flex: 1, padding: 20 },
  codeFieldRoot: { marginTop: 2 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "rgba(11, 158, 210, 0.3)",
  },
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
  modalContentExcuse: {
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
    alignSelf: "flex-start",
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
    bottom: 90,
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
    paddingVertical: 4,
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
  message: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 40,
  },
  container: {
    marginHorizontal: 20,
    flex: 1,
    marginTop: 40,
  },
  heading: {
    marginVertical: 20,
    backgroundColor: "#F5F5F5",
    shadowColor: "#2198C9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 7,
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
  shutterIcon:{
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  scannerView: {
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
  scanningOverlay: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: colorCodes.heading,
    borderRadius: 2,
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
  modalContentNotes: {
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
