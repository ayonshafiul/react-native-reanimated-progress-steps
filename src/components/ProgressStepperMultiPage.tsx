import React, { memo, useEffect } from 'react';

import { StyleSheet, Text, View, Dimensions } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import useProgressStepperContext from '../hooks/useProgressStepperContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const STEP_CARD_WIDTH = 40;
const CONTAINER_HEIGHT = 90;
const TRACK_HEIGHT = 6;

const ProgressStepperMultiPage = ({}) => {
  // need one extra steps
  const {
    currentPosition,
    width,
    steps,
    animationDelay,
    animationDuration,
    stepBoxStyle,
    showLabels,
    activeColor,
    inactiveColor,
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

  return (
    <View style={styles.container}>
      <View style={[styles.trackContainer, { width: width }, inactiveBgStyle]}>
        <Animated.View
          style={[styles.trackProgress, trackProgressAnimated, activeBgStyle]}
        />
      </View>
      <View style={styles.stepWrapper}>
        {steps.map((label, index) => {
          return (
            <View
              key={index}
              style={[
                styles.stepContainer,
                { left: perStepWidth * (index + 1) - STEP_CARD_WIDTH / 2 },
              ]}
            >
              {showLabels && (
                <Text
                  style={[
                    styles.stepLabel,
                    currentPosition > index ? styles.stepLabelActive : null,
                  ]}
                  numberOfLines={1}
                >
                  {label}
                </Text>
              )}
              <Animated.View
                style={[
                  styles.step,
                  stepBoxStyle,
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
    width: windowHeight,
    height: CONTAINER_HEIGHT,
    position: 'relative',
  },
  trackContainer: {
    position: 'absolute',
    top: CONTAINER_HEIGHT / 2 - TRACK_HEIGHT / 2,
    left: 0,
    height: TRACK_HEIGHT,
  },
  stepWrapper: {
    width: windowWidth,
    height: CONTAINER_HEIGHT,
    position: 'relative',
    top: 0,
    left: 0,
  },
  trackProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: TRACK_HEIGHT,
  },
  stepContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: STEP_CARD_WIDTH,
    height: CONTAINER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepLabel: {
    position: 'relative',
    bottom: 12,
    color: 'black',
  },
  stepLabelActive: {
    color: 'black',
  },
  stepCardText: {
    color: 'white',
    fontWeight: 'bold',
  },
  step: {
    width: STEP_CARD_WIDTH,
    height: STEP_CARD_WIDTH,
    borderRadius: STEP_CARD_WIDTH / 2,
    bottom: 8,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
  },
  stepActive: {
    backgroundColor: 'red',
  },
});

export default memo(ProgressStepperMultiPage);
