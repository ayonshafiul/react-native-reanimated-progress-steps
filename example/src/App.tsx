import React from 'react';

import { Button, StyleSheet, View } from 'react-native';

import {
  ProgressStepperContextProvider,
  ProgressStepperMultiPage,
  useProgressStepperContext,
} from 'react-native-reanimated-progress-steps';

export default function App() {
  return (
    <ProgressStepperContextProvider>
      <ProgressStepperExample />
    </ProgressStepperContextProvider>
  );
}

const ProgressStepperExample = () => {
  const { currentPosition, goToNext, goToPrevious } =
    useProgressStepperContext();
  return (
    <View style={styles.container}>
      <ProgressStepperMultiPage currentPosition={currentPosition} />
      <Button title="Previous" onPress={goToPrevious} />
      <Button title="Next" onPress={goToNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
