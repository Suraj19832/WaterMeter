import React from "react";
import NavigationComponent from "./Navigation/Navigation";
import store from './redux/reduxstore';
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}> 
       <NavigationComponent />
    </Provider>
   


  );
};

export default App;