import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function MeterReadingScanner({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={{ marginTop: 5 }} onPress={navigation.goBack}>
        <Image
          source={require("../assets/left-arrow (1).png")}
          style={{ height: 22, width: 12 }}
        />
      </TouchableOpacity>

      <View style={styles.heading}>
        <Text style={styles.headingText}>M01 | Masari Heights</Text>
      </View>
      <View style={styles.scannerView}></View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 20,
          alignItems: "center",
        }}
      >
        <Text style={styles.scannerHeading}>
          <Text style={{ color: "#0B9ED2" }}>Meter :</Text> A10
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#FF8902",
            paddingVertical: 10,
            paddingHorizontal: 30,
            borderRadius: 8,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}>
            Scan
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#2198C9",
          paddingHorizontal: 10,
          borderRadius: 15,
          paddingVertical: 13,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "#0F77AF", fontWeight: "700", fontSize: 18 }}>
          Meter Reading :
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 12,
            alignSelf: "center",
            marginVertical: 20,
          }}
        >
          <View style={styles.otpBox}></View>
          <View style={styles.otpBox}></View>
          <View style={styles.otpBox}></View>
          <View style={styles.otpBox}></View>
          <View style={styles.otpBox}></View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 25,
        }}
      >
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={require("../assets/Group (7).png")}
            style={{ height: 30, width: 30 }}
          />
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: "#FF8902",
              paddingHorizontal: 15,
              paddingVertical: 12,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>
              Submit Reading
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Image
            source={require("../assets/Group (6).png")}
            style={{ height: 30, width: 30 }}
          />
        </View>
      </View>
      <View style={{ position: "relative" }}>
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={{ color: "#989898" }}>
                <Text style={{ color: "#0B9ED2", fontWeight: 600 }}>
                  Last Reading :
                </Text>{" "}
                91627 OCR
              </Text>
              <Text style={{ color: "#989898" }}>
                <Text style={{ color: "#0B9ED2", fontWeight: 600 }}>
                  Last Reading Date :
                </Text>{" "}
                Sun May 19th,2024
              </Text>
              <Text style={{ color: "#989898" }}>
                <Text style={{ color: "#0B9ED2", fontWeight: 600 }}>
                  Avg Usage :
                </Text>{" "}
                2425/mth
              </Text>
            </View>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setModalVisible(false)}
            >
              <Image
                source={require("../assets/icons/close.png")}
                style={{ height: 20, width: 20 }}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
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
  container: {
    marginHorizontal: 20,
  },
  heading: {
    marginVertical: 20,
    backgroundColor: "#F5F5F5",
    // Adding shadow properties
    shadowColor: "#2198C9",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
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
    height: 130,
  },
  scannerHeading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#989898",
  },
  otpBox: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: "#0B9ED2",
    borderRadius: 10,
  },
});
