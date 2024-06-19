import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function MeterReadingScanner({ navigation }) {
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
          paddingVertical: 15,
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
        }}
      >
        <View>
          <Image
            source={require("../assets/Group (7).png")}
            style={{ height: 60, width: 60 }}
          />
        </View>
        <View>
          <TouchableOpacity>
            <Text>Submit Reading</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Image
            source={require("../assets/Group (6).png")}
            style={{ height: 60, width: 60 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default MeterReadingScanner;

const styles = StyleSheet.create({
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
