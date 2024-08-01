import React from "react";
import { View, Text } from "react-native";

function MeterSelection (){
    return (
      <View style={{backgroundColor:'#fff',display:'flex',height:'100%'}}>
          <Text>MeterSelection Screen</Text>
           {/* {meterValue
              ? otp?.map((totalDigit, index) => {
                  return (
                    <TextInput
                      key={index}
                      style={styles.otpBox}
                      keyboardType="numeric"
                      maxLength={1}
                      onChangeText={(value) => handleOTPChange(index, value)}
                      value={totalDigit}
                      ref={otpFields?.current[index]}
                    />
                  );
                })
              : meterReading?.split("")?.map((digit, index) => {
                  return (
                    <TextInput
                      key={index}
                      style={styles.otpBox}
                      keyboardType="numeric"
                      maxLength={1}
                      value={digit}
                      onChangeText={(value) => handleOTPChange(index, value)}
                    />
                  );
                })} */}
        </View>
      );
    };

export default MeterSelection;