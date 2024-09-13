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
import { useDispatch, useSelector } from "react-redux";
import { setStringValue } from "../redux/slices/UniqueSlice";
import { colorCodes } from "../ColorCodes/Colors";
import { setBillingAddress } from "../redux/slices/BillingSlice";

const MeterSection = ({ navigation }) => {
  const { billingAddress } = useSelector((state) => state.billingSlice);
  const [meterMake, setmeterMake] = useState({});
  // console.log(meterMake,"<<<<<<<,")
  const dispatch = useDispatch();
  const route = useRoute();
  const { PopertyId, date, meter_reading_cycle_id } = route.params ?? {};
  const [name, setname] = useState();
  const [id, setid] = useState();
  const [meterDataByApi, setmeterDataByApi] = useState([]);
  const [pendingMeterCount, setpendingMeterCount] = useState(null);
  const [lastReading, setLastReading] = useState("");
  const [lastReadingDate, setLastReadingDate] = useState("");
  const [avgUsage, setAvgUsage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dropdownNotes, setDropdownNotes] = useState("");
  const [isModalImage, setIsModalImage] = useState(false);
  const [isImage, setisImage] = useState();
  const [isPendingDropdown, setIsPendingDropdown] = useState(false);
  const [inputValuePending, setinputValuePending] = useState("");
  console.log(inputValuePending, ":::::::::::::::>>>>>>>>>>>");
  const [meterData, setmeterData] = useState("");
  const [loading, setloading] = useState(true);
  const [isCompletedDropdown, setIsCompletedDropdown] = useState(false);
  const [inputValueCompleted, setinputValueCompleted] = useState("");
  console.log(inputValueCompleted, "::::::::::::::::::::::::::");
  const [meterReadingData, setmeterReadingData] = useState(null);
  const [completeImage, setCompleteImage] = useState(null);
  const [completeModal, setCompleteModal] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);
  const [completeDetailsLoading, setCompleteDetailsLoading] = useState(false);
  const [completedTotalDigit, setCompletedTotalDigit] = useState(null);
  const [billingId, setBillingId] = useState(null);
  const [isOverRide, setIsOverRide] = useState("");
  const [completedUnit, setCompletedUnit] = useState({
    reading: "",
    readingType: "",
    readingDate: "",
  });
  const [meterCompletedImage, setMeterCompletedImage] = useState("");
  console.log(meterCompletedImage);
  const [userSelectedImage, setUserSelectedImage] = useState(null);
  const [meterReading, setMeterReading] = useState(null);
  const [completedDataId, setCompletedDataId] = useState(null);
  const [completedNotes, setCompletedNotes] = useState("");
  const [noteLoading, setnoteLoading] = useState(false);
  const [meterCycleId, setMeterCycleId] = useState(null);
  const [editAccess, setEditAccess] = useState("");

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

  const readingStartTime = () => {
    const data = {
      meter_id: inputValuePending,
      property_id: PopertyId,
      meter_reading_cycle_id: meterCycleId,
    };
    appApi
      .readingStartTime(data)
      .then((res) => {
        console.log(res, "?????????stater timer");
      })
      .catch((err) => {
        console.log(err, "errro timerstar");
      });
  };

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

  const handleSelectionOptionMeter = (
    all_data,
    option,
    billingId,
    note,
    image
  ) => {
    console.log(image, "<<<<<<<<<<<<<<<<<>>>>");
    dispatch(setBillingAddress(billingId));
    setBillingId(billingId);
    setUserSelectedImage(image);
    // console.log(userSelectedImage)
    setinputValuePending(option);
    setmeterData(option);
    setIsPendingDropdown(false);
    setmeterMake(getNameById(all_data, option));
    setDropdownNotes(note);

    const meterMakevalue = getNameById(all_data, option);
    // console.log(meterMakevalue,"PPPPPPPPPPPPP")
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
    // console.log(option.reading_status, "option heaind88888888888888888");
    completedImage(option?.id, option?.reading_status);
    setinputValueCompleted(option?.id);
    setmeterReadingData(option?.id);
    setCompletedTotalDigit(option?.total_number_of_digit);
    setIsCompletedDropdown(false);
    setCompleteImage(option?.image);
    setCompletedNotes(option?.note);
  };

  const toggleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };
  const toggleModalVisibilitySubmit = () => {
    setIsModalVisible(false);
  };
  const meternotesubmit = () => {
    if (dropdownNotes?.trim() === "") {
      setIsModalVisible(false);
      return;
    }
    setnoteLoading(true);
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
        setnoteLoading(false);
      }
    };
    fetchSubmitData();
    setIsModalVisible(!isModalVisible);
  };
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
        ImageUpload(result);
        setUserSelectedImage(result.assets[0].uri);
        toast.show("Uploading", { type: "sucess" });
      } else if (result.canceled) {
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
        const compressedImage = await ImageManipulator.manipulateAsync(
          imageResult.assets[0].uri,
          [{ resize: { width: 800 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        setModalVisibleUploadImage(false);
        ImageUpload(compressedImage);
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
        setid(res?.data?.uid);
        setmeterDataByApi(res?.data?.meters);
        setpendingMeterCount(res?.data?.pendingMeterReading);
        setLastReading(res?.data?.last_reading);
        setLastReadingDate(res?.data?.last_reading_date);
        setAvgUsage(res?.data?.avg_usage);
        setIsOverRide(res?.data?.meter_last_digit_override);
        setMeterCycleId(res?.data?.meter_reading_cycle_id);
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

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [PopertyId])
  );

  const completedImage = (meterId, editAccess) => {
    // console.log(editAccess,"meteridghg")
    setCompleteLoading(true);
    setCompleteDetailsLoading(true);
    const data = {
      meter_id: meterId,
      meter_reading_cycle_id: meterCycleId,
    };
    appApi
      .completedImage(data)
      .then((res) => {
        // console.log(res,">>>>>>>>>>>metere conrh")
        dispatch(setBillingAddress(res?.meter_reading_cycle_id));
        setMeterCycleId(res?.data?.meter_reading_cycle_id);
        setMeterCompletedImage(res?.data?.image);
        setMeterReading(res?.data?.reading);
        setCompletedDataId(res?.data?.data_id);
        setEditAccess(editAccess);

        setCompletedUnit({
          reading: res?.data?.reading,
          readingType: res?.data?.readingType,
          readingDate: res?.data?.readingDate,
        });
        setCompleteLoading(false);
        setCompleteDetailsLoading(false);
      })
      .catch((err) => {
        toast.show("please try again!!");
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
    <SafeAreaView style={{ marginHorizontal: 20, height: "100%" }}>
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
        {isPendingDropdown && (
          <View style={styles.dropdownContainer}>
            <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 150 }}>
              {meterDataByApi?.length > 0 &&
                meterDataByApi
                  ?.filter((item) => item.status === "pending")
                  ?.map((meterid, index) => {
                    // console.log(meterid,">>>>::::::::::::::")
                    return (
                      <TouchableOpacity
                        style={styles.dropdownOption}
                        onPress={() =>
                          handleSelectionOptionMeter(
                            meterDataByApi,
                            meterid?.id,
                            meterid?.meter_reading_cycle_id,
                            meterid?.note,
                            meterid?.image
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
                  <View style={styles.cross}>
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
                    <View style={styles.upload}>
                      <Text style={styles.headingText}> Upload Image</Text>
                      <View style={styles.uploadView}>
                        <TouchableOpacity
                          style={styles.uploadBtn}
                          onPress={toggleChangeImage}
                        >
                          <Text style={styles.closeButton}>Upload Image</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
                {isImage && (
                  <View style={styles.changeBox}>
                    <TouchableOpacity
                      style={styles.changeBtn}
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
                      <Text style={styles.modalKeyText}>Last Reading : </Text>
                      <Text style={styles.modalValueText}>{lastReading}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.modalKeyText}>
                        Last Reading Date :{" "}
                      </Text>
                      <Text style={styles.modalValueText}>
                        {lastReading !== null && lastReading !== "" ? (
                          convertDateToDDMMYY(lastReadingDate)
                        ) : (
                          <Text />
                        )}
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
              <Text style={styles.meterMake}>{meterMake?.make}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={toggleModalVisibilityImage}>
                <Image
                  source={require("../assets/changeImage.png")}
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
            <View style={styles.meternotes}>
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

        <View style={styles.viewBox}>
          {completeImage !== null ? (
            <TouchableOpacity
              style={styles.viewImage}
              onPress={() => {
                setCompleteModal(true);
              }}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>
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
              alignSelf: "flex-end",
              paddingHorizontal: 16,
            }}
          >
            {pendingMeterCount === 0 ? (
              <Text style={{ color: "white", fontWeight: "700" }}>
                Completed
              </Text>
            ) : (
              <Text style={{ color: "white", fontWeight: "700" }}>
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
              <View style={styles.completedView}>
                <View style={{ alignItems: "center", gap: 10 }}>
                  <Text style={styles.completed}>
                    {completedUnit.reading} {completedUnit.readingType}
                    {"  "}
                    {convertDateToDDMMYY(completedUnit.readingDate)}
                  </Text>
                </View>
                {Object.keys(completedUnit).length !== 0 && (
                  <TouchableOpacity
                    disabled={editAccess === "Pending" ? false : true}
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
                        billingId: meterCycleId,
                        date: date,
                        flag: "editing",
                        isOverRideValue: isOverRide,
                        navigatePath: "meterSection",
                      })
                    }
                  >
                    <Image
                      source={
                        editAccess === "Pending"
                          ? require("../assets/write.png")
                          : require("../assets/disableWrite.png")
                      }
                      style={{ height: 30, width: 30 }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </>
        ) : null}

        <View style={styles.info}>
          <TouchableOpacity onPress={toggleModalVisibilityInformation}>
            <Image
              source={require("../assets/infoIcon.png")}
              style={{
                height: 30,
                width: 30,
              }}
            />
          </TouchableOpacity>
          <View style={styles.pendingView}>
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
                readingStartTime();
                navigation.jumpTo("meterReadingScanner", {
                  id,
                  name,
                  lastReading,
                  lastReadingDate,
                  avgUsage,
                  totalDigit: meterMake?.totalDigit,
                  meterName: inputValuePending,
                  completed_note: dropdownNotes,
                  // billingId: billingAddress,
                  billingId: meterCycleId,
                  date: date,
                  isOverRideValue: isOverRide,
                  navigatePath: "meterSection",
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
    fontWeight: "600",
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
  upload: {
    height: 220,
    width: "100%",
    justifyContent: "space-evenly",
  },
  selectBox: {
    marginVertical: 10,
  },
  selectheading: {
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 18,
    color: "#0B9ED2",
  },
  meterMake: {
    color: "rgba(152, 152, 152, 1)",
    fontWeight: "400",
    fontSize: 18,
  },
  meternotes: { flexDirection: "row", gap: 2, alignItems: "center" },
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
  completed: {
    fontSize: 18,
    fontWeight: "500",
    color: "#197AB6",
  },
  completedView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  viewImage: {
    backgroundColor: "#197AB6",
    paddingVertical: 6,
    borderRadius: 15,
    paddingHorizontal: 16,
  },
  viewBox: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 15,
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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
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
  changeBtn: {
    width: 102,
    height: 32,
    backgroundColor: "#FF8902",
    borderRadius: 8,
    justifyContent: "center",
  },
  uploadBtn: {
    width: 102,
    height: 32,
    backgroundColor: "#FF8902",
    borderRadius: 8,
    justifyContent: "center",
  },
  uploadView: {
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  modalKeyText: {
    color: "#2198C9",
    fontWeight: "500",
    fontSize: 16,
  },
  changeBox: {
    width: "90%",
    alignItems: "flex-end",
    marginTop: 15,
  },
  modalValueText: {
    color: "#989898",
    fontWeight: "400",
    fontSize: 16,
  },
  modalContainerCG: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pendingView: {
    marginVertical: 15,
    flexDirection: "row",
    gap: 80,
    alignItems: "center",
    width: "94%",
    justifyContent: "center",
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
  info: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 35,
  },
  modalOptionText: {
    fontSize: 18,
    textAlign: "center",
  },
  loader: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(242, 242, 242, 1)",
  },
  addNotes: {
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
  submitNotesText: { color: "#fff", fontWeight: "600" },
  cross: {
    width: "90%",
    alignItems: "flex-end",
    alignSelf: "center",
  },
});
