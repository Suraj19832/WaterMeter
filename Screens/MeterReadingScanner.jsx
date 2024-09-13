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
  Dimensions,
  AppState,
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
import {
  Camera,
  runAsync,
  runAtTargetFps,
  useCameraDevice,
  useCameraFormat,
  useFrameProcessor,
} from "react-native-vision-camera";
import { useTextRecognition } from "react-native-vision-camera-text-recognition";
import { useSharedValue, Worklets } from "react-native-worklets-core";
import { runOnJS } from "react-native-reanimated";

function MeterReadingScanner({ navigation }) {
  const route = useRoute();
  const { scanText } = useTextRecognition({ language: "en" });
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
    isOverRideValue,
    flag,
    navigatePath
  } = route.params ?? {};
  console.log(navigatePath)
  const device = useCameraDevice("back");
  const CELL_COUNT = totalDigit;
  const [meterValue, setMeterValue] = useState(null);
  const [modalInfo, setModalInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [dataId, setDataId] = useState(
    completed_dataId ? completed_dataId : null
  );
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
  const [overrideLoading, setOverrideLoading] = useState(false);
  // console.log(typeof value, value, "LLLLLLLLLL");
  const [activeReadingButton, setActiveReadingButton] = useState(false);
  const format = useCameraFormat(device, [{ fps: 10 }]);
  const [isRescan, setIsRescan] = useState(false);
  const [isOverrideButton, setIsOverrideButton] = useState(false);
  const [overrideDigitResult, setOverrideDigitResult] = useState(8);
  const isScanCodeAlreadyExecuted = useSharedValue(false);
  const meReasonsDemo = [
    "Invalid Result",
    "Failed Scan",
    "Invisible",
    "New Meter",
  ];

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

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
      if (!completed_dataId) {
        setDataId(null);
      }
      setMeterValue(null);
      setModalInfo(false);
      setSubmitLoading(false);
      setSelectedReading(null);
      setMeReasons([]);
      setNotes(completed_note || "");
      setCapturedImage(null);
      setValue(meterReading || "");
      setIsCameraOpen(false);
      setIsOverrideButton(false);
    }, [totalDigit, completed_note, CELL_COUNT, meterReading, completed_dataId])
  );

  const scanAnimation = useRef(new Animated.Value(1)).current;
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [zoom, setZoom] = useState(1);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);

  const onPinchEvent = (event) => {
    const scale = event.nativeEvent.scale;
    setTimeout(() => {
      const newZoom = Math.min(
        Math.max(zoom + (scale - 1) / (Platform.OS === "ios" ? 20 : 18), 0),
        0.8
      );
      setZoom(newZoom);
    }, 20);
  };

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const newZoom = Math.min(
        Math.max(zoom + (event.nativeEvent.scale - 1) / 14, 0),
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
        meter_reading_cycle_id: billingId,
      };
      console.log(data, "<<<<<<<<<<<<<<<data in verfify");
      const res = await appApi.meterScanner(data);
      setMeterValue(getSubstring(res?.ocrReading, totalDigit));
      setIsOverrideButton(true);
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
      console.error(err, "error in detect ocr");
      setLoading(false);
    }
  };

  const captureImage = async () => {
    console.log("capture image......=>>>>>");

    try {
      if (cameraRef.current) {
        setZoom(2);
        const photo = await cameraRef.current.takePhoto();
        setCapturedImage(`file://${photo.path}`);
        setTimeout(() => {
          setIsCameraOpen(false);
        }, 1000);
        const resizedImage = await ImageManipulator.manipulateAsync(
          `file://${photo.path}`,
          [{ resize: { width: 800 } }],
          { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
        );
        const fileData = getFileData(resizedImage);

        await verifyNumber(fileData);
      }
    } catch (error) {
      // toast.show("Unable to capture image", { type: "error" });
      console.error(error);
    } finally {
    }
  };

  const handleScan = () => {
    // setIsScanCodeAlreadyExecuted(false);
    setZoom(1);
    isScanCodeAlreadyExecuted.value = false;
    setIsCameraOpen(!isCameraOpen);
    setIsOverrideButton(false);
    startScanningAnimation();
    // captureImage();
    if (capturedImage) {
      setIsRescan(true);
    } else {
      setIsRescan(false);
    }
  };

  const handleSubmit = () => {
    if (dataId === null) {
      toast.show("please scan first");
      return;
    }
    if (meterValue !== value || meterValue === null) {
      setReadingMismatchModalVisible(true);
      return;
    }
    setSubmitLoading(true);
    const data = {
      property_id: id,
      meter_id: meterName,
      // data_id: dataId,
      rescan: isRescan ? "yes" : "no",
      ocr_reading: value,
      is_manual: meterValue !== value ? "1" : "0",
      note: notes ? notes : completed_note,
      meter_reading_cycle_id: billingId,
      // date: date,
      flag: flag ? 1 : 0,
    };
    console.log(data, "without excuse submit");
    appApi
      .submitReading(data)
      .then((res) => {
        if (res?.status) {
          toast.show("Sucessfully Submitted", {
            type: "sucess",
            duration: 3000,
          });
          navigation.navigate(navigatePath === "meterSection" ? "OcrCaptured" : "SummaryScreen", {
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
        toast.show("something went wrong", { type: "error" });
      });
  };

  const handleManualReadingSubmit = () => {
    if (dataId === null) {
      toast.show("please scan first1");
      return;
    }
    setManulLoading(true);
    const data = {
      property_id: id,
      meter_id: meterName,
      // data_id: dataId,
      rescan: isRescan ? "yes" : "no",
      ocr_reading: value,
      is_manual: meterValue !== value ? "1" : "0", // is_ocr in db
      note: notes ? notes : completed_note,
      me_reason: selectedReading,
      meter_reading_cycle_id: billingId,
      // date: date,
      flag: flag ? 1 : 0,
    };
    console.log(data, "with excuse submission");
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
          navigation.navigate(navigatePath === "meterSection" ? "OcrCaptured" : "SummaryScreen", {
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
        toast.show("something went wrong", { type: "error" });
        setManulLoading(false);
        setReadingMismatchModalVisible(false);
      });
  };

  const getOverRideDigit = () => {
    setOverrideLoading(true);
    const data = {
      property_id: id,
      meter_id: meterName,
    };

    appApi
      .overRideDigit(data)
      .then((res) => {
        console.log(res, "<<<<<<<,");
        const overriddenDigit = res?.data?.last_digit_override;
        const currentValue = value.split("");
        currentValue[CELL_COUNT - 1] = overriddenDigit;
        setValue(currentValue.join(""));
        setOverrideLoading(false);
      })
      .catch((err) => {
        console.log(err, "error from override digit");
        setOverrideLoading(false);
      });
  };
  const handleFrameScan = Worklets.createRunOnJS(async (frame) => {
    const { resultText } = frame;

    const hasMeterReading = resultText?.match(/\b\d{4,}\b/g); // any number
    // const hasMeterReading = /\b\d+\s*m\b/i.test(resultText); //if text has m
    // const hasMeterReading = /\b\d+\b/i.test(resultText);
    // Calculate the time difference between the current and last frame

    if (hasMeterReading) {
      try {
        if (hasMeterReading && isScanCodeAlreadyExecuted.value === false) {
          isScanCodeAlreadyExecuted.value = true;
          console.log("has meter reading data", hasMeterReading);
          captureImage();
        }
      } catch (error) {
        console.error("Error taking photo:", error);
      }
    }
  });

  const handleFrameProcessor = useFrameProcessor((frame) => {
    "worklet";
    // const data = scanText(frame);
    // handleFpsCalculation(frame);
    // handleFrameScan(data);
    runAtTargetFps(30, () => {
      // Run at 15 FPS, adjust based on your needs
      if (isScanCodeAlreadyExecuted.value === false) {
        const data = scanText(frame);
        handleFrameScan(data);
      }
    });
  }, []);

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
                <Camera
                  ref={cameraRef}
                  device={device}
                  zoom={zoom}
                  // enableFpsGraph={true}
                  fps={10}
                  format={format}
                  photo={true}
                  style={{ width: "100%", height: 200 }}
                  isActive={isCameraOpen && AppState.currentState === "active"}
                  frameProcessor={handleFrameProcessor}
                />
                <Animated.View
                  style={[
                    styles.scanningOverlay,
                    { transform: [{ translateY }] },
                  ]}
                />
                <View style={styles.overlayBox} />
                {/* <View style={StyleSheet.absoluteFillObject}>
                  <TouchableOpacity style={{ height: 200 }}>
                    <TouchableOpacity
                      onPress={captureImage}
                      style={styles.shutterIcon}
                    >
                      <Image
                        source={require("../assets/icons/shutter.png")}
                        style={{
                          height: 30,
                          width: 30,
                          tintColor:
                            isScanCodeAlreadyExecuted.value === true || loading
                              ? "grey"
                              : null,
                        }}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View> */}
              </View>
            </PinchGestureHandler>
          </GestureHandlerRootView>
        ) : (
          <View style={styles.capturedImage}>
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

          {isOverrideButton &&
            ((value.length === CELL_COUNT && isOverRideValue === "yes") ||
            value.length !== CELL_COUNT ? (
              <TouchableOpacity
                disabled={overrideLoading ? true : false}
                style={[
                  styles.lastDigit,
                  {
                    backgroundColor: overrideLoading
                      ? colorCodes.submitButtonDisabled
                      : colorCodes.submitButtonEnabled,
                  },
                ]}
                onPress={getOverRideDigit}
              >
                <Text style={styles.lastDigittext}>Last Digit OverRide</Text>
              </TouchableOpacity>
            ) : (
              <View />
            ))}

          <TouchableOpacity
            style={{
              backgroundColor:
                isCameraOpen || loading
                  ? colorCodes.submitButtonDisabled
                  : colorCodes.submitButtonEnabled,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 8,
            }}
            onPress={handleScan}
          >
            <Text style={styles.scanButton}>
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
        <View style={styles.readingBox}>
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
              <Text style={styles.submitButton}>Submit Reading</Text>
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
                  <Text style={styles.lastReadings}>Last Reading : </Text>{" "}
                  {lastReading}
                </Text>
                <Text style={{ color: "#989898" }}>
                  <Text style={styles.lastReadings}>Last Reading Date : </Text>{" "}
                  {lastReading !== null && lastReading !== "" ? (
                    convertDateToDDMMYY(lastReadingDate)
                  ) : (
                    <Text />
                  )}
                </Text>
                <Text style={{ color: "#989898" }}>
                  <Text style={styles.lastReadings}>Avg Usage :</Text>{" "}
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
            {isDropdownVisible ? (
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
            ) : (
              <View style={styles.dropdownContainer}>
                <ScrollView
                  nestedScrollEnabled={true}
                  style={{ maxHeight: 150 }}
                >
                  {meReasonsDemo.map((item, index) => {
                    return (
                      <TouchableOpacity
                        style={styles.dropdownOption}
                        onPress={() => handleSelectionOptionMeter(item)}
                        key={index}
                      >
                        <Text style={styles.input}>{item}</Text>
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
    fontWeight: "600",
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
  lastReadings: { color: "#0B9ED2", fontWeight: "600" },
  submitButton: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
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
  readingBox: {
    borderWidth: 1,
    borderColor: colorCodes.borderColor,
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 15,
  },
  scanButton: { fontSize: 16, fontWeight: "700", color: "#fff" },
  infoText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 50,
  },
  otpBox: {
    height: Dimensions.get("window").height * 0.06,
    width: Dimensions.get("window").width * 0.13,
    borderWidth: 1,
    borderRadius: 10,
    fontWeight: "700",
    fontSize: 30,
    borderColor: colorCodes.otpbox,
    color: colorCodes.otp,
    textAlign: "center",
    paddingTop: 4,
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
  shutterIcon: {
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
  lastDigit: {
    borderRadius: 8,
    width: 90,
    paddingVertical: 2,
  },
  lastDigittext: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  scannedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  capturedImage: {
    justifyContent: "center",
    backgroundColor: "#414141",
    height: 200,
    alignItems: "center",
  },
  modalContentNotes: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
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
    fontWeight: "600",
  },
  overlayBox: {
    position: "absolute",
    top: 20,
    left: "25%",
    width: 200,
    height: 100,
    marginLeft: -10, // Centering horizontally
    marginTop: 20, // Centering vertically
    borderColor: "white",
    borderWidth: 2,
    opacity: 0.5,
  },
});
export default MeterReadingScanner;
