import React from "react";
import { View, Text, ScrollView } from "react-native";

const Dashboard = () => {
  const texts = Array.from({ length: 100 }, (_, index) => (
    <Text key={index}>Dashboard Screen</Text>
  ));

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1 }}>
        {texts}
      </View>
    </ScrollView>
  );
};

export default Dashboard;