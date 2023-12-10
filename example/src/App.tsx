import React from 'react';

import { StyleSheet, View } from 'react-native';

import { ProgressStepper } from 'react-native-reanimated-progress-steps';

export default function App() {
  return (
    <View style={styles.container}>
      <ProgressStepper prevPosition={0} currentPosition={3} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
