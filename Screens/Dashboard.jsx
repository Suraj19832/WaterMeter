import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign, FontAwesome } from '@expo/vector-icons';



function Dashboard({navigation}) {

    let monthArr = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];


    const [toggleScheduleCompleted, setToggleScheduleCompleted] = useState(false);
    const [expandSchedule, setExpandSchedule] = useState(999999999);
    const [expandCompleted,setExpandCompleted] = useState(999999999);
    const [monthIndex, setMonthIndex] = useState(7);
    const [month, setMonth] = useState(monthArr[monthIndex]);
    const [year, setYear] = useState(2024);



    const nextDate = () => {
        if (month == "December") {
            setMonth(monthArr[0]);
            setMonthIndex(0);
            setYear(year + 1);
        }
        else {
            setMonth(monthArr[monthIndex + 1]);
            setMonthIndex(monthIndex + 1);
        }

    }

    const previous = () => {
        if (month == "January") {
            setMonth(monthArr[11]);
            setMonthIndex(11);
            setYear(year - 1);
        }
        else {
            setMonth(monthArr[monthIndex - 1]);
            setMonthIndex(monthIndex - 1);
        }
    }

    const styles = StyleSheet.create({
        topToggle: {
            height: 50,
            width: "90%",
            margin: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20

        },
        scheduleBtn: {
            backgroundColor: toggleScheduleCompleted ? "#F6F6F6" : "#5EC2C6",
            height: 45,
            width: "46%",
            borderRadius: 10,
            borderWidth: toggleScheduleCompleted ? 1.5 : 0,
            borderColor: "#5EC2C6"


        },
        completedBtn: {
            height: 45,
            width: "46%",
            borderRadius: 10,
            borderWidth: !toggleScheduleCompleted ? 1.5 : 0,
            borderColor: "#5EC2C6",
            backgroundColor: !toggleScheduleCompleted ? "#F6F6F6" : "#5EC2C6"
        },
        ScheduleText: {
            color: toggleScheduleCompleted ? "#5EC2C6" : "white",
            textAlign: "center",
            fontSize: 15,
            paddingTop: 10
        },
        completeText: {
            color: !toggleScheduleCompleted ? "#5EC2C6" : "white",
            textAlign: "center",
            fontSize: 15,
            paddingTop: 10,
            height: 40
        },
        prevNextMain: {
            height: 50,
            width: "90%",
            margin: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10
        },
        prevBtn: {
            borderWidth: 1.5,
            height: 45,
            width: "24%",
            borderRadius: 10,
            borderColor: "#FF6900",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
        },
        dateView: {
            height: 45,
            width: "46%",
            borderRadius: 10,
            backgroundColor: "#104F9C",
            color: "white"

        },
        prevNextTxt: {
            color: "#104F9C",
            fontSize: 16,
            textAlign: "center",
            paddingBottom: 5,
            paddingRight: 4,
            fontWeight: "500"
        },
        dateTxt: {
            color: "white",
            textAlign: "center",
            fontSize: 17,
            paddingTop: 8,
            height: 40,
        },
        propertyCards: {
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#2198C9",
            marginBottom: 20

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
            fontWeight: "500"

        },
        scrollView: {
            marginTop: 35,
        },
        besidePropertyTxt: {
            fontSize: 15,
            height: 30,
            fontWeight: "500",
            color: "#595959"

        },
        contentDateTxt: {
            fontSize: 12,
            height: 25,
            fontWeight: "500",
            color: "#989898"

        },
        belowContentMain: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 45,
            marginTop: 10,
            marginBottom: 15

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
            backgroundColor: "#C53636"

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
            fontWeight: "500"

        },
        belowContentMainNotPast: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 130,
            marginTop: 8,
            marginBottom: 15
        },
        belowSecond: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 15

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
            height: 23
        },
        expandContent: {
            height: 225,
            width: "90%",

            margin: "auto",
            marginBottom: 20,
            borderRadius: 15,
            backgroundColor: "#e7e7e7"

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
            height: 45
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
            paddingLeft: 10
        },
        expandContentSTxt: {
            color: "grey",
            fontWeight: "400",
            fontSize: 14,
            height: 30,
            paddingLeft: 10
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
            marginBottom: 15
        },
        expandContentCompletedButton:{
            height: 37,
            width: 150,
            borderRadius: 10,
            backgroundColor: "#FF8902",
            marginLeft: 155,
        },
        expandContentCompleted:{
            height: 255,
            width: "90%",
            margin: "auto",
            marginBottom: 20,
            borderRadius: 15,
            backgroundColor: "#e7e7e7"
        }


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
            dateCompleted:"Fri May 10th, 2024",
            taskCompletedIn:"1hr 22 mins",
            nameBelow:"Koushik",
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
            dateCompleted:"Fri May 10th, 2024",
            taskCompletedIn:"1hr 22 mins",
            nameBelow:"Koushik",
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
            dateCompleted:"Fri May 10th, 2024",
            taskCompletedIn:"1hr 22 mins",
            nameBelow:"Koushik",
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
            dateCompleted:"Fri May 10th, 2024",
            taskCompletedIn:"1hr 22 mins",
            nameBelow:"Koushik",

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
            dateCompleted:"Fri May 10th, 2024",
            taskCompletedIn:"1hr 22 mins",
            nameBelow:"Koushik",

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
            dateCompleted:"Fri May 10th, 2024",
            taskCompletedIn:"1hr 22 mins",
            nameBelow:"Koushik",

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
            dateCompleted:"Fri May 10th, 2024",
            taskCompletedIn:"1hr 22 mins",
            nameBelow:"Koushik",

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
            dateCompleted:"Fri May 10th, 2024",
            taskCompletedIn:"1hr 22 mins",
            nameBelow:"Koushik",

        }
    ];





    return (
        <SafeAreaView>

            <View style={styles.topToggle} >
                <TouchableOpacity onPress={() => setToggleScheduleCompleted(false)} style={styles.scheduleBtn} >
                    <Text style={styles.ScheduleText} >
                        Scheduled-To do
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => setToggleScheduleCompleted(true)} style={styles.completedBtn} >
                    <Text style={styles.completeText} >
                        Completed Visits
                    </Text>

                </TouchableOpacity>

            </View>


            <View style={styles.prevNextMain} >
                <TouchableOpacity onPress={previous} style={styles.prevBtn} >
                    <AntDesign name="left" size={15} color="#104F9C" />
                    <Text style={styles.prevNextTxt} >
                        Prev
                    </Text>


                </TouchableOpacity>

                <View style={styles.dateView} >
                    <Text style={styles.dateTxt} >
                        {month} {" "} {year}
                    </Text>

                </View>

                <TouchableOpacity onPress={nextDate} style={styles.prevBtn} >
                    <Text style={styles.prevNextTxt} >
                        Next
                    </Text>
                    <AntDesign name="right" size={15} color="#104F9C" />

                </TouchableOpacity>

            </View>

            <TouchableOpacity onPress={()=>navigation.navigate("MeterScreen")} style={{margin:"auto",marginBottom:20}} >
                <Text>
                    Go to meter section
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate("Login")} style={{margin:"auto",}} >
                <Text>
                    Go to Login
                </Text>
            </TouchableOpacity>


         
            <ScrollView style={styles.scrollView} >
                {toggleScheduleCompleted ?   <View style={styles.cardsMain}>
                    {Array.isArray(cardsArr) && cardsArr?.map((items, index) => {
                        return (
                            <View key={index} style={styles.propertyCards}>
                                <View style={styles.cardContentTop} >
                                    <View style={styles.topFirst} >
                                        <Text style={styles.propertyTxt} >
                                            Property
                                        </Text>
                                        <Text style={styles.besidePropertyTxt}>
                                            : {items?.property} {"  |  "} {items?.name}
                                        </Text>

                                    </View>

                                    <View>
                                        <Text style={styles.contentDateTxt} >
                                            {items?.date}
                                        </Text>

                                    </View>

                                </View>


                                <View style={styles.belowContentCompleted}  >

                                    {index == expandCompleted ? <View >
                                        <Text style={styles.completedNextDate}>
                                            {"                                                      "}
                                        </Text>
                                        <Text style={[styles.completedNextDate, { color: "#989898" }]}>
                                            {"                                                   "}
                                        </Text>



                                    </View> : <View >
                                        <Text style={styles.completedNextDate}>
                                            Next Reading Date :
                                        </Text>
                                        <Text style={[styles.completedNextDate, { color: "#989898" }]}>
                                            {items?.nextReadingDate}
                                        </Text>



                                    </View>}



                                    <View style={styles.belowSecond} >
                                        <Text style={{ fontWeight: 500 }}>
                                            {items?.meters} meters
                                        </Text>
                                        <TouchableOpacity onPress={() => {
                                            if (expandCompleted == index) {
                                                setExpandCompleted(null);
                                            }
                                            else {
                                                setExpandCompleted(index)
                                            }
                                        }} style={styles.expandBtn} >
                                            {index == expandCompleted ? <FontAwesome style={{ marginLeft: 5.6, marginTop: 0 }} name="angle-up" size={20} color="#FE8700" /> : <FontAwesome style={{ marginLeft: 5.6, marginTop: 2 }} name="angle-down" size={20} color="#FE8700" />}

                                        </TouchableOpacity>

                                    </View>

                                </View>

                                {index == expandCompleted ? <View style={styles.expandContentCompleted} >
                                    <View style={styles.expandContentHeading} >
                                        <Text style={styles.expandHeadingFTxt} >
                                            Address :
                                        </Text>
                                        <Text style={styles.expandHeadingSTxt} >
                                            {items?.address}
                                        </Text>

                                    </View>
                                    <View style={styles.expandContentHeading}>
                                        <Text style={styles.expandContentFTxt} >
                                            Total Meters :
                                        </Text>

                                        <Text style={styles.expandContentSTxt}>
                                            {items?.totalMeters}
                                        </Text>

                                    </View>

                                    <View style={styles.expandContentHeading}>
                                        <Text style={styles.expandContentFTxt} >
                                           Date Completed :
                                        </Text>

                                        <Text style={styles.expandContentSTxt}>
                                            {items?.dateCompleted}
                                        </Text>

                                    </View>

                                    <View style={styles.expandContentHeading}>
                                        <Text style={styles.expandContentFTxt} >
                                            Task Completed In :
                                        </Text>

                                        <Text style={styles.expandContentSTxt}>
                                            {items?.taskCompletedIn}
                                        </Text>

                                    </View>

                                    <View style={styles.expandContentHeading}>
                                        <Text style={styles.expandContentFTxt} >
                                            Next Reading Date :
                                        </Text>

                                        <Text style={styles.expandContentSTxt}>
                                            {items?.nextReadingDate}
                                        </Text>

                                    </View>
                                    <View style={styles.expandContentHeading}>
                                        <Text style={styles.expandContentFTxt} >
                                            Name :
                                        </Text>

                                        <Text style={styles.expandContentSTxt}>
                                            {items?.nameBelow}
                                        </Text>

                                    </View>

                                    <View style={[styles.expandContentHeading, { marginTop: 10 }]}>
                                       
                                        <TouchableOpacity onPress={() => { alert("Reading...") }} style={styles.expandContentCompletedButton} >
                                            <Text style={{ color: "white", height: 30, textAlign: "center", paddingTop: 8 }} >
                                                Completion Summary
                                            </Text>

                                        </TouchableOpacity>

                                    </View>

                                </View> : null}



                            </View>
                        )
                    })}


                </View> : <View style={styles.cardsMain} >
                    {Array.isArray(cardsArr) && cardsArr?.map((items, index) => {


                        return (
                            <View key={index} style={styles.propertyCards}>
                                <View style={styles.cardContentTop} >
                                    <View style={styles.topFirst} >
                                        <Text style={styles.propertyTxt} >
                                            Property
                                        </Text>
                                        <Text style={styles.besidePropertyTxt}>
                                            : {items?.property} {"  |  "} {items?.name}
                                        </Text>

                                    </View>

                                    <View>
                                        <Text style={styles.contentDateTxt} >
                                            {items?.date}
                                        </Text>

                                    </View>

                                </View>

                                {items?.status == "Past Due" ? <View style={styles.belowContentMain}  >

                                    <View style={styles.belowFirst}>
                                        <View style={[styles.status, { backgroundColor: items?.colorCode }]} >
                                            <Text style={styles.statusTxt}>
                                                {items?.status}
                                            </Text>
                                        </View>
                                        <Text style={styles.daysTxt} >
                                            {items?.no_of_days}
                                        </Text>
                                        <TouchableOpacity onPress={() => { alert("Image pressed") }}>
                                            <ImageBackground source={require('../assets/Background 1.png')}
                                                resizeMode="cover"
                                                style={styles.image} >

                                            </ImageBackground>
                                        </TouchableOpacity>



                                    </View>


                                    <View style={styles.belowSecond} >
                                        <Text style={{ fontWeight: 500 }}>
                                            {items?.meters} meters
                                        </Text>
                                        <TouchableOpacity onPress={() => {
                                            if (expandSchedule == index) {
                                                setExpandSchedule(null);
                                            }
                                            else {
                                                setExpandSchedule(index)
                                            }
                                        }} style={styles.expandBtn} >
                                            {index == expandSchedule ? <FontAwesome style={{ marginLeft: 5.6, marginTop: 0 }} name="angle-up" size={20} color="#FE8700" /> : <FontAwesome style={{ marginLeft: 5.6, marginTop: 2 }} name="angle-down" size={20} color="#FE8700" />}

                                        </TouchableOpacity>

                                    </View>

                                </View> : <View style={styles.belowContentMainNotPast}  >


                                    <View style={[styles.status, { backgroundColor: items?.colorCode }]} >
                                        <Text style={styles.statusTxt}>
                                            {items?.status}
                                        </Text>



                                    </View>


                                    <View style={styles.belowSecond} >
                                        <Text style={{ fontWeight: 500 }}>
                                            {items?.meters} meters
                                        </Text>
                                        <TouchableOpacity onPress={() => {
                                            if (expandSchedule == index) {
                                                setExpandSchedule(null);
                                            }
                                            else {
                                                setExpandSchedule(index)
                                            }
                                        }} style={styles.expandBtn} >
                                            {index == expandSchedule ? <FontAwesome style={{ marginLeft: 5.6, marginTop: 0 }} name="angle-up" size={20} color="#FE8700" /> : <FontAwesome style={{ marginLeft: 5.6, marginTop: 2 }} name="angle-down" size={20} color="#FE8700" />}

                                        </TouchableOpacity>

                                    </View>

                                </View>}

                                {index == expandSchedule ? <View style={styles.expandContent} >
                                    <View style={styles.expandContentHeading} >
                                        <Text style={styles.expandHeadingFTxt} >
                                            Address :
                                        </Text>
                                        <Text style={styles.expandHeadingSTxt} >
                                            {items?.address}
                                        </Text>

                                    </View>
                                    <View style={styles.expandContentHeading}>
                                        <Text style={styles.expandContentFTxt} >
                                            Total Meters :
                                        </Text>

                                        <Text style={styles.expandContentSTxt}>
                                            {items?.totalMeters}
                                        </Text>

                                    </View>

                                    <View style={styles.expandContentHeading}>
                                        <Text style={styles.expandContentFTxt} >
                                            Total Meters Pending :
                                        </Text>

                                        <Text style={styles.expandContentSTxt}>
                                            {items?.totalMetersPending}
                                        </Text>

                                    </View>

                                    <View style={styles.expandContentHeading}>
                                        <Text style={styles.expandContentFTxt} >
                                            Next Reading Date :
                                        </Text>

                                        <Text style={styles.expandContentSTxt}>
                                            {items?.nextReadingDate}
                                        </Text>

                                    </View>

                                    <View style={styles.expandContentHeading}>
                                        <Text style={styles.expandContentFTxt} >
                                            Last Reading Date :
                                        </Text>

                                        <Text style={styles.expandContentSTxt}>
                                            {items?.lastReadingDate}
                                        </Text>

                                    </View>

                                    <View style={[styles.expandContentHeading, { marginTop: 10 }]}>
                                        <Text style={styles.expandContentFTxt} >
                                            Estimate Time :
                                        </Text>

                                        <Text style={styles.expandContentSTxt}>
                                            {items?.estimateTime}
                                        </Text>
                                        <TouchableOpacity onPress={() => { alert("Reading...") }} style={styles.expandContentButton} >
                                            <Text style={{ color: "white", height: 30, textAlign: "center", paddingTop: 8 }} >
                                                Start Reading
                                            </Text>

                                        </TouchableOpacity>

                                    </View>

                                </View> : null}



                            </View>
                        )
                    })}

                </View>}



            </ScrollView>
          
        </SafeAreaView>
    )
}




export default Dashboard;