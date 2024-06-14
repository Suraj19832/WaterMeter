import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { colorCodes } from "../ColorCodes/Colors";
import DashboardScheduledCards from "../Components/DashboardScheduledCards";
import DashboardCompletedCards from "../Components/DashboardCompletedCards";
import { useNavigation } from "@react-navigation/native";

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
  const [monthIndex, setMonthIndex] = useState(7);
  const [month, setMonth] = useState(monthArr[monthIndex]);
  const [year, setYear] = useState(2024);
  const navigate = useNavigation();

  const nextDate = () => {
    if (month == "December") {
      setMonth(monthArr[0]);
      setMonthIndex(0);
      setYear(year + 1);
    } else {
      setMonth(monthArr[monthIndex + 1]);
      setMonthIndex(monthIndex + 1);
    }
  };

  const previous = () => {
    if (month == "January") {
      setMonth(monthArr[11]);
      setMonthIndex(11);
      setYear(year - 1);
    } else {
      setMonth(monthArr[monthIndex - 1]);
      setMonthIndex(monthIndex - 1);
    }
  };

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

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://api.npoint.io/ba03259b798d2fc750d5")
      .then((res) => res.json())
      .then((res) => {
        console.log(res?.data);
        setData(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "white", paddingHorizontal: 20 }}>
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
        {toggleScheduleCompleted ? (
          <View>
            {Array.isArray(cardsArr) &&
              cardsArr?.map((items, index) => {
                return (
                  <View key={index} style={{}}>
                    <DashboardCompletedCards
                      expandCompleted={expandCompleted}
                      onPress={setExpandCompleted}
                      index={index}
                      items={items}
                    />
                  </View>
                );
              })}
          </View>
        ) : (
          <View>
            {Array.isArray(data) &&
              data?.map((items, index) => {
                return (
                  <View key={index}>
                    <DashboardScheduledCards
                      expandSchedule={expandSchedule}
                      onPress={setExpandSchedule}
                      index={index}
                      items={items}
                      navigation={navigation}
                    />
                  </View>
                );
              })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
export default Dashboard;
const styles = StyleSheet.create({
  topToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  scheduleBtn: {
    borderColor: "#5EC2C6",
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
    borderColor: "#5EC2C6",
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
    borderColor: "#FF6900",
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
    paddingVertical: 14,
    paddingHorizontal: 20,
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
    lineHeight: 16,
    color: "#fff",
  },
  propertyCards: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#2198C9",
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
    color: "#104F9C",
    fontWeight: "500",
  },
  scrollView: {
    marginTop: 25,
  },
  besidePropertyTxt: {
    fontSize: 15,
    height: 30,
    fontWeight: "500",
    color: "#595959",
  },
  contentDateTxt: {
    fontSize: 12,
    height: 25,
    fontWeight: "500",
    color: "#989898",
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
    color: "white",
    textAlign: "center",
    paddingTop: 4,
    height: 30,
  },
  daysTxt: {
    color: "#C53636",
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
    borderColor: "#FE8700",
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
    color: "#104F9C",
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
    backgroundColor: "#FF8902",
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
    backgroundColor: "#FF8902",
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
