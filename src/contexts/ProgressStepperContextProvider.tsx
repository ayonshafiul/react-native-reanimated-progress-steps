import React, { useState, createContext } from 'react';
import type { TextStyle } from 'react-native';
import type { ViewStyle } from 'react-native';
import { Dimensions } from 'react-native';

export type ProgressStepperContextProviderProps = {
  children: React.ReactNode;
  width?: number;
  steps?: string[];
  initialPosition?: number;
  animationDuration?: number;
  animationDelay?: number;
  stepWidth?: number;
  stepStyle?: ViewStyle;
  trackHeight?: number;
  containerHeight?: number;
  activeColor?: string;
  inactiveColor?: string;
  showLabels?: boolean;
  trackActiveColor?: string;
  trackInactiveColor?: string;
  labelOffset?: number;
  labelStyle?: TextStyle;
  innerLabelStyle?: TextStyle;
};

export type ProgressStepperContextValue =
  | ({
      currentPosition: number;
      goToNext: () => void;
      goToPrevious: () => void;
    } & Required<Omit<ProgressStepperContextProviderProps, 'children'>>)
  | null;

export const ProgressStepperContext =
  createContext<ProgressStepperContextValue>(null);

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
    width: 35,
    height: 35,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showLabels = true,
  activeColor = '#FF0000',
  inactiveColor = '#DEDEDE',
  trackActiveColor = activeColor,
  trackInactiveColor = inactiveColor,
  labelOffset = -15,
  labelStyle = {
    color: 'black',
  },
  innerLabelStyle = {
    color: 'white',
    fontWeight: 'bold',
  },
}: ProgressStepperContextProviderProps) {
  const [currentPosition, setCurrentPosition] =
    useState<number>(initialPosition);

  const goToNext = () => {
    setCurrentPosition((prevPosition) => {
      if (prevPosition + 1 <= steps.length + 1) {
        return prevPosition + 1;
      } else {
        return prevPosition;
      }
    });
  };
  const goToPrevious = () => {
    setCurrentPosition((prevPosition) => {
      if (prevPosition - 1 >= 0) {
        return prevPosition - 1;
      } else {
        return prevPosition;
      }
    });
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
        trackActiveColor,
        trackInactiveColor,
        labelOffset,
        labelStyle,
        innerLabelStyle,
      }}
    >
      {children}
    </ProgressStepperContext.Provider>
  );
}
