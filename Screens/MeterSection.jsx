import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";

const MeterSection = ({ navigation }) => {
  const [isDropdownOpengender, setDropdownOpengender] = useState(false);
  // const [isDropdownMeter, setisDropdownMeter] = useState(false)
  const [inputValuegender, setInputValuegender] = useState("");
  const [genderData, setGenderData] = useState("");
  const toggleDropdowngender = () => {
    setDropdownOpengender(!isDropdownOpengender);
  };
  const handleSelectOptiongender = (option) => {
    setInputValuegender(option);
    setGenderData(option);
    setDropdownOpengender(false);
  };
  return (
    <SafeAreaView style={{ marginHorizontal: 20 }}>
      <>
        <TouchableOpacity style={{ marginTop: 10 }} onPress={navigation.goBack}>
          <Image
            source={require("../assets/left-arrow (1).png")}
            style={{ height: 22, width: 12 }}
          />
        </TouchableOpacity>
      </>
      <View style={styles.heading}>
        <Text style={styles.headingText}>M01 | Masari Heights</Text>
      </View>
      {/* <View style={styles.selectBox}>
        <Text style={styles.selectheading}>Meter :</Text>
        <View style={styles.select}>
          <Text style={styles.selecttext}>Select</Text>
        </View>
      </View> */}
      <View style={styles.fields_main}>
      <Text style={styles.selectheading}>Meter :</Text>
                <TouchableOpacity onPress={toggleDropdowngender}>
                  <View style={styles.input_box}>
                    
                    <TextInput
                      style={styles.input}
                      placeholder="Select"
                      value={inputValuegender}
                      onBlur={() => handleSelectOptiongender(inputValuegender)}
                      editable={false} // Allow editing only when dropdown is closed
                      placeholderTextColor={"rgba(166, 166, 166, 1)"}
                    />
                  <Entypo name="chevron-down" size={18} color="rgba(152, 152, 152, 1)" />
                  </View>
                </TouchableOpacity>
              </View>

              {/* Dropdown of gender */}

              {isDropdownOpengender && (
                <View style={styles.dropdownContainer}>
                  <TouchableOpacity
                    style={styles.dropdownOption}
                    onPress={() => handleSelectOptiongender("male")}
                  >
                    <Text>Male</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dropdownOption}
                    onPress={() => handleSelectOptiongender("female")}
                  >
                    <Text>Female</Text>
                  </TouchableOpacity>
                </View>
              )}
      <View style={styles.selectBox}>
        <Text style={styles.selectheading}>Meter :</Text>
        <View style={styles.select}>
          <Text style={styles.selectCompleter}>Completed Readings</Text>
        </View>
      </View>
      <View style={{ justifyContent: "flex-end", marginVertical: 15 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#197AB6",
            paddingVertical: 6,
            borderRadius: 15,
            width: "50%",
            alignSelf: "flex-end",
            paddingHorizontal: 16,
          }}
        >
          <Text style={{ color: "white", fontWeight: 700 }}>
            99 Meters Pending
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignSelf: "center", marginVertical: 15 }}>
        <TouchableOpacity
          style={{ padding: 10, backgroundColor: "#FF8902", borderRadius: 10 }}
        >
          <Text style={{ fontWeight: "700", color: "white" }}>
            Select Meter
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MeterSection;

const styles = StyleSheet.create({
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
  selectBox: {
    marginVertical: 10,
  },
  selectheading: {
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 21.09,
    color: "#0B9ED2",
  },
  select: {
    borderWidth: 1,
    borderColor: "#2198C9",
    borderRadius: 15,
    paddingVertical: 13,
    paddingHorizontal: 15,
    marginTop: 18,
  },
  selecttext: {
    fontWeight: "700",
    color: "#989898",
    fontSize: 24,
  },
  selectCompleter: {
    fontSize: 16,
    fontWeight: "400",
    color: "#989898",
  },
  //new style
  fields_main: {
    marginTop: 17,
  },
  inputHeading: {
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 27,
    color: "rgba(0, 54, 126, 1)",
    paddingBottom: 10,
  },
  input: {
    position: "relative",
    width: "90%",
    fontWeight: "700",
    color: "#989898",
    fontSize: 24,
  },

  input_box: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#2198C9",
    marginTop: 18
  },

  arrowdown: {
    position: "absolute",
    right: 22,
  },
  dropdownContainer: {
    // // position: "absolute",
    // top: "100%",
    // // left: 0,
    // marginTop: 10,
    // width: "89%",
    // backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    // backgroundColor:"red"
    padding: 8,
    color: "black",
    // zIndex: 1,
    // left: 17,
    // alignSelf: "center",
    // justifyContent:'center'
  },
  dropdownOption: {
    paddingVertical: 8,
    alignSelf: "center",
    // backgroundColor:"red",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
