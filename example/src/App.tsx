import React from 'react';
import {
  View,
  StyleSheet,
  Button,
  // ScrollView,
  // Text,
  // Dimensions,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import {
//   // createNativeStackNavigator,
//   type NativeStackScreenProps,
// } from '@react-navigation/native-stack';
import {
  ProgressStepperVertical,
  ProgressStepperVerticalProvider,
  // ProgressStepper,
  useProgressStepperVerticalContext,
} from 'react-native-reanimated-progress-steps';
// import useFocusedPosition from './useFocusedPosition';

// type RootStackParamList = {
//   Home: undefined;
//   Cart: undefined;
//   Checkout: undefined;
// };

// function HomeScreen({
//   navigation,
// }: NativeStackScreenProps<RootStackParamList, 'Home'>) {
//   useFocusedPosition(1);
//   return (
//     <View style={styles.container}>
//       <ProgressStepper />
//       <Button onPress={() => navigation.navigate('Cart')} title="Go To cart" />
//     </View>
//   );
// }

// function CartScreen({
//   navigation,
// }: NativeStackScreenProps<RootStackParamList, 'Cart'>) {
//   useFocusedPosition(2);
//   return (
//     <View style={styles.container}>
//       <ProgressStepper />
//       <Button
//         onPress={() => navigation.navigate('Checkout')}
//         title="Go To checkout"
//       />
//     </View>
//   );
// }

// function CheckoutScreen({
//   navigation,
// }: NativeStackScreenProps<RootStackParamList, 'Checkout'>) {
//   useFocusedPosition(3);
//   return (
//     <View style={styles.container}>
//       <ProgressStepper />
//       <Button onPress={() => navigation.navigate('Home')} title="Go To Home" />
//     </View>
//   );
// }

function ProgressStepperExample() {
  const { goToNext, goToPrevious } = useProgressStepperVerticalContext();
  return (
    <View style={styles.container}>
      <ProgressStepperVertical />
      <View>
        <Button title="Next" onPress={goToNext}></Button>
        <Button title="Previous" onPress={goToPrevious}></Button>
      </View>
    </View>
  );
}

// const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <ProgressStepperVerticalProvider extended>
        <ProgressStepperExample />
      </ProgressStepperVerticalProvider>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerRight: {
    backgroundColor: 'yellow',
    zIndex: 1,
  },
});
