import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform, // Import Alert for showing errors
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useRoute } from "@react-navigation/native";
import { colorCodes } from "../ColorCodes/Colors";
import appApi from "../Helper/Api";
import { getFileData } from "../Helper/Helper";
import { useToast } from "react-native-toast-notifications";

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
  } = route.params ?? {};
  const [scannedMeter, setScannedMeter] = useState(null);
  const [meterValue, setMeterValue] = useState(null);
  const [modalInfo, setModalInfo] = useState(false);
  const [otp, setOTP] = useState(Array(totalDigit).fill(""));
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const otpFields = useRef(
    Array(totalDigit)
      .fill()
      .map(() => React.createRef())
  );

  const handleOTPChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (value !== "" && index < totalDigit - 1) {
      otpFields.current[index + 1].current.focus();
    } else if (value === "" && index > 0) {
      otpFields.current[index - 1].current.focus();
    }
  };
  const isOTPComplete = () => {
    return otp.every((totalDigit) => totalDigit !== "");
  };

  const verifyNumber = async (imageFile) => {
    try {
      const data = {
        file: imageFile,
      };
      const res = await appApi.meterScanner(data);
      console.log(res, "Response from API");
      setMeterValue(res?.ocrReading);
      toast.show(res?.ocrReading, { type: "sucess" });
      if (res?.ocrReading) {
        const newOTP = res.ocrReading.split("").slice(0, totalDigit);
        setOTP(newOTP);
      }
    } catch (err) {
      console.error(err, "Error while uploading image");
    } finally {
      setLoading(false);
    }
  };

  const handleScan = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setLoading(true);
        setScannedMeter(result.assets[0].uri);
        const fileData = getFileData(result);
        await verifyNumber(fileData);
      } else {
        // Alert.alert("Scan Cancelled", "You cancelled the scan.");
        toast.show("Scan Cancelled", { type: "sucess" });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error while scanning:", error);
      // Alert.alert("Error", "Failed to launch the camera.");
      toast.show("Failed to launch the camera", { type: "sucess" });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={{ marginTop: 5 }} onPress={navigation.goBack}>
          <Image
            source={require("../assets/left-arrow (1).png")}
            style={{ height: 22, width: 12 }}
          />
        </TouchableOpacity>
        {/* heading title */}
        <View style={styles.heading}>
          <Text style={styles.headingText}>
            {id} | {name}
          </Text>
        </View>
        {/* scanner meter image display */}
        <View style={styles.scannerView}>
          {loading ? (
            <ActivityIndicator size={"large"} />
          ) : (
            scannedMeter && (
              <Image
                source={{ uri: scannedMeter }}
                style={styles.scannedImage}
                resizeMode="cover"
              />
            )
          )}
        </View>
        {/* scan button */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 20,
            alignItems: "center",
          }}
        >
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
              {loading ? "Scanning...." : scannedMeter ? "Rescan" : "Scan"}
            </Text>
          </TouchableOpacity>
        </View>
        {/* otp filling screen */}
        <View
          style={{
            borderWidth: 1,
            borderColor: "#2198C9",
            borderRadius: 15,
            paddingVertical: 16,
            paddingHorizontal: 15,
          }}
        >
          <Text style={styles.title}>Meter Reading :</Text>
          <View style={styles.otp}>
            {otp.map((totalDigit, index) => (
              <TextInput
                key={index}
                style={styles.otpBox}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(value) => handleOTPChange(index, value)}
                value={totalDigit}
                ref={otpFields.current[index]}
              />
            ))}
          </View>
        </View>
        {/* info ,submit button, manual typing button */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 25,
            marginBottom: 50,
          }}
        >
          <TouchableOpacity onPress={() => setModalInfo(true)}>
            <Image
              source={require("../assets/Group (7).png")}
              style={{ height: 30, width: 30 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (isOTPComplete()) {
                toast.show(otp.join(""), { type: "sucess", duration: 3000 });
              }
              navigation.navigate("OcrCaptured", { meterName });
            }}
            style={{
              backgroundColor: isOTPComplete()
                ? colorCodes.submitButtonEnabled
                : colorCodes.submitButtonDisabled,
              paddingHorizontal: 15,
              paddingVertical: 12,
              borderRadius: 8,
            }}
            disabled={!isOTPComplete()}
          >
            <Text style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>
              Submit Reading
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              source={require("../assets/Group (6).png")}
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
                  {lastReading}
                </Text>
                <Text style={{ color: "#989898" }}>
                  <Text style={{ color: "#0B9ED2", fontWeight: 600 }}>
                    Last Reading Date :
                  </Text>{" "}
                  {lastReadingDate}
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
    </KeyboardAvoidingView>
  );
}

export default MeterReadingScanner;

const styles = StyleSheet.create({
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
    color: "#0F77AF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  otpBox: {
    height: 50,
    width: "auto",
    borderWidth: 1,
    borderColor: "#0B9ED2",
    borderRadius: 10,
    paddingLeft: 14,
    paddingHorizontal: 8,
    fontSize: 26,
    fontWeight: "700",
    color: colorCodes.heading,
  },
  container: {
    marginHorizontal: 20,
    flex: 1,
    marginTop: 40,
    // backgroundColor: "red",
  },
  heading: {
    marginVertical: 20,
    backgroundColor: "#F5F5F5",
    shadowColor: "#2198C9",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
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
  scannerView: {
    marginVertical: 5,
    backgroundColor: "#414141",
    height: 200, // Adjust height as needed
    alignItems: "center",
    justifyContent: "center",
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
});
