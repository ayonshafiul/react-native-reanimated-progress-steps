import React, { useState } from 'react';

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
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <ProgressStepper />
      <Button title="Previous" onPress={goToPrevious} />
      <Button title="Next" onPress={goToNext} />
      <Button title={`${count}`} onPress={() => setCount((p) => p + 1)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
