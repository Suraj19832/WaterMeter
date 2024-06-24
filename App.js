import React from "react";
import NavigationComponent from "./Navigation/Navigation";
import store from "./redux/reduxstore";
import { Provider } from "react-redux";
import { ToastProvider } from "react-native-toast-notifications";

const App = () => {
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
