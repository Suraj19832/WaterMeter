import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import { Provider } from "react-redux";
import NavigationComponent from "./Navigation/Navigation";
import store from "./redux/reduxstore";
import { setAuthToken } from "./redux/slices/Authslice";

const App = () => {
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const getAuthToken = async () => {
      const token = await AsyncStorage.getItem("token");
      store.dispatch(setAuthToken(token));
      setloading(false);
    };

    getAuthToken();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <ToastProvider
        placement="bottom"
        offsetBottom={30}
        animationType="zoom-in"
        duration={1500}
      >
        <NavigationComponent />
      </ToastProvider>
    </Provider>
  );
};

export default App;
