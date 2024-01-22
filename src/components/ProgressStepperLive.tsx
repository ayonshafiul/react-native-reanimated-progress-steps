import React, { useEffect } from 'react';
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
  height = 8,
  completed = false,
  trackBackgroundColor = '#DEDEDE',
  progressColor = 'red',
  trackCompletedColor = 'red',
  stepWidth = 80,
  showLabel = true,
  label = '',
  active = false,
}) => {
  const anim = useSharedValue(0);

  const styles = StyleSheet.create({
    container: {
      width: stepWidth,
      height,
      overflow: 'hidden',
      borderRadius: 4,
    },
    progressBar: {
      height,
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
    const scaleX = interpolate(
      anim.value,
      [0, 0.3, 0.6, 1],
      [1, 0.25, 0.3, 0.1],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      }
    );

    const translateX = interpolate(
      anim.value,
      [0, 0.3, 0.6, 1],
      [-200, 0, 50, 700],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      }
    );

    return {
      transform: [{ scaleX: scaleX }, { translateX: translateX }],
    };
  });

  return (
    <View style={{ height: showLabel ? 30 : 10 }}>
      <Animated.View
        style={[
          styles.container,
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
      {showLabel && <Text style={styles.label}>{label}</Text>}
    </View>
  );
};

export default function ProgressStepperLive({
  currentStep = 0,
  allSteps = ['Menu', 'Cart', 'Checkout', 'Delivery'],
  width = windowWidth - 20,
  gap = 10,
  containerStyle = {},
}) {
  const stepWidth = width / allSteps.length - gap;
  return (
    <View style={[styles.container, containerStyle, { width }]}>
      {allSteps.map((step, index) => {
        return (
          <ProgressStep
            completed={currentStep > index}
            active={currentStep === index}
            stepWidth={stepWidth}
            label={step}
            showLabel={true}
            key={index}
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
