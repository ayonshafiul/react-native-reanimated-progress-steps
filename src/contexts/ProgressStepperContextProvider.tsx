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
  stepBoxStyle?: ViewStyle;
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
  steps = ['Step 1', 'Step 2', 'Step 3'],
  initialPosition = 0,
  animationDuration = 300,
  animationDelay = 700,
  stepBoxStyle = {},
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
        stepBoxStyle,
        showLabels,
        activeColor,
        inactiveColor,
      }}
    >
      {children}
    </ProgressStepperContext.Provider>
  );
}
