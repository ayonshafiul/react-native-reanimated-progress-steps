import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const ProgressStep = ({
  height = 8,
  completed = false,
  trackBackgroundColor = '#DEDEDE',
  progressColor = 'red',
  trackCompletedColor = 'green',
  containerWidth = 80,
  showLabel = true,
  label = '',
  active = false,
}) => {
  const anim = useSharedValue(0);
  console.log(completed);

  const styles = StyleSheet.create({
    container: {
      width: containerWidth,
      height,
      overflow: 'hidden',
      borderRadius: 4,
    },
    progressBar: {
      height,
      width: containerWidth,
      backgroundColor: trackBackgroundColor,
    },
    label: {
      color: 'black',
      textAlign: 'center',
    },
  });

  useEffect(() => {
    anim.value = withRepeat(withTiming(1, { duration: 1500 }), -1);
  }, [anim]);

  const animStyle = useAnimatedStyle(() => {
    const scaleX = interpolate(anim.value, [0, 0.4, 1], [1, 0.35, 0.8], {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.CLAMP,
    });

    const translateX = interpolate(anim.value, [0, 0.5, 1], [-200, 0, 200], {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.CLAMP,
    });

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
  allSteps = ['Menu', 'Cart', 'Checkout'],
}) {
  return (
    <View style={styles.container}>
      {allSteps.map((step, index) => {
        return (
          <ProgressStep
            completed={currentStep > index}
            active={currentStep === index}
            containerWidth={100}
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
});
