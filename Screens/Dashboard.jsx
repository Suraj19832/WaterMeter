import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { colorCodes } from "../ColorCodes/Colors";
import DashboardScheduledCards from "../Components/DashboardScheduledCards";
import DashboardCompletedCards from "../Components/DashboardCompletedCards";
import { useNavigation } from "@react-navigation/native";
import appApi from "../Helper/Api";
import { DoLogout } from "../Helper/Helper";

function Dashboard({ navigation }) {
  let monthArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [toggleScheduleCompleted, setToggleScheduleCompleted] = useState(false);
  const [expandSchedule, setExpandSchedule] = useState(999999999);
  const [expandCompleted, setExpandCompleted] = useState(999999999);
  const [monthIndex, setMonthIndex] = useState(5);
  const [month, setMonth] = useState(monthArr[monthIndex]);
  const [year, setYear] = useState(2024);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigation();

  const nextDate = useCallback(() => {
    if (month === "December") {
      setMonth(monthArr[0]);
      setMonthIndex(0);
      setYear(year + 1);
    } else {
      setMonth(monthArr[monthIndex + 1]);
      setMonthIndex(monthIndex + 1);
    }
  }, [month, monthArr, monthIndex, year]);

  const previous = useCallback(() => {
    if (month === "January") {
      setMonth(monthArr[11]);
      setMonthIndex(11);
      setYear(year - 1);
    } else {
      setMonth(monthArr[monthIndex - 1]);
      setMonthIndex(monthIndex - 1);
    }
  }, [month, monthArr, monthIndex, year]);

  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    const params = {
      status: !toggleScheduleCompleted ? "scheduled" : "completed",
      date: `${year}-${String(monthIndex + 1).padStart(2, "0")}-01`,
    };
    appApi
      .dashboard(params)
      .then((res) => {
        setData(res?.data);
        setLoading(false);
        console.log(res.data, "<<<<<<<<<<<<<<<<<<<<???????????????");
      })
      .catch((err) => {
        console.error(err, "<<<<<<<<<<<<<<<<<error");
        setLoading(false);
      });
  }, [toggleScheduleCompleted, monthIndex, year]); // Add toggleScheduleCompleted to the dependency array

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topToggle}>
        <TouchableOpacity
          onPress={() => setToggleScheduleCompleted(false)}
          style={[
            styles.scheduleBtn,
            {
              backgroundColor: toggleScheduleCompleted
                ? "white"
                : colorCodes.tealColorTheme,
              borderWidth: toggleScheduleCompleted ? 1.5 : 0,
            },
          ]}
        >
          <Text
            style={[
              styles.ScheduleText,
              {
                color: toggleScheduleCompleted
                  ? colorCodes.tealColorTheme
                  : "white",
              },
            ]}
          >
            Scheduled-To do
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setToggleScheduleCompleted(true)}
          style={[
            styles.completedBtn,
            {
              borderWidth: !toggleScheduleCompleted ? 1.5 : 0,
              backgroundColor: !toggleScheduleCompleted
                ? "white"
                : colorCodes.tealColorTheme,
            },
          ]}
        >
          <Text
            style={[
              styles.completeText,
              {
                color: !toggleScheduleCompleted
                  ? colorCodes.tealColorTheme
                  : "white",
              },
            ]}
          >
            Completed Visits
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.prevNextMain}>
        <TouchableOpacity onPress={previous} style={styles.prevBtn}>
          <AntDesign name="left" size={15} color="#104F9C" />
          <Text style={styles.prevNextTxt}>Prev</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigate.openDrawer()}
          style={styles.dateView}
        >
          <Text style={styles.dateTxt}>
            {month} {year}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={nextDate} style={styles.prevBtn}>
          <Text style={styles.prevNextTxt}>Next</Text>
          <AntDesign name="right" size={15} color="#104F9C" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colorCodes.tealColorTheme}
            style={{ marginTop: 200 }}
          />
        ) : toggleScheduleCompleted ? (
          <View>
            {data.length === 0 ? (
              <Text style={styles.noDataText}>No completed visits</Text>
            ) : (
              data.map((items, index) => (
                <View key={index}>
                  <DashboardCompletedCards
                    expandCompleted={expandCompleted}
                    onPress={setExpandCompleted}
                    index={index}
                    items={items}
                  />
                </View>
              ))
            )}
          </View>
        ) : (
          <View>
            {data.length === 0 ? (
              <Text style={styles.noDataText}>No scheduled visits</Text>
            ) : (
              data.map((items, index) => (
                <View key={index}>
                  <DashboardScheduledCards
                    expandSchedule={expandSchedule}
                    onPress={setExpandSchedule}
                    index={index}
                    items={items}
                    navigation={navigation}
                  />
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
export default Dashboard;
const styles = StyleSheet.create({
  container: {
    // backgroundColor: colorCodes.white,
    paddingHorizontal: 20,
  },
  noDataText: {
    alignSelf: "center",
    marginTop: 200,
    fontWeight: "600",
    fontSize: 24,
    color: colorCodes.heading,
  },
  topToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  scheduleBtn: {
    borderColor: colorCodes.heading,
    paddingVertical: 17,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  ScheduleText: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 16,
  },
  completedBtn: {
    borderColor: colorCodes.heading,
    paddingVertical: 17,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  completeText: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 16,
  },
  prevNextMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  prevBtn: {
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: colorCodes.buttonBorder,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  dateView: {
    borderRadius: 10,
    backgroundColor: colorCodes.navyBlueButton,
    width: 150,
    paddingVertical: 11.5,
    alignItems: "center",
  },
  prevNextTxt: {
    color: "#104F9C",
    fontSize: 16,
    fontWeight: "500",
    paddingBottom: 2,
  },
  dateTxt: {
    fontWeight: "600",
    alignItems: "center",
    fontSize: 16,
    color: colorCodes.white,
  },
  propertyCards: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colorCodes.borderColor,
    marginBottom: 20,
  },
  cardsMain: {
    width: "90%",
    margin: "auto",
  },
  cardContentTop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
    alignItems: "center",
    marginTop: 15,
  },
  topFirst: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  propertyTxt: {
    fontSize: 15,
    height: 30,
    color: colorCodes.yaleBlue,
    fontWeight: "500",
  },
  scrollView: {
    marginTop: 25,
    marginBottom: 140,
  },
  besidePropertyTxt: {
    fontSize: 15,
    height: 30,
    fontWeight: "500",
    color: colorCodes.lightGray,
  },
  contentDateTxt: {
    fontSize: 12,
    height: 25,
    fontWeight: "500",
    color: colorCodes.secondaryLightGray,
  },
  belowContentMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 45,
    marginTop: 10,
    marginBottom: 15,
  },
  belowFirst: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  status: {
    height: 30,
    width: 80,
    borderRadius: 100,
    backgroundColor: colorCodes.navyBlueButton,
  },
  statusTxt: {
    color: colorCodes.white,
    textAlign: "center",
    paddingTop: 4,
    height: 30,
  },
  daysTxt: {
    color: colorCodes.statusPast,
    height: 20,
    fontWeight: "500",
  },
  belowContentMainNotPast: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 130,
    marginTop: 8,
    marginBottom: 15,
  },
  belowSecond: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
  },
  expandBtn: {
    borderWidth: 0.5,
    height: 25,
    width: 25,
    borderRadius: 100,
    borderColor: colorCodes.expandBorder,
    shadowColor: "black",
  },
  image: {
    width: 23,
    height: 23,
  },
  expandContent: {
    height: 225,
    // width: "90%",

    margin: "auto",
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: "#e7e7e7",
  },
  expandContentHeading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  expandHeadingFTxt: {
    color: colorCodes.yaleBlue,
    fontWeight: "500",
    fontSize: 16,
    paddingLeft: 10,
    paddingTop: 15,
    height: 45,
  },
  expandHeadingSTxt: {
    fontWeight: "500",
    fontSize: 16,
    paddingLeft: 10,
    paddingTop: 15,
    height: 45,
  },
  expandContentFTxt: {
    color: "#0099ff",
    fontWeight: "400",
    fontSize: 14,
    height: 30,
    paddingLeft: 10,
  },
  expandContentSTxt: {
    color: "grey",
    fontWeight: "400",
    fontSize: 14,
    height: 30,
    paddingLeft: 10,
  },
  expandContentButton: {
    height: 37,
    width: 110,
    borderRadius: 10,
    backgroundColor: colorCodes.submitButtonEnabled,
    marginLeft: 20,
  },
  completedNextDate: {
    color: "#0099ff",
    fontWeight: "400",
    fontSize: 14,
    height: 20,
  },
  belowContentCompleted: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 90,
    marginTop: 8,
    marginBottom: 15,
  },
  expandContentCompletedButton: {
    height: 37,
    width: 150,
    borderRadius: 10,
    backgroundColor: colorCodes.submitButtonEnabled,
    marginLeft: 155,
  },
  expandContentCompleted: {
    height: 255,
    // width: "90%",
    margin: "auto",
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: "#e7e7e7",
  },
});

