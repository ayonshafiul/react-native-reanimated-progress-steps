import React, { memo } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import useProgressStepperVerticalContext from '../hooks/useProgressStepperVerticalContext';

const ProgressStepperVertical = ({}) => {
  const {
    currentPosition,
    height,
    steps,
    stepStyle,
    showLabels,
    activeColor,
    inactiveColor,
    trackWidth,
    containerWidth,
    stepHeight,
    trackActiveColor,
    trackInactiveColor,
    labelOffset,
    labelStyle,
    innerLabelStyle,
    progress,
    perStepHeight,
    extended,
    renderInnerStep,
  } = useProgressStepperVerticalContext();

  const trackProgressStyle = useAnimatedStyle(() => ({
    height: progress.value,
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

  const containerWidthStyle = {
    width: containerWidth,
  };

  const stepWrapperStyle = {
    height: height,
  };

  const stepHeightStyle = {
    height: stepHeight,
  };

  const trackWidthStyle = {
    width: trackWidth,
  };

  const trackContainerPositionStyle = {
    left: containerWidth / 2 - trackWidth / 2,
  };

  return (
    <View style={[styles.container, containerWidthStyle, stepWrapperStyle]}>
      <View
        style={[
          styles.trackContainer,
          { height: height },
          trackWidthStyle,
          trackContainerPositionStyle,
          inactiveTrackStyle,
        ]}
      >
        <Animated.View
          style={[
            styles.trackProgress,
            trackWidthStyle,
            trackProgressStyle,
            activeTrackStyle,
          ]}
        />
      </View>
      <View style={[styles.stepWrapper, containerWidthStyle, stepWrapperStyle]}>
        {steps.map((label, index) => {
          return (
            <View
              key={index}
              style={[
                styles.stepContainerStyle,
                stepHeightStyle,
                containerWidthStyle,
                {
                  top:
                    perStepHeight * (extended ? index + 1 : index) -
                    stepHeight / 2,
                },
              ]}
            >
              {showLabels && (
                <Text style={[styles.label, labelStyle, { left: labelOffset }]}>
                  {label}
                </Text>
              )}
              <Animated.View
                style={[
                  stepStyle,
                  currentPosition > index ? activeBgStyle : inactiveBgStyle,
                ]}
              >
                {typeof renderInnerStep === 'function' ? (
                  renderInnerStep(label, index + 1)
                ) : (
                  <Text style={innerLabelStyle}>{index + 1}</Text>
                )}
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
  },
  stepWrapper: {
    position: 'relative',
    zIndex: 1,
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
    textAlign: 'center',
    zIndex: 10,
    left: 100,
  },
});

export default memo(ProgressStepperVertical);
