import React, { useState, createContext, useEffect } from 'react';
import type { TextStyle } from 'react-native';
import type { ViewStyle } from 'react-native';
import { Dimensions } from 'react-native';
import {
  useSharedValue,
  withDelay,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';

export type ProgressStepperProviderProps = {
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
  extended?: boolean;
};

export type ProgressStepperContextValue =
  | ({
      currentPosition: number;
      setCurrentPosition: React.Dispatch<React.SetStateAction<number>>;
      goToNext: () => void;
      goToPrevious: () => void;
      progress: SharedValue<number>;
      perStepWidth: number;
    } & Required<Omit<ProgressStepperProviderProps, 'children'>>)
  | null;

export const ProgressStepperContext =
  createContext<ProgressStepperContextValue>(null);

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

export default function ProgressStepperProvider({
  children,
  width = windowWidth - 100,
  steps = ['Menu', 'Cart', 'Checkout'],
  initialPosition = 0,
  animationDuration = 300,
  animationDelay = 700,
  trackHeight = 6,
  containerHeight = 60,
  stepWidth = 60,
  stepStyle = {
    width: 30,
    height: 30,
    transform: [
      {
        rotate: '45deg',
      },
    ],
    borderRadius: 4,
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
    fontSize: 12,
    fontWeight: 'bold',
  },
  innerLabelStyle = {
    color: 'white',
    fontWeight: 'bold',
    transform: [
      {
        rotate: '-45deg',
      },
    ],
  },
  extended = false,
}: ProgressStepperProviderProps) {
  const [currentPosition, setCurrentPosition] =
    useState<number>(initialPosition);
  const progress_steps = extended ? steps.length + 1 : steps.length - 1;
  const perStepWidth = width / progress_steps;
  const progress = useSharedValue<number>(perStepWidth * currentPosition);

  const animateProgress = (position: number) => {
    const widthValueForStep =
      perStepWidth * (extended ? position : position - 1);
    progress.value = withDelay(
      animationDelay,
      withTiming(widthValueForStep, {
        duration: animationDuration,
      })
    );
  };

  useEffect(() => {
    animateProgress(currentPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPosition]);

  const goToNext = () => {
    setCurrentPosition((prevPosition) => {
      if (prevPosition + 1 <= (extended ? steps.length + 1 : steps.length)) {
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
        setCurrentPosition,
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
        progress,
        perStepWidth,
        extended,
      }}
    >
      {children}
    </ProgressStepperContext.Provider>
  );
}
