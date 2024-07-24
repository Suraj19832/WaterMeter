import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import appApi from "../Helper/Api";

export default function SummaryScreen({ navigation }) {
  const route = useRoute();
  const { id, name,res} = route.params ?? {};
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [data, setData] = useState(null);
  const [dropdownData, setDropdownData] = useState([])
 

  const handleDropdownValue = (items) => {
    console.log(items.id)
    setDropdownValue(items?.id);
    setToggleDropdown(false);
  };

  useFocusEffect(
    React.useCallback(()=>{
      const data = {
        property_id: id,
      };
      appApi
        .summaryCompletion(data)
        .then((res) => {
          console.log(res, ">>>>>>>response");
          setData(res?.data);
          setDropdownData(res?.data?.completedMeters)
        })
        .catch((err) => [console.log(err, ">>>>>>>error")]);
    },[])
  )
  return (
    <SafeAreaView>
      <View style={styles.headArrow}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Image
            source={require("../assets/left-arrow (1).png")}
            style={{ height: 22, width: 12 }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.propertyName}>
        <Text style={styles.propertyNameFTxt}>{id} |</Text>
        <Text style={styles.propertyNameSTxt}> {name}</Text>
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
            <Text style={styles.lat}>Lat : {data?.lat}</Text>
          </View>

          <View style={styles.longBox}>
            <Text style={styles.longtext}>Long : {data?.lng}</Text>
          </View>
        </View>

        <View style={styles.dropdownmain}>
          <View style={styles.fields_main}>
            <TouchableOpacity
              style={styles.input_box}
              onPress={() => setToggleDropdown(!toggleDropdown)}
            >
              <Text style={styles.completereading}>{dropdownValue ? `${dropdownValue}` : "Completed Readings"}</Text>
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
                    maxHeight: 120,
                  }}
                >
                  {dropdownData?.map((item, index) => {
                    console.log(item, ">>>>>>>>>>>>>>>");
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
        </View>

        <View style={styles.pending}>
          <View style={styles.pendingMeters}>
            <Text style={styles.pendingMetersTxt}>
              {res?.pendingMeterCount} Meters Pending
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    fontWeight: "400",
  },
  dropdownmain: {
    height: "auto",
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
