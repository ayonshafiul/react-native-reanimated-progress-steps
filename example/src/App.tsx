import React, { useState } from 'react';

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
  const { goToNext, goToPrevious } = useProgressStepperContext();
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <ProgressStepperMultiPage />
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