let cardsArr = [
  {
    property: "XXX",
    name: "Krupa",
    date: "Sat May 25th, 2024",
    status: "Past Due",
    no_of_days: "22 days",
    meters: 18,
    address: "Joggo Condos Karen Rd ",
    totalMeters: 15,
    totalMetersPending: 10,
    nextReadingDate: "Thu Jun 6th, 2024 ",
    lastReadingDate: "Sun May 10th, 2024 ",
    estimateTime: "2hr 32mins",
    colorCode: "#C53636",
    dateCompleted: "Fri May 10th, 2024",
    taskCompletedIn: "1hr 22 mins",
    nameBelow: "Koushik",
  },
  {
    property: "XXX",
    name: "Krupa",
    date: "Sat May 25th, 2024",
    status: "Past Due",
    no_of_days: "22 days",
    meters: 18,
    address: "Joggo Condos Karen Rd ",
    totalMeters: 15,
    totalMetersPending: 10,
    nextReadingDate: "Thu Jun 6th, 2024 ",
    lastReadingDate: "Sun May 10th, 2024 ",
    estimateTime: "2hr 32mins",
    colorCode: "#C53636",
    dateCompleted: "Fri May 10th, 2024",
    taskCompletedIn: "1hr 22 mins",
    nameBelow: "Koushik",
  },
  {
    property: "XXX",
    name: "Krupa",
    date: "Sat May 25th, 2024",
    status: "In Process",
    no_of_days: "22 days",
    meters: 18,
    address: "Joggo Condos Karen Rd ",
    totalMeters: 15,
    totalMetersPending: 10,
    nextReadingDate: "Thu Jun 6th, 2024 ",
    lastReadingDate: "Sun May 10th, 2024 ",
    estimateTime: "2hr 32mins",
    colorCode: "#104F9C",
    dateCompleted: "Fri May 10th, 2024",
    taskCompletedIn: "1hr 22 mins",
    nameBelow: "Koushik",
  },
  {
    property: "XXX",
    name: "Krupa",
    date: "Sat May 25th, 2024",
    status: "In Process",
    no_of_days: 22,
    meters: 18,
    address: "Joggo Condos Karen Rd ",
    totalMeters: 15,
    totalMetersPending: 10,
    nextReadingDate: "Thu Jun 6th, 2024 ",
    lastReadingDate: "Sun May 10th, 2024 ",
    estimateTime: "2hr 32mins",
    colorCode: "#104F9C",
    dateCompleted: "Fri May 10th, 2024",
    taskCompletedIn: "1hr 22 mins",
    nameBelow: "Koushik",
  },
  {
    property: "XXX",
    name: "Krupa",
    date: "Sat May 25th, 2024",
    status: "Today",
    no_of_days: 22,
    meters: 18,
    address: "Joggo Condos Karen Rd ",
    totalMeters: 15,
    totalMetersPending: 10,
    nextReadingDate: "Thu Jun 6th, 2024 ",
    lastReadingDate: "Sun May 10th, 2024 ",
    estimateTime: "2hr 32mins",
    colorCode: "#FFB604",
    dateCompleted: "Fri May 10th, 2024",
    taskCompletedIn: "1hr 22 mins",
    nameBelow: "Koushik",
  },
  {
    property: "XXX",
    name: "Krupa",
    date: "Sat May 25th, 2024",
    status: "Today",
    no_of_days: 22,
    meters: 18,
    address: "Joggo Condos Karen Rd ",
    totalMeters: 15,
    totalMetersPending: 10,
    nextReadingDate: "Thu Jun 6th, 2024 ",
    lastReadingDate: "Sun May 10th, 2024 ",
    estimateTime: "2hr 32mins",
    colorCode: "#FFB604",
    dateCompleted: "Fri May 10th, 2024",
    taskCompletedIn: "1hr 22 mins",
    nameBelow: "Koushik",
  },
  {
    property: "XXX",
    name: "Krupa",
    date: "Sat May 25th, 2024",
    status: "Today",
    no_of_days: 22,
    meters: 18,
    address: "Joggo Condos Karen Rd ",
    totalMeters: 15,
    totalMetersPending: 10,
    nextReadingDate: "Thu Jun 6th, 2024 ",
    lastReadingDate: "Sun May 10th, 2024 ",
    estimateTime: "2hr 32mins",
    colorCode: "#FFB604",
    dateCompleted: "Fri May 10th, 2024",
    taskCompletedIn: "1hr 22 mins",
    nameBelow: "Koushik",
  },
  {
    property: "XXX",
    name: "Krupa",
    date: "Sat May 25th, 2024",
    status: "Today",
    no_of_days: 22,
    meters: 18,
    address: "Joggo Condos Karen Rd ",
    totalMeters: 15,
    totalMetersPending: 10,
    nextReadingDate: "Thu Jun 6th, 2024 ",
    lastReadingDate: "Sun May 10th, 2024 ",
    estimateTime: "2hr 32mins",
    colorCode: "#FFB604",
    dateCompleted: "Fri May 10th, 2024",
    taskCompletedIn: "1hr 22 mins",
    nameBelow: "Koushik",
  },
];
