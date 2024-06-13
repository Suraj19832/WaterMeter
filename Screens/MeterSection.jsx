import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

const MeterSection = () => {
  return (
    <SafeAreaView style={{ marginHorizontal: 20 }}>
      <>
        <TouchableOpacity style={{ marginTop: 10 }}>
          <Image
            source={require("../assets/left-arrow (1).png")}
            style={{ height: 22, width: 12 }}
          ></Image>
        </TouchableOpacity>
      </>
    </SafeAreaView>
  );
};

export default MeterSection;
