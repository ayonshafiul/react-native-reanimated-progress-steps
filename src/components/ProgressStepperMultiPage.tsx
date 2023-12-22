import React, { memo, useEffect } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import useProgressStepperContext from '../hooks/useProgressStepperContext';

const ProgressStepperMultiPage = ({}) => {
  // need one extra steps
  const {
    currentPosition,
    width,
    steps,
    animationDelay,
    animationDuration,
    stepStyle,
    showLabels,
    activeColor,
    inactiveColor,
    trackHeight,
    containerHeight,
    stepWidth,
  } = useProgressStepperContext();
  const progress_steps = steps.length + 1;

  const perStepWidth = width / progress_steps;
  const progress = useSharedValue(perStepWidth * currentPosition);
  const colorChange = useSharedValue(0);

  const animateProgress = (position: number) => {
    colorChange.value = 0;
    const widthValueForStep = perStepWidth * position;
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

  const trackProgressAnimated = useAnimatedStyle(() => ({
    width: progress.value,
  }));

  const activeBgStyle = {
    backgroundColor: activeColor,
  };
  const inactiveBgStyle = {
    backgroundColor: inactiveColor,
  };

  const containerHeightStyle = {
    height: containerHeight,
  };

  const stepWrapperStyle = {
    width: width,
  };

  const stepWidthStyle = {
    width: stepWidth,
  };

  const trackHeightStyle = {
    height: trackHeight,
  };

  const trackContainerPositionStyle = {
    top: containerHeight / 2 - trackHeight / 2,
  };

  return (
    <View style={[styles.container, containerHeightStyle]}>
      <View
        style={[
          styles.trackContainer,
          { width: width },
          trackHeightStyle,
          trackContainerPositionStyle,
          inactiveBgStyle,
        ]}
      >
        <Animated.View
          style={[
            styles.trackProgress,
            trackHeightStyle,
            trackProgressAnimated,
            activeBgStyle,
          ]}
        />
      </View>
      <View
        style={[styles.stepWrapper, containerHeightStyle, stepWrapperStyle]}
      >
        {steps.map((label, index) => {
          return (
            <View
              key={index}
              style={[
                styles.stepContainerStyle,
                stepWidthStyle,
                containerHeightStyle,
                { left: perStepWidth * (index + 1) - stepWidth / 2 },
              ]}
            >
              {showLabels && (
                <Text
                  style={[
                    styles.stepLabel,
                    currentPosition > index ? styles.stepLabelActive : null,
                  ]}
                >
                  {label}
                </Text>
              )}
              <Animated.View
                style={[
                  stepStyle,
                  currentPosition > index ? activeBgStyle : inactiveBgStyle,
                ]}
              >
                <Text style={styles.stepCardText}>{index + 1}</Text>
              </Animated.View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  trackContainer: {
    position: 'absolute',
    left: 0,
  },
  stepWrapper: {
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
  },
  trackProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  stepContainerStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepLabel: {
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'black',
  },
  stepLabelActive: {
    color: 'black',
  },
  stepCardText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default memo(ProgressStepperMultiPage);
