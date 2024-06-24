import React, {  useRef, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const InputField = (props) => {
  // const [currentPassword, setCurrentPassword] = useState("");

  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const animatedPlaceholderPosition = useRef(
    new Animated.Value(isFocused || props.value ? -6 : 16)
  ).current;

  const handleFocus = () => {
    setIsFocused(true);
    animatePlaceholder(-6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!props.value) {
      animatePlaceholder(16);
    }
  };

  console.log("66666666666", props.value, props.setValue);

  const animatePlaceholder = (topValue) => {
    Animated.timing(animatedPlaceholderPosition, {
      toValue: topValue,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };
  return (
    <View style={[styles.input, isFocused && styles.inputFocused]}>
      <Animated.Text
        style={[
          styles.placeholder,
          { top: animatedPlaceholderPosition },
          (isFocused || props.value) && styles.placeholderFocused,
        ]}
      >
        {isFocused || props.value ? props.placeholderValue : ""}
      </Animated.Text>
      <TextInput
        placeholder={!isFocused && !props.value ? props.placeholderValue : ""}
        placeholderTextColor="#656263"
        style={[styles.inputfield, isFocused && styles.inputfieldFocused]}
        secureTextEntry={!showCurrentPass} // Assuming you want secure entry by default
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={(text) => props.setValue(text)}
        value={props.value}
      />
      <TouchableOpacity
        onPress={() => setShowCurrentPass(!showCurrentPass)}
        style={styles.eyeIcon}
      >
        {showCurrentPass ? (
          <Feather name="eye" size={18} color="#656263" />
        ) : (
          <MaterialCommunityIcons
            name="eye-off-outline"
            size={18}
            color="#656263"
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#2198C9",
    paddingVertical: 13,
    marginVertical: 10,
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 17,
    position: "relative", // Ensure relative positioning for absolute children
  },

  inputfield: {
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16.41,
    width: "90%",
    color: "#000",
  },
  inputfieldFocused: {
    fontSize: 12, // Adjust font size when focused
    color: "#333", // Change text color when focused
  },
  placeholder: {
    position: "absolute",
    left: 17,
    color: "#656263",
    fontSize: 14,
    zIndex: 1,
  },
  placeholderFocused: {
    top: -10, // Move placeholder up when focused
    fontSize: 12, // Adjust font size when focused
    color: "#A6A6A6",
    backgroundColor: "#f3f1f1",
    // backgroundColor:"rgb(243,241,239)"
  },
  // efeded
  eyeIcon: {
    position: "absolute",
    right: 17,
  },
});
