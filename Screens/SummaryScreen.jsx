// import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import React, { useState } from "react";
// import { View, StyleSheet, Text, ImageBackground, Image } from "react-native";
// import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
// import { SafeAreaView } from "react-native-safe-area-context";
// import SubmitButton from "../Components/SubmitButton";
// import { colorCodes } from "../ColorCodes/Colors";

// export default function SummaryScreen({ navigation }) {
//   const [selectMeter, setSelectMeter] = useState(false);

//   const styles = StyleSheet.create({
//     headArrow: {
//       width: "90%",
//       margin: "auto",
//       height: 30,
//       marginTop: 10,
//     },
//     propertyName: {
//       width: "90%",
//       height: 50,
//       margin: "auto",
//       marginTop: 30,
//       borderRadius: 15,
//       backgroundColor: "#e7e7e7",
//       shadowColor: "#2198C9",
//       elevation: 10,
//       display: "flex",
//       flexDirection: "row",
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     propertyNameFTxt: {
//       fontSize: 23,
//       color: "#0B9ED2",
//       fontWeight: "500",
//       paddingBottom: 5,
//       letterSpacing: 0.5,
//     },
//     propertyNameSTxt: {
//       fontSize: 22,
//       color: "#0B9ED2",
//       height: 30,
//       letterSpacing: 0.5,
//     },

//     pendingMeters: {
//       backgroundColor: "#197AB6",
//       borderRadius: 30,
//       paddingVertical: 4,
//       paddingHorizontal: 8,
//       alignSelf: "flex-end",
//     },
//     pendingMetersTxt: {
//       color: "white",
//       textAlign: "center",
//       lineHeight: 16,
//       fontSize: 12,
//       fontWeight: "500",
//       fontSize: 12,
//     },
//   });

//   return (
//     <SafeAreaView>
//       <ScrollView>
//         <View style={styles.headArrow}>
//           <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
//             <AntDesign name="left" size={25} color="#0B9ED2" />
//           </TouchableOpacity>
//         </View>
//         <View style={{ gap: 80 }}>
//           <View style={styles.propertyName}>
//             <Text style={styles.propertyNameFTxt}>M01 |</Text>
//             <Text style={styles.propertyNameSTxt}> Masari Heights</Text>
//           </View>
//           <View
//             style={{
//               height: "auto",
//               alignItems: "center",
//               width: "90%",
//               alignSelf: "center",
//               gap: 16,
//             }}
//           >
//             <Text
//               style={{
//                 fontWeight: "600",
//                 fontSize: 24,
//                 lineHeight: 28,
//                 color: "rgba(11, 158, 210, 1)",
//               }}
//             >
//               Summary
//             </Text>
//             <Text
//               style={{
//                 fontWeight: "500",
//                 fontSize: 24,
//                 lineHeight: 28,
//                 color: "rgba(89, 89, 89, 1)",
//               }}
//             >
//               26 Meters Read
//             </Text>
//             {/* <Text
//               style={{
//                 color: "rgba(152, 152, 152, 1)",
//                 fontSize: 24,
//                 lineHeight: 28,
//                 fontWeight: 500,
//               }}
//             >
//               XXXXX OCR Captured
//             </Text> */}
//             {/* <View style={{ flexDirection: "row" }}>
//               <Text
//                 style={{
//                   fontWeight: "600",
//                   fontSize: 24,
//                   lineHeight: 28,
//                   color: "rgba(11, 158, 210, 1)",
//                 }}
//               >
//                 Meter :
//               </Text>
//               <Text
//                 style={{
//                   fontWeight: "500",
//                   fontSize: 24,
//                   lineHeight: 28,
//                   color: "rgba(152, 152, 152, 1)",
//                 }}
//               >
//                 {" "}
//                 A10
//               </Text>
//             </View> */}

//             <View style={{ gap: 24, width: "100%" }}>
//               <View style={{ width: "100%", height: "auto", gap: 10 }}>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <View style={{ flexDirection: "row" }}>
//                     <Text
//                       style={{
//                         fontWeight: "600",
//                         fontSize: 18,
//                         lineHeight: 21,
//                         color: "rgba(11, 158, 210, 1)",
//                       }}
//                     >
//                       12 :
//                     </Text>
//                     <Text
//                       style={{
//                         fontWeight: "500",
//                         fontSize: 18,
//                         lineHeight: 21,
//                         color: "rgba(152, 152, 152, 1)",
//                       }}
//                     >
//                       {" "}
//                       OCR Passed
//                     </Text>
//                   </View>

//                   <View style={{ flexDirection: "row" }}>
//                     <Text
//                       style={{
//                         fontWeight: "600",
//                         fontSize: 18,
//                         lineHeight: 21,
//                         color: "rgba(11, 158, 210, 1)",
//                       }}
//                     >
//                       05 :
//                     </Text>
//                     <Text
//                       style={{
//                         fontWeight: "500",
//                         fontSize: 18,
//                         lineHeight: 21,
//                         color: "rgba(152, 152, 152, 1)",
//                       }}
//                     >
//                       {" "}
//                       Manual Edit
//                     </Text>
//                   </View>
//                 </View>

//                 <View
//                   style={{
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <View style={{ flexDirection: "row" }}>
//                     <Text
//                       style={{
//                         fontWeight: "600",
//                         fontSize: 18,
//                         lineHeight: 21,
//                         color: "rgba(11, 158, 210, 1)",
//                       }}
//                     >
//                       06 :
//                     </Text>
//                     <Text
//                       style={{
//                         fontWeight: "500",
//                         fontSize: 18,
//                         lineHeight: 21,
//                         color: "rgba(152, 152, 152, 1)",
//                       }}
//                     >
//                       {" "}
//                       Potential Error
//                     </Text>
//                   </View>

//                   <View style={{ flexDirection: "row" }}>
//                     <Text
//                       style={{
//                         fontWeight: "600",
//                         fontSize: 18,
//                         lineHeight: 21,
//                         color: "rgba(11, 158, 210, 1)",
//                       }}
//                     >
//                       03 :
//                     </Text>
//                     <Text
//                       style={{
//                         fontWeight: "500",
//                         fontSize: 18,
//                         lineHeight: 21,
//                         color: "rgba(152, 152, 152, 1)",
//                       }}
//                     >
//                       {" "}
//                       Meter Notes
//                     </Text>
//                   </View>
//                 </View>
//               </View>

//               <View>
//                 <Text
//                   style={{
//                     alignSelf: "center",
//                     fontWeightL: "400",
//                     fontSize: 16,
//                     color: "rgba(89, 89, 89, 1)",
//                   }}
//                 >
//                   Task completed in 35 mins
//                 </Text>
//                 <View
//                   style={{ flexDirection: "row", alignSelf: "center", gap: 16 }}
//                 >
//                   <Text
//                     style={{
//                       alignSelf: "center",
//                       fontWeightL: "500",
//                       fontSize: 16,
//                       color: "rgba(89, 89, 89, 1)",
//                     }}
//                   >
//                     28.05.2024
//                   </Text>
//                   <Text
//                     style={{
//                       alignSelf: "center",
//                       fontWeightL: "500",
//                       fontSize: 16,
//                       color: "rgba(89, 89, 89, 1)",
//                     }}
//                   >
//                     10:56 AM
//                   </Text>
              
//                 </View>
//               </View>
//             </View>
//           </View>
        
//           <View
//             style={{
//               height: "auto",
//               alignItems: "center",
//               width: "90%",
//               alignSelf: "center",
//             }}
//           >
//             <SubmitButton
//               text="Submit Another"
//               bgColor="rgba(255, 137, 2, 1)"
//               height={44}
//               width={154}
//               textSize={18}
//             ></SubmitButton>
//           </View>
//           <View
//             style={{
//               height: "auto",
//               alignItems: "center",
//               width: "90%",
//               alignSelf: "center",
//             }}
//           >
//             <View style={styles.pendingMeters}>
//               <Text style={styles.pendingMetersTxt}>99 Meters Pending</Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

import { AntDesign, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, Text, ImageBackground, Image, TextInput } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import SubmitButton from "../Components/SubmitButton";
import { colorCodes } from "../ColorCodes/Colors";

export default function MeterSection({ navigation }) {
  const [selectMeter, setSelectMeter] = useState(false);

  const styles = StyleSheet.create({
    headArrow: {
      width: "90%",
      margin: "auto",
      height: 30,
      marginTop: 10,
    },
    propertyName: {
      width: "90%",
      height: 50,
      margin: "auto",
      marginTop: 30,
      borderRadius: 15,
      backgroundColor: "#e7e7e7",
      shadowColor: "#2198C9",
      elevation: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    propertyNameFTxt: {
      fontSize: 23,
      color: "#0B9ED2",
      fontWeight: "500",
      paddingBottom: 5,
      letterSpacing: 0.5,
    },
    propertyNameSTxt: {
      fontSize: 22,
      color: "#0B9ED2",
      height: 30,
      letterSpacing: 0.5,
    },

    pendingMeters: {
      backgroundColor: "#197AB6",
      borderRadius: 30,
      paddingVertical: 4,
      paddingHorizontal: 8,
      alignSelf: "flex-end",
      marginTop:24
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
      padding: 12,
      paddingHorizontal: 20,
      borderRadius: 18,
      gap: 8,
      borderWidth: 1,
      borderColor: "#2198C9",
      fontSize: 14,
  
      height: 60,
    },
    input: {
      position: "relative",
      color: "black",
      width: "90%",
      height: "100%",
      fontSize: 20,
    },
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.headArrow}>
          <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
            <AntDesign name="left" size={25} color="#0B9ED2" />
          </TouchableOpacity>
        </View>
        <View style={{ gap: 80 }}>
          <View style={styles.propertyName}>
            <Text style={styles.propertyNameFTxt}>M01 |</Text>
            <Text style={styles.propertyNameSTxt}> Masari Heights</Text>
          </View>
          <View
            style={{
              height: "auto",
              alignItems: "center",
              width: "90%",
              alignSelf: "center",
              gap: 16,
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: 24,
                lineHeight: 28,
                color: "rgba(11, 158, 210, 1)",
              }}
            >
              Summary
            </Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 24,
                lineHeight: 28,
                color: "rgba(89, 89, 89, 1)",
              }}
            >
              26 Meters Read
            </Text>
            {/* <Text
              style={{
                color: "rgba(152, 152, 152, 1)",
                fontSize: 24,
                lineHeight: 28,
                fontWeight: 500,
              }}
            >
              XXXXX OCR Captured
            </Text> */}
            {/* <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 24,
                  lineHeight: 28,
                  color: "rgba(11, 158, 210, 1)",
                }}
              >
                Meter :
              </Text>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 24,
                  lineHeight: 28,
                  color: "rgba(152, 152, 152, 1)",
                }}
              >
                {" "}
                A10
              </Text>
            </View> */}

            <View style={{ gap: 24, width: "100%" }}>
              <View style={{ width: "100%", height: "auto", gap: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 18,
                        lineHeight: 21,
                        color: "rgba(11, 158, 210, 1)",
                      }}
                    >
                      12 :
                    </Text>
                    <Text
                      style={{
                        fontWeight: "500",
                        fontSize: 18,
                        lineHeight: 21,
                        color: "rgba(152, 152, 152, 1)",
                      }}
                    >
                      {" "}
                      OCR Passed
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 18,
                        lineHeight: 21,
                        color: "rgba(11, 158, 210, 1)",
                      }}
                    >
                      05 :
                    </Text>
                    <Text
                      style={{
                        fontWeight: "500",
                        fontSize: 18,
                        lineHeight: 21,
                        color: "rgba(152, 152, 152, 1)",
                      }}
                    >
                      {" "}
                      Manual Edit
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 18,
                        lineHeight: 21,
                        color: "rgba(11, 158, 210, 1)",
                      }}
                    >
                      06 :
                    </Text>
                    <Text
                      style={{
                        fontWeight: "500",
                        fontSize: 18,
                        lineHeight: 21,
                        color: "rgba(152, 152, 152, 1)",
                      }}
                    >
                      {" "}
                      Potential Error
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 18,
                        lineHeight: 21,
                        color: "rgba(11, 158, 210, 1)",
                      }}
                    >
                      03 :
                    </Text>
                    <Text
                      style={{
                        fontWeight: "500",
                        fontSize: 18,
                        lineHeight: 21,
                        color: "rgba(152, 152, 152, 1)",
                      }}
                    >
                      {" "}
                      Meter Notes
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ gap: 8 }}>
                <Text
                  style={{
                    alignSelf: "center",
                    fontWeightL: "400",
                    fontSize: 16,
                    color: "rgba(89, 89, 89, 1)",
                  }}
                >
                  Task completed in 35 mins
                </Text>
                <View
                  style={{ flexDirection: "row", alignSelf: "center", gap: 16 }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      fontWeightL: "500",
                      fontSize: 16,
                      color: "rgba(89, 89, 89, 1)",
                    }}
                  >
                    28.05.2024
                  </Text>
                  <Text
                    style={{
                      alignSelf: "center",
                      fontWeightL: "500",
                      fontSize: 16,
                      color: "rgba(89, 89, 89, 1)",
                    }}
                  >
                    10:56 AM
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{  marginTop: 18, flexDirection: "row", justifyContent:"space-between" }}
        >
          <View
            style={{
              width: 120,
              height: 24,
              backgroundColor: "rgba(33, 152, 201, 1)",
              borderTopRightRadius: 30,
              borderBottomRightRadius: 30,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontWeight: "500",
                fontSize: 12,
                lineHeight: 16,
                color: "rgba(255, 255, 255, 1)",
              }}
            >
              Lat : 31.1830
            </Text>
          </View>

          <View
            style={{
              width: 120,
              height: 24,
              backgroundColor: "rgba(33, 152, 201, 1)",
              borderTopLeftRadius: 30,
              borderBottomLeftRadius: 30,
              justifyContent: "center",
              alignSelf: "flex-end",
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontWeight: "500",
                fontSize: 12,
                lineHeight: 16,
                color: "rgba(255, 255, 255, 1)",
              }}
            >
              Long : 31.2232
            </Text>
          </View>
          
        </View>
        <View
          style={{
            height: "auto",
            alignItems: "center",
            width: "90%",
            alignSelf: "center",
            marginTop: 24,
          }}
        >
            <View style={styles.fields_main}>
              <View style={styles.input_box}>
                <TextInput
                  style={[
                    styles.input,
                   
                  ]}
                  placeholder="Completed Readings"
                  placeholderTextColor={"rgba(166, 166, 166, 1)"}
             
                
                />
                <TouchableOpacity
                 
                >
                  <AntDesign name="down" size={14} color="rgba(152, 152, 152, 1)" />
                </TouchableOpacity>
              </View>
            </View>
        </View>
        <View
          style={{
            height: "auto",
            alignItems: "center",
            width: "90%",
            alignSelf: "center",
          }}
        >
          <View style={styles.pendingMeters}>
            <Text style={styles.pendingMetersTxt}>99 Meters Pending</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}