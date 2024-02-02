import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  ProgressStepperProvider,
  ProgressStepper,
} from 'react-native-reanimated-progress-steps';
import useFocusedPosition from './useFocusedPosition';

type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  Checkout: undefined;
};

function HomeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  useFocusedPosition(1);
  return (
    <View style={styles.container}>
      <ProgressStepper />
      <Button onPress={() => navigation.navigate('Cart')} title="Go To cart" />
    </View>
  );
}

function CartScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Cart'>) {
  useFocusedPosition(2);
  return (
    <View style={styles.container}>
      <ProgressStepper />
      <Button
        onPress={() => navigation.navigate('Checkout')}
        title="Go To checkout"
      />
    </View>
  );
}

function CheckoutScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Checkout'>) {
  useFocusedPosition(3);
  return (
    <View style={styles.container}>
      <ProgressStepper />
      <Button onPress={() => navigation.navigate('Home')} title="Go To Home" />
    </View>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <ProgressStepperProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
        </Stack.Navigator>
      </ProgressStepperProvider>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
  },
});
