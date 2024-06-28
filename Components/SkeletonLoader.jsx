import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const SkeletonLoader = () => {
  const animatedValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e1e9ee', '#f2f8fc'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.skeletonBox, { backgroundColor }]} />
      <Animated.View style={[styles.skeletonBox, { backgroundColor, width: '60%' }]} />
      <Animated.View style={[styles.skeletonBox, { backgroundColor, width: '90%' }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  skeletonBox: {
    width: '100%',
    height: 20,
    marginVertical: 10,
    borderRadius: 4,
  },
});

export default SkeletonLoader;
