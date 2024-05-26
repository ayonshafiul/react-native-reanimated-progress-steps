import React, { useEffect } from 'react';
import type { TextStyle } from 'react-native';
import type { ViewStyle } from 'react-native';
import { Dimensions } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import Animated, {
  Easing,
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
  animationVariation = 'live',
  animationDuration = 1000,
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
    anim.value = withRepeat(
      withTiming(1, {
        duration: animationDuration,
        easing:
          animationVariation === 'bounce'
            ? Easing.inOut(Easing.circle)
            : Easing.linear,
      }),
      -1,
      animationVariation === 'bounce' ? true : false
    );
  }, [anim, animationDuration, animationVariation]);

  const animStyle = useAnimatedStyle(() => {
    const scaleLive = interpolate(
      anim.value,
      [0, 0.3, 0.6, 1],
      [1, 0.25, 0.3, 0.1],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      }
    );

    const translateLive = interpolate(
      anim.value,
      [0, 0.3, 0.6, 1],
      [-200, 0, 50, 700],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      }
    );

    const scaleXFill = interpolate(anim.value, [0, 1], [0, 1], {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.CLAMP,
    });

    const opacityFill = interpolate(anim.value, [0, 1], [1, 0], {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.CLAMP,
    });

    const translateBounce = interpolate(
      anim.value,
      [0, 1],
      [0, stepWidth - 20],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      }
    );

    if (animationVariation === 'scaleToFill') {
      return {
        transform: [{ scaleX: scaleXFill }, { translateX: 0 }],
        opacity: opacityFill,
      };
    }

    if (animationVariation === 'bounce') {
      return {
        transform: [{ translateX: translateBounce }],
        width: 20,
      };
    }

    return {
      transform: [{ scaleX: scaleLive }, { translateX: translateLive }],
      opacity: 1,
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
  containerStyle: ViewStyle;
  trackHeight: number;
  trackBackgroundColor: string;
  progressColor: string;
  trackCompletedColor: string;
  labelStyle: TextStyle;
  animationVariation: 'scaleToFill' | 'live' | 'bounce';
  animationDuration: number;
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
  animationVariation = 'scaleToFill',
  animationDuration = 1000,
}: Partial<ProgressStepperLiveProps>) {
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
            animationVariation={animationVariation}
            animationDuration={animationDuration}
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
