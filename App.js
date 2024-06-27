import React, { useEffect } from "react";
import NavigationComponent from "./Navigation/Navigation";
import store from "./redux/reduxstore";
import { Provider, useDispatch } from "react-redux";
import { ToastProvider } from "react-native-toast-notifications";
import { setAuthToken } from "./redux/slices/Authslice";
import AsyncStorage from "@react-native-async-storage/async-storage";


// const AppInner = () => { 
//   const dispatch = useDispatch();

//   useEffect(() => {
  
//     const getAuthToken = async () => {
//       const token = await AsyncStorage.getItem('token');
 
//       // console.log(token ,"ccc")
//       dispatch(setAuthToken(token));
//     };

//     getAuthToken();
//   }, []);
 
//   return <NavigationComponent />;
// };

const App = () => {
  useEffect(() => {
  
    const getAuthToken = async () => {
      const token = await AsyncStorage.getItem('token');
      store.dispatch(setAuthToken(token));
    };

    getAuthToken();
  }, []);
 
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
