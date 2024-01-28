import React, { useEffect } from 'react';
import type { TextStyle } from 'react-native';
import type { ViewStyle } from 'react-native';
import { Dimensions } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;

const ProgressStep = ({
  trackHeight = 8,
  trackBackgroundColor = '#DEDEDE',
  completed = false,
  progressColor = 'red',
  trackCompletedColor = 'red',
  stepWidth = 80,
  showLabel = true,
  label = '',
  active = false,
  labelStyle = {},
}) => {
  const anim = useSharedValue(0);

  const styles = StyleSheet.create({
    progressBarContainer: {
      width: stepWidth,
      height: trackHeight,
      overflow: 'hidden',
      borderRadius: 4,
    },
    progressBar: {
      height: trackHeight,
      width: stepWidth,
      backgroundColor: trackBackgroundColor,
    },
    label: {
      color: 'black',
      textAlign: 'center',
    },
  });

  useEffect(() => {
    anim.value = withRepeat(withTiming(1, { duration: 2200 }), -1);
  }, [anim]);

  const animStyle = useAnimatedStyle(() => {
    const scaleHoldndGo = interpolate(
      anim.value,
      [0, 0.3, 0.6, 1],
      [1, 0.25, 0.3, 0.1],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      }
    );

    const translateHoldndGo = interpolate(
      anim.value,
      [0, 0.3, 0.6, 1],
      [-200, 0, 50, 700],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      }
    );

    return {
      transform: [{ scaleX: scaleHoldndGo }, { translateX: translateHoldndGo }],
    };
  });

  return (
    <View>
      <Animated.View
        style={[
          styles.progressBarContainer,
          {
            backgroundColor: completed
              ? trackCompletedColor
              : trackBackgroundColor,
          },
        ]}
      >
        {active && (
          <Animated.View
            style={[
              styles.progressBar,
              {
                backgroundColor: progressColor,
              },
              animStyle,
            ]}
          />
        )}
      </Animated.View>
      {showLabel && <Text style={[styles.label, labelStyle]}>{label}</Text>}
    </View>
  );
};

export type ProgressStepperLiveProps = {
  currentStep: number;
  allSteps: string[];
  showLabels: boolean;
  width: number;
  stepGap: number;
  containerStyle?: ViewStyle;
  trackHeight: number;
  trackBackgroundColor: string;
  progressColor: string;
  trackCompletedColor: string;
  labelStyle: TextStyle;
};

export default function ProgressStepperLive({
  currentStep = 0,
  allSteps = ['Menu', 'Cart', 'Checkout', 'Delivery'],
  showLabels = true,
  width = windowWidth - 20,
  stepGap = 10,
  containerStyle = {},
  trackHeight = 8,
  trackBackgroundColor = '#DEDEDE',
  progressColor = 'red',
  trackCompletedColor = 'red',
  labelStyle = {},
}: ProgressStepperLiveProps) {
  const stepWidth = width / allSteps.length - stepGap;
  return (
    <View style={[styles.container, { width }, containerStyle]}>
      {allSteps.map((step, index) => {
        return (
          <ProgressStep
            completed={currentStep > index}
            active={currentStep === index}
            stepWidth={stepWidth}
            label={step}
            showLabel={showLabels}
            key={index}
            trackCompletedColor={trackCompletedColor}
            trackBackgroundColor={trackBackgroundColor}
            trackHeight={trackHeight}
            progressColor={progressColor}
            labelStyle={labelStyle}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
