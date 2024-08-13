import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Modal,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useToast } from "react-native-toast-notifications";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import {
  useFocusEffect,
  useIsFocused,
  useRoute,
} from "@react-navigation/native";
import appApi from "../Helper/Api";
import LoaderComponent from "../Components/LoaderComponent";
import { getFileData } from "../Helper/Helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuthToken } from "../redux/slices/Authslice";
import { useDispatch } from "react-redux";
import { setStringValue } from "../redux/slices/UniqueSlice";
import { colorCodes } from "../ColorCodes/Colors";
import { all } from "axios";

const MeterSection = ({ navigation }) => {
  const [meterMake, setmeterMake] = useState({});
  const dispatch = useDispatch();
  const route = useRoute();
  const { PopertyId, date } = route.params ?? {};
  const [name, setname] = useState();
  const [id, setid] = useState();
  const [meterDataByApi, setmeterDataByApi] = useState([]);
  const [pendingMeterCount, setpendingMeterCount] = useState(null);
  const [lastReading, setLastReading] = useState("");
  const [lastReadingDate, setLastReadingDate] = useState("");
  const [avgUsage, setAvgUsage] = useState("");
  // For edit
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dropdownNotes, setDropdownNotes] = useState("");
  //For Image
  const [isModalImage, setIsModalImage] = useState(false);
  const [isImage, setisImage] = useState();

  const [isPendingDropdown, setIsPendingDropdown] = useState(false);
  const [inputValuePending, setinputValuePending] = useState("");
  const [meterData, setmeterData] = useState("");
  const [loading, setloading] = useState(true);

  const [isCompletedDropdown, setIsCompletedDropdown] = useState(false);
  const [inputValueCompleted, setinputValueCompleted] = useState("");
  const [meterReadingData, setmeterReadingData] = useState(null);
  const [completeImage, setCompleteImage] = useState(null);
  const [completeModal, setCompleteModal] = useState(false);
  const [image, setImage] = useState(null);
  const [completeDropdownImage, setCompleteDropdownImage] = useState(null);
  const [completeLoading, setCompleteLoading] = useState(false);
  const [completeDetailsLoading, setCompleteDetailsLoading] = useState(false);
  const [completedTotalDigit, setCompletedTotalDigit] = useState(null);
  const [billingId, setBillingId] = useState(null);
  const [completedUnit, setCompletedUnit] = useState({
    reading: "",
    readingType: "",
    readingDate: "",
  });

  //30/07/2024
  const [meterCompletedImage, setMeterCompletedImage] = useState("");
  // for user selected image
  const [userSelectedImage, setUserSelectedImage] = useState(null);
  const [meterReading, setMeterReading] = useState(null);
  const [completedDataId, setCompletedDataId] = useState(null);
  const [completedNotes, setCompletedNotes] = useState("");

  const [noteLoading, setnoteLoading] = useState(false);

  const toast = useToast();
  const getNameById = (all_data, id) => {
    const item = all_data?.find((obj) => obj?.id === id);
    return item
      ? {
          make: item?.make,
          meterNote: item?.note,
          image: item?.image,
          totalDigit: item?.total_number_of_digit,
        }
      : {
          make: "Not Found",
          meterNote: "Not Found",
          image: "Upload Image",
          totalDigit: "not found",
        };
  };

  const togglePendingDropdown = () => {
    setIsPendingDropdown(!isPendingDropdown);
    setIsCompletedDropdown(false);
    setinputValueCompleted("");
    setCompleteImage(null);
    setCompletedUnit({});
  };
  const handleSelectionOptionMeter = (all_data, option, billingId) => {
    setBillingId(billingId);
    setUserSelectedImage(null);
    setinputValuePending(option);
    setmeterData(option);
    setIsPendingDropdown(false);
    setmeterMake(getNameById(all_data, option));

    const meterMakevalue = getNameById(all_data, option);
    if (userSelectedImage) {
      setisImage(userSelectedImage);
    } else if (meterMakevalue?.image) {
      setisImage(meterMakevalue?.image);
    }
  };

  const toggleCompletedDropdown = () => {
    setIsCompletedDropdown(!isCompletedDropdown);
    setIsPendingDropdown(false);
    setinputValuePending("");
  };
  const handleCompletedSelectMeter = (option) => {
    completedImage(option?.id);
    setinputValueCompleted(option?.id);
    setmeterReadingData(option?.id);
    setCompletedTotalDigit(option?.total_number_of_digit);
    setIsCompletedDropdown(false);
    setCompleteImage(option?.image);
    setCompletedNotes(option?.note);
  };

  const toggleModalVisibility = () => {
    setDropdownNotes(meterMake?.meterNote);
    setIsModalVisible(!isModalVisible);
  };
  const toggleModalVisibilitySubmit = () => {
    setIsModalVisible(false);
  };
  const meternotesubmit = () => {
    setnoteLoading(true);
    toast.show("wait while updating", { type: "sucess" });
    const fetchSubmitData = async () => {
      const data = {
        propertyId: PopertyId,
        meter_id: inputValuePending,
        note: dropdownNotes,
      };
      try {
        const res = await appApi.meternote(data);
        if (res?.status) {
          setnoteLoading(false);
          toast.show(res?.message, { type: "sucess" });
        }
      } catch (error) {
        setnoteLoading(false);
        toast.show("Unexpected Error Occur", { type: "sucess" });
      } finally {
        fetchData();
        setnoteLoading(false);
      }
    };
    fetchSubmitData();
    setIsModalVisible(!isModalVisible);
  };
  // For Information
  const [isModalInformation, setIsModalInformation] = useState(false);

  const toggleModalVisibilityInformation = () => {
    setIsModalInformation(!isModalInformation);
    setIsModalVisible(false);
  };

  const toggleModalVisibilityImage = () => {
    if (userSelectedImage) {
      setisImage(userSelectedImage);
    }
    setIsModalImage(!isModalImage);
  };

  const [modalVisibleUploadImage, setModalVisibleUploadImage] = useState(false);
  const [errorMessageUploadImage, setErrorMessageUploadImage] = useState(null);
  const [isPickingFilePassPortPhoto, setIsPickingFilePassPortPhoto] =
    useState(false);
  const toggleChangeImage = () => {
    setIsModalImage(!isModalImage);
    setModalVisibleUploadImage(true);
  };
  const color = isModalImage ? "#0F77AF" : "#FFFFFF";
  const closeModal = () => {
    setModalVisibleUploadImage(false);
  };

  const ImageUpload = async (result) => {
    // toast.show("Working on it...", { type: "sucess" });
    setnoteLoading(true);
    const newtry = getFileData(result);
    const postData = {
      propertyId: PopertyId,
      meter_id: inputValuePending,
      file: newtry,
    };
    try {
      const res = await appApi.meterimage(postData);
      if (res?.status) {
        setnoteLoading(false);
        toast.show(res?.message, { type: "sucess" });
      }
    } catch (error) {
      setnoteLoading(false);
      toast.show("Unexpected Error Occur", { type: "sucess" });
    } finally {
      fetchData();
      setnoteLoading(false);
    }
  };

  const pickFilePassPortPhoto = async () => {
    if (isPickingFilePassPortPhoto) {
      return;
    }

    setIsPickingFilePassPortPhoto(true);
    setErrorMessageUploadImage(null);

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (
        !result.canceled &&
        result.assets &&
        result.assets.length > 0 &&
        result.assets[0].uri
      ) {
        // File picked
        ImageUpload(result);
        setUserSelectedImage(result.assets[0].uri);
        toast.show("Uploading", { type: "sucess" });
      } else if (result.canceled) {
        // File picking cancelled
      } else {
        setErrorMessageUploadImage("File picking failed");
      }
    } catch (error) {
      setErrorMessageUploadImage("Error picking file");
    } finally {
      setIsPickingFilePassPortPhoto(false);
    }

    closeModal();
  };
  const takePicture = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Camera permission is required to take photos.");
      return;
    }

    try {
      const imageResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (imageResult.assets && imageResult.assets[0].uri !== null) {
        // Compress the image
        const compressedImage = await ImageManipulator.manipulateAsync(
          imageResult.assets[0].uri,
          [{ resize: { width: 800 } }], // resize to a width of 800 pixels, maintain aspect ratio
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // compress to 70% quality
        );

        setModalVisibleUploadImage(false);
        ImageUpload(compressedImage); // Use compressed image for upload
        setUserSelectedImage(compressedImage.uri);
      }
    } catch (error) {
      toast.show("Capture Failed", { type: "warning" });
    }
  };

  const fetchData = async () => {
    setloading(true);
    const data = {
      propertyId: PopertyId,
      date: date,
    };
    try {
      const res = await appApi.metersection(data);
      if (res?.status) {
        setname(res?.data?.name);
        setid(res?.data?.id);
        setmeterDataByApi(res?.data?.meters);
        setpendingMeterCount(res?.data?.pendingMeterReading);
        setLastReading(res?.data?.last_reading);
        setLastReadingDate(res?.data?.last_reading_date);
        setAvgUsage(res?.data?.avg_usage);

        if (inputValuePending != "") {
          handleSelectionOptionMeter(res?.data?.meters, inputValuePending);
        }
      }
    } catch (error) {
      setloading(false);
    } finally {
      setloading(false);
    }
  };

  function convertDateToDDMMYY(dateString) {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return ""; // Return an empty string or a default value if the date is invalid
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year

    return `${day}/${month}/${year}`;
  }

  // useEffect(()=>{
  //   fetchData()
  // },[PopertyId])

  useFocusEffect(
    React.useCallback(() => {
      // Reset the states when the screen comes into focus
      fetchData();
    }, [PopertyId])
  );

  const completedImage = (meterId) => {
    setCompleteLoading(true);
    setCompleteDetailsLoading(true);
    const data = {
      property_id: id,
      meter_id: meterId,
    };
    appApi
      .completedImage(data)
      .then((res) => {
        setMeterCompletedImage(res?.iamge);
        setMeterReading(res?.reading);
        setCompletedDataId(res?.data_id);

        setCompletedUnit({
          reading: res?.reading,
          readingType: res?.readingType,
          readingDate: res?.readingDate,
        });
        setCompleteLoading(false);
        setCompleteDetailsLoading(false);
      })
      .catch((err) => {
        console.log(err, "error from complete");
        setCompleteLoading(false);
        setCompleteDetailsLoading(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      setinputValuePending("");
      setinputValueCompleted("");
      setIsCompletedDropdown(false);
      setIsPendingDropdown(false);
      setCompleteImage(null);
      setCompletedUnit({});
      // fetchData(); //maybe removed
    }, [])
  );

  const isFocus = useIsFocused();

  useEffect(() => {
    return () => {
      setinputValuePending("");
    };
  }, [isFocus]);

  if (loading) {
    return (
      <View>
        <ActivityIndicator
          size={"large"}
          color={"#00367E"}
          style={styles.loader}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ marginHorizontal: 20 }}>
      <>
        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Image
            source={require("../assets/left-arrow (1).png")}
            style={{ height: 22, width: 12 }}
          />
        </TouchableOpacity>
      </>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 4 }}>
          <View style={styles.heading}>
            <Text style={styles.headingText}>
              {id} | {name}
            </Text>
          </View>
        </View>

        <View style={styles.fields_main}>
          <Text style={styles.selectheading}>Meter :</Text>
          <TouchableOpacity
            onPress={togglePendingDropdown}
            disabled={pendingMeterCount === 0 ? true : false}
          >
            <View
              style={[
                styles.input_box,
                {
                  borderColor: pendingMeterCount === 0 ? "#95c7db" : "#2198C9",
                },
              ]}
            >
              <TextInput
                style={[
                  styles.input,
                  { color: pendingMeterCount === 0 ? "#e8e3e3" : "#989898" },
                ]}
                placeholder={
                  pendingMeterCount === 0
                    ? "No Pending Meters"
                    : "Select Pending Meters"
                }
                value={inputValuePending}
                editable={false}
                placeholderTextColor={"rgba(166, 166, 166, 1)"}
              />
              <Entypo
                name="chevron-down"
                size={18}
                color="rgba(152, 152, 152, 1)"
              />
            </View>
          </TouchableOpacity>
        </View>
        {/* Dropdown of meter */}
        {isPendingDropdown && (
          <View style={styles.dropdownContainer}>
            <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 150 }}>
              {meterDataByApi?.length > 0 &&
                meterDataByApi
                  ?.filter((item) => item.status === "pending")
                  ?.map((meterid, index) => {
                    return (
                      <TouchableOpacity
                        style={styles.dropdownOption}
                        onPress={() =>
                          handleSelectionOptionMeter(
                            meterDataByApi,
                            meterid?.id,
                            meterid?.property_billing_cycle_id
                          )
                        }
                        key={index}
                      >
                        <Text style={styles.input}>{meterid?.id}</Text>
                      </TouchableOpacity>
                    );
                  })}
            </ScrollView>
          </View>
        )}
        <Modal
          visible={isModalVisible || isModalInformation || isModalImage}
          transparent={true}
          animationType="slide"
          onRequestClose={toggleModalVisibility}
        >
          <View style={styles.modalBackground}>
            {isModalInformation && (
              <View style={{ width: "90%", alignItems: "flex-end" }}>
                <TouchableOpacity onPress={toggleModalVisibilityInformation}>
                  <Entypo name="cross" size={24} color={color} />
                </TouchableOpacity>
              </View>
            )}
            {isModalImage && (
              <View
                style={[
                  styles.modalContainer,
                  {
                    padding: 0,
                    height: 326,
                    justifyContent: "center",
                  },
                ]}
              >
                <View style={{ width: "100%" }}>
                  <View
                    style={{
                      width: "90%",
                      alignItems: "flex-end",
                      alignSelf: "center",
                    }}
                  >
                    <TouchableOpacity onPress={toggleModalVisibilityImage}>
                      <Entypo name="cross" size={24} color={color} />
                    </TouchableOpacity>
                  </View>

                  {isImage ? (
                    <Image
                      source={{ uri: isImage }}
                      style={{
                        height: 220,
                        width: "100%",
                      }}
                      resizeMode="cover"
                    />
                  ) : (
                    <View
                      style={{
                        height: 220,
                        width: "100%",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Text style={styles.headingText}> Upload Image</Text>
                      <View
                        style={{
                          width: "100%",
                          alignItems: "center",
                          marginTop: 15,
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            width: 102,
                            height: 32,
                            backgroundColor: "#FF8902",
                            borderRadius: 8,
                            justifyContent: "center",
                          }}
                          onPress={toggleChangeImage}
                        >
                          <Text style={styles.closeButton}>Upload Image</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
                {isImage && (
                  <View
                    style={{
                      width: "90%",
                      alignItems: "flex-end",
                      marginTop: 15,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        width: 102,
                        height: 32,
                        backgroundColor: "#FF8902",
                        borderRadius: 8,
                        justifyContent: "center",
                      }}
                      onPress={toggleChangeImage}
                    >
                      <Text style={styles.closeButton}>Change Image</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
            {!isModalImage && (
              <View style={styles.modalContainerNotes}>
                {isModalVisible && (
                  <>
                    <Text style={styles.addNotes}>Add Notes</Text>
                    <TextInput
                      style={styles.notesInput}
                      placeholder="Enter your notes here..."
                      numberOfLines={4}
                      onChangeText={(text) => setDropdownNotes(text)}
                      value={dropdownNotes}
                      multiline
                    />

                    <View style={styles.buttonsNotes}>
                      <TouchableOpacity
                        style={styles.submitNotes}
                        onPress={meternotesubmit}
                      >
                        <Text style={styles.submitNotesText}>Submit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.submitNotes}
                        onPress={toggleModalVisibilitySubmit}
                      >
                        <Text style={styles.submitNotesText}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
                {isModalInformation && (
                  <View style={{ width: "100%", gap: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.modalKeyText}>Last Reading :</Text>
                      <Text style={styles.modalValueText}>
                        {convertDateToDDMMYY(lastReading)}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.modalKeyText}>
                        Last Reading Date :
                      </Text>
                      <Text style={styles.modalValueText}>
                        {convertDateToDDMMYY(lastReadingDate)}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.modalKeyText}>Avg Usage : </Text>
                      <Text style={styles.modalValueText}> {avgUsage}</Text>
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
        </Modal>
        {inputValuePending && (
          <View
            style={{
              marginTop: 24,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.selectheading}>Make :</Text>
              <Text
                style={{
                  color: "rgba(152, 152, 152, 1)",
                  fontWeight: "400",
                  fontSize: 18,
                }}
              >
                {meterMake?.make}
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={toggleModalVisibilityImage}>
                <Image
                  source={require("../assets/frame.png")}
                  style={{
                    height: 28,
                    width: 30,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.fields_main}>
          {inputValuePending && (
            <View
              style={{ flexDirection: "row", gap: 2, alignItems: "center" }}
            >
              <Text style={[styles.selectheading, { fontSize: 20 }]}>
                Meter Notes :
              </Text>
              <TouchableOpacity
                onPress={toggleModalVisibility}
                disabled={noteLoading}
              >
                <Image
                  source={require("../assets/write.png")}
                  style={{ height: 20, width: 20 }}
                />
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity onPress={toggleCompletedDropdown}>
            <View style={styles.input_box}>
              <TextInput
                style={styles.input}
                placeholder="View Completed Meters"
                value={inputValueCompleted}
                onBlur={() =>
                  handleSelectionOptionMeter(
                    meterDataByApi,
                    inputValueCompleted
                  )
                }
                editable={false}
                placeholderTextColor={"rgba(166, 166, 166, 1)"}
              />
              <Entypo
                name="chevron-down"
                size={18}
                color="rgba(152, 152, 152, 1)"
              />
            </View>
          </TouchableOpacity>

          {isCompletedDropdown && (
            <View style={styles.dropdownContainer}>
              <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 150 }}>
                {meterDataByApi?.filter((item) => item.status === "completed")
                  .length > 0 ? (
                  meterDataByApi
                    ?.filter((item) => item.status === "completed")
                    ?.map((option, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={styles.dropdownOption}
                          onPress={() => handleCompletedSelectMeter(option)}
                        >
                          <Text style={styles.input}>{option?.id}</Text>
                        </TouchableOpacity>
                      );
                    })
                ) : (
                  <TouchableOpacity
                    onPress={() => setIsCompletedDropdown(false)}
                  >
                    <Text
                      style={[
                        styles.input,
                        { paddingLeft: 10, paddingVertical: 6 },
                      ]}
                    >
                      No completed Meters
                    </Text>
                  </TouchableOpacity>
                )}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Dropdown of meter reading */}

        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginVertical: 15,
          }}
        >
          {completeImage !== null ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#197AB6",
                paddingVertical: 6,
                borderRadius: 15,
                paddingHorizontal: 16,
              }}
              onPress={() => {
                setCompleteModal(true);
                // setCompleteLoading(true); // Add this line
                // completedImage(); // Call this function to load the image
              }}
            >
              <Text style={{ color: "white", fontWeight: 700 }}>
                View Image
              </Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}

          <View
            style={{
              backgroundColor: pendingMeterCount === 0 ? "#2F8A16" : "#197AB6",
              paddingVertical: 6,
              borderRadius: 15,
              // width: 160,
              alignSelf: "flex-end",
              paddingHorizontal: 16,
            }}
          >
            {pendingMeterCount === 0 ? (
              <Text style={{ color: "white", fontWeight: 700 }}>Completed</Text>
            ) : (
              <Text style={{ color: "white", fontWeight: 700 }}>
                {pendingMeterCount} Meters Pending
              </Text>
            )}
          </View>
        </View>

        {completedUnit.length !== 0 ? (
          <>
            {completeDetailsLoading ? (
              <ActivityIndicator size={"small"} color={"#197AB6"} />
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <View style={{ alignItems: "center", gap: 10 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "500",
                      color: "#197AB6",
                    }}
                  >
                    {completedUnit.reading} {completedUnit.readingType}
                    {"  "}
                    {completedUnit.readingDate}
                  </Text>
                </View>
                {Object.keys(completedUnit).length !== 0 && (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("meterReadingScanner", {
                        id,
                        name,
                        lastReading,
                        lastReadingDate,
                        avgUsage,
                        meterName: inputValueCompleted,
                        totalDigit: completedTotalDigit,
                        meterImage: meterCompletedImage,
                        meterReading: meterReading,
                        completed_dataId: completedDataId,
                        completed_note: completedNotes,
                      })
                    }
                  >
                    <Image
                      source={require("../assets/write.png")}
                      style={{ height: 30, width: 30 }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </>
        ) : null}

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            paddingLeft: 10,
            paddingRight: 35,
          }}
        >
          <TouchableOpacity onPress={toggleModalVisibilityInformation}>
            <Image
              source={require("../assets/infoIcon.png")}
              style={{
                height: 30,
                width: 30,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              marginVertical: 15,
              flexDirection: "row",
              gap: 80,
              alignItems: "center",
              width: "94%",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              disabled={inputValuePending ? false : true}
              style={{
                backgroundColor: inputValuePending
                  ? "rgba(255, 137, 2, 1)"
                  : "rgba(255, 137, 2, 0.5)",
                borderRadius: 8,
                height: 40,
                width: 120,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                dispatch(setStringValue("Completion"));
                navigation.jumpTo("meterReadingScanner", {
                  id,
                  name,
                  lastReading,
                  lastReadingDate,
                  avgUsage,
                  totalDigit: meterMake?.totalDigit,
                  meterName: inputValuePending,
                  completed_note: dropdownNotes,
                  billingId: billingId,
                  date: date,
                });
              }}
            >
              <Text style={{ fontWeight: "700", color: "white" }}>
                Select Meter
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* camera gallery modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleUploadImage}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainerCG}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={takePicture}
              >
                <Text style={styles.modalOptionText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={pickFilePassPortPhoto}
              >
                <Text style={styles.modalOptionText}>Choose Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={closeModal}>
                <Text style={styles.modalOptionText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* complete image */}
        <Modal
          transparent={true}
          visible={completeModal}
          onRequestClose={() => setCompleteModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContentt}>
              <View style={styles.imageBox}>
                {completeLoading ? (
                  <ActivityIndicator
                    size="medium"
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                ) : (
                  meterCompletedImage && (
                    <Image
                      source={{ uri: meterCompletedImage }}
                      style={{ height: "100%", width: "100%" }}
                    />
                  )
                )}
              </View>
              <TouchableOpacity
                style={styles.closeButtonn}
                onPress={() => setCompleteModal(false)}
              >
                <Image
                  source={require("../assets/icons/close.png")}
                  style={{ height: 20, width: 20 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {noteLoading && <LoaderComponent loading={noteLoading} />}
        {/* <CropImage/> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MeterSection;

const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  modalContentt: {
    height: Dimensions.get("window").height * 0.3,
    width: "100%",
  },
  imageBox: {
    height: 200,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalImage: {
    width: "100%",
    height: Dimensions.get("window").height * 0.3,
    marginBottom: 20,
  },
  closeButtonn: {
    position: "absolute",
    right: 18,
    top: -35,
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
  selectBox: {
    marginVertical: 10,
  },
  selectheading: {
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 18,
    // lineHeight: 21.09,
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
    fontSize: 18,
    zIndex: 1,
  },
  input_box: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#2198C9",
    marginTop: 18,
  },

  arrowdown: {
    position: "absolute",
    right: 22,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#2198C9",
    borderRadius: 15,
    padding: 8,
    color: "black",
    marginTop: 2,
  },
  dropdownOption: {
    paddingVertical: 8,
    alignSelf: "center",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainerNotes: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    borderColor: "#2198C9",
    borderWidth: 1,
  },
  modalInput: {
    width: "100%",
    height: 100,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
    color: "#595959",
    fontSize: 14,
    fontWeight: "400",
  },
  closeButton: {
    fontSize: 12,

    color: "#FFFFFF",
    fontWeight: "500",
    lineHeight: 16,
    alignSelf: "center",
  },
  modalKeyText: {
    color: "#2198C9",
    fontWeight: "500",
    fontSize: 16,
  },
  modalValueText: {
    color: "#989898",
    fontWeight: "400",
    fontSize: 16,
  },

  //down modal css for camera gallery
  modalContainerCG: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "90%",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#2198C9",
  },
  modalOptionText: {
    fontSize: 18,
    textAlign: "center",
  },

  // loader
  loader: {
    height: "100%",
    // width: Dimensions.get("window").width * 0.7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(242, 242, 242, 1)",
  },
  addNotes: {
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
  buttonsNotes: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  submitNotes: {
    backgroundColor: colorCodes.submitButtonEnabled,
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  submitNotesText: { color: "#fff", fontWeight: "bold" },
});

//
