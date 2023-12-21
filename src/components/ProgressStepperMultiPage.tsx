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

const STEPS = ['Step 1', 'Step 2', 'Step 3'];
const STEP_CARD_WIDTH = 40;
const CONTAINER_HEIGHT = 90;
const PROGRESS_HEIGHT = 6;

const ProgressStepperMultiPage = ({
  width = windowWidth,
  steps = STEPS,
  animationDuration = 300,
  animationDelay = 200,
  stepBoxStyle = {},
  showLabels = true,
  activeColor = '#FF0000',
  inactiveColor = '#DEDEDE',
}) => {
  // need one extra steps
  const { currentPosition } = useProgressStepperContext();
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

  const animatedStyle = useAnimatedStyle(() => ({
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
    width: STEP_CARD_WIDTH,
    height: STEP_CARD_WIDTH,
    borderRadius: STEP_CARD_WIDTH / 2,
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

export default memo(ProgressStepperMultiPage);
