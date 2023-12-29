import React, { memo } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import useProgressStepperContext from '../hooks/useProgressStepperContext';

const ProgressStepper = ({}) => {
  const {
    currentPosition,
    width,
    steps,
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
  } = useProgressStepperContext();

  const trackProgressStyle = useAnimatedStyle(() => ({
    width: progress.value,
  }));

  const activeBgStyle = {
    backgroundColor: activeColor,
  };
  const inactiveBgStyle = {
    backgroundColor: inactiveColor,
  };

  const activeTrackStyle = {
    backgroundColor: trackActiveColor,
  };
  const inactiveTrackStyle = {
    backgroundColor: trackInactiveColor,
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
    <View style={[styles.container, containerHeightStyle, stepWrapperStyle]}>
      <View
        style={[
          styles.trackContainer,
          { width: width },
          trackHeightStyle,
          trackContainerPositionStyle,
          inactiveTrackStyle,
        ]}
      >
        <Animated.View
          style={[
            styles.trackProgress,
            trackHeightStyle,
            trackProgressStyle,
            activeTrackStyle,
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
                <Text style={[styles.label, labelStyle, { top: labelOffset }]}>
                  {label}
                </Text>
              )}
              <Animated.View
                style={[
                  stepStyle,
                  currentPosition > index ? activeBgStyle : inactiveBgStyle,
                ]}
              >
                <Text style={innerLabelStyle}>{index + 1}</Text>
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
  label: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
});

export default memo(ProgressStepper);
