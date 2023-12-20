import React, { useEffect, useRef } from 'react';

import { StyleSheet, Text, View, Dimensions } from 'react-native';

import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const STEPS = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6'];
const STEP_CARD_WIDTH = 60;
const CONTAINER_HEIGHT = 90;
const PROGRESS_HEIGHT = 6;

const ProgressStepperMultiPage = ({
  width = windowWidth,
  steps = STEPS,
  currentPosition = 0,
  animationDuration = 300,
  animationDelay = 700,
  stepBoxStyle = {},
  showLabels = true,
  activeColor = '#FF0000',
  inactiveColor = '#DEDEDE',
}) => {
  // need one extra steps
  const progress_steps = steps.length + 1;
  const prevPosition = useRef(0);
  const perStepWidth = width / progress_steps;
  const progress = useSharedValue(perStepWidth * currentPosition);
  const scale = useSharedValue(1);
  const colorChange = useSharedValue(0);

  const animateForward = (position: number) => {
    colorChange.value = 0;
    const widthValueForStep = perStepWidth * position;
    progress.value = withDelay(
      animationDelay,
      withTiming(
        widthValueForStep,
        {
          duration: animationDuration,
        },
        () => {
          colorChange.value = withTiming(1);
        }
      )
    );
  };

  const animateBackward = (position: number) => {
    colorChange.value = 1;
    colorChange.value = withDelay(
      animationDelay,
      withTiming(
        0,
        {
          duration: animationDuration,
        },
        () => {
          const widthValueForStep = perStepWidth * position;
          progress.value = withDelay(
            animationDelay,
            withTiming(widthValueForStep, {
              duration: animationDuration,
            })
          );
        }
      )
    );
  };

  useEffect(() => {
    if (prevPosition.current < currentPosition) {
      animateForward(currentPosition);
    } else {
      animateBackward(currentPosition);
    }
    prevPosition.current = currentPosition;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPosition]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: progress.value,
  }));

  const animatedColor = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: interpolateColor(
      colorChange.value,
      [0, 1],
      [inactiveColor, activeColor]
    ),
  }));

  const activeBgStyle = {
    backgroundColor: activeColor,
  };
  const inactiveBgStyle = {
    backgroundColor: inactiveColor,
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.progressContainer, { width: width }, inactiveBgStyle]}
      >
        <Animated.View
          style={[styles.stepProgress, animatedStyle, activeBgStyle]}
        />
      </View>
      <View style={styles.stepContainer}>
        {steps.map((label, index) => {
          return (
            <View
              key={index}
              style={[
                styles.stepCardContainer,
                { left: perStepWidth * (index + 1) - STEP_CARD_WIDTH / 2 },
              ]}
            >
              {showLabels && (
                <Text
                  style={[
                    styles.stepCardLabel,
                    currentPosition > index ? styles.stepCardLabelActive : null,
                  ]}
                  numberOfLines={1}
                >
                  {label}
                </Text>
              )}
              <Animated.View
                style={[
                  styles.stepCardBox,
                  stepBoxStyle,
                  inactiveBgStyle,
                  currentPosition > index + 1 ? activeBgStyle : null,
                  currentPosition > prevPosition.current &&
                  currentPosition === index + 1
                    ? animatedColor
                    : inactiveBgStyle,
                  currentPosition < prevPosition.current &&
                  currentPosition === index
                    ? animatedColor
                    : null,
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
  progressContainer: {
    position: 'absolute',
    top: CONTAINER_HEIGHT / 2 - PROGRESS_HEIGHT / 2,
    left: 0,
    height: PROGRESS_HEIGHT,
  },
  stepContainer: {
    width: windowWidth,
    height: CONTAINER_HEIGHT,
    position: 'relative',
    top: 0,
    left: 0,
  },
  stepProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: PROGRESS_HEIGHT,
  },
  stepCardContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: STEP_CARD_WIDTH,
    height: CONTAINER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCardLabel: {
    position: 'relative',
    bottom: 12,
    color: 'black',
  },
  stepCardLabelActive: {
    color: 'black',
  },
  stepCardText: {
    color: 'white',
    fontWeight: 'bold',
  },
  stepCardBox: {
    width: STEP_CARD_WIDTH - 20,
    height: STEP_CARD_WIDTH - 20,
    borderRadius: (STEP_CARD_WIDTH - 20) / 2,
    bottom: 8,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
  },
  stepCardBoxActive: {
    backgroundColor: 'red',
  },
});

export default ProgressStepperMultiPage;
