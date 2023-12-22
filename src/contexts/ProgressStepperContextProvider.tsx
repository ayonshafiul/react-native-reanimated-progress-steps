import React, { useState, createContext } from 'react';
import type { ViewStyle } from 'react-native';
import { Dimensions } from 'react-native';

export type ProgressStepperContextProviderProps = {
  children: React.ReactNode;
  width?: number;
  steps?: string[];
  initialPosition?: number;
  animationDuration?: number;
  animationDelay?: number;
  stepStyle?: ViewStyle;
  trackHeight?: number;
  containerHeight?: number;
  stepWidth?: number;
  activeColor?: string;
  inactiveColor?: string;
  showLabels?: boolean;
};

export type ProgressStepperContextValue = {
  currentPosition: number;
  goToNext: () => void;
  goToPrevious: () => void;
} & Required<Omit<ProgressStepperContextProviderProps, 'children'>>;

export const ProgressStepperContext =
  createContext<ProgressStepperContextValue>({} as ProgressStepperContextValue);

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

export default function ProgressStepperContextProvider({
  children,
  width = windowWidth,
  steps = ['Menu', 'Cart', 'Checkout'],
  initialPosition = 0,
  animationDuration = 300,
  animationDelay = 700,
  trackHeight = 6,
  containerHeight = 60,
  stepWidth = 60,
  stepStyle = {
    width: stepWidth - 20,
    height: stepWidth - 20,
    borderRadius: stepWidth / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showLabels = true,
  activeColor = '#FF0000',
  inactiveColor = '#DEDEDE',
}: ProgressStepperContextProviderProps) {
  const [currentPosition, setCurrentPosition] =
    useState<number>(initialPosition);

  const goToNext = () => {
    setCurrentPosition((prevPosition) => prevPosition + 1);
  };
  const goToPrevious = () => {
    setCurrentPosition((prevPosition) => prevPosition - 1);
  };
  return (
    <ProgressStepperContext.Provider
      value={{
        currentPosition,
        goToNext,
        goToPrevious,
        steps,
        width,
        initialPosition,
        animationDuration,
        animationDelay,
        stepStyle,
        showLabels,
        activeColor,
        inactiveColor,
        trackHeight,
        containerHeight,
        stepWidth,
      }}
    >
      {children}
    </ProgressStepperContext.Provider>
  );
}
