import React from 'react';

import { Button, StyleSheet, View } from 'react-native';

import {
  ProgressStepperProvider,
  ProgressStepper,
  useProgressStepperContext,
} from 'react-native-reanimated-progress-steps';

export default function App() {
  return (
    <>
      <ProgressStepperProvider>
        <ProgressStepperExample />
      </ProgressStepperProvider>
    </>
  );
}

const ProgressStepperExample = () => {
  const { goToNext, goToPrevious } = useProgressStepperContext();

  return (
    <View style={styles.container}>
      <ProgressStepper />
      <Button title="Previous" onPress={goToPrevious} />
      <Button title="Next" onPress={goToNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
});
