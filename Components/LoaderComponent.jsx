import React from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';

const LoaderComponent = ({ loading }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={loading}
      onRequestClose={() => {}} // Disable closing the modal by pressing the back button on Android
    >
      <View style={styles.modalContainer}>
        <View style={styles.blurView}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  blurView: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Low opacity background for blur effect
    borderRadius: 10,
  },
});

export default LoaderComponent;
