import React from 'react';
import {
  View,
  StyleSheet,
  Button,
  ScrollView,
  SafeAreaView,
  Text,
  Image,
  // ScrollView,
  // Text,
  // Dimensions,
} from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
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
    <ScrollView>
      <View style={styles.container}>
        <ProgressStepperVertical />
      </View>
      <View style={styles.btnContainer}>
        <Button title="Next" onPress={goToNext} />
        <Button title="Previous" onPress={goToPrevious} />
      </View>
    </ScrollView>
  );
}

// const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const STEPS = [
    { title: 'Order Recieved', description: 'Your order is ready ' },
    {
      title: 'Processing',
      description: 'Your order is being processed ',
    },
    {
      title: 'Out for Delivery',
      description: 'Our Delivery Van is on the way to you.',
    },
    {
      title: 'Note from Delivery Man',
      description: 'Customer er meye parcel niye palaise.',
    },
  ];
  return (
    <SafeAreaView>
      <ProgressStepperVerticalProvider
        height={500}
        steps={STEPS}
        initialPosition={1}
        extended
        renderStep={(step, _) => {
          return (
            <View style={styles.stepContainer}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.setpDescription}>{step.description}</Text>
            </View>
          );
        }}
        renderInnerStep={() => {
          return (
            <Image source={require('../assets/box.png')} style={styles.image} />
          );
        }}
        activeColor="#E44949"
        trackActiveColor="#E44949"
        trackWidth={3}
      >
        <ProgressStepperExample />
      </ProgressStepperVerticalProvider>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    marginVertical: 64,
  },
  containerRight: {
    backgroundColor: 'yellow',
    zIndex: 1,
  },
  btnContainer: {
    marginVertical: 8,
  },
  stepContainer: {
    width: 300,
  },
  stepTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  setpDescription: {
    left: 10,
    color: 'grey',
    fontSize: 12,
  },
  image: {
    width: 16,
    height: 16,
  },
});
