import React, { useEffect } from 'react';

import { StyleSheet, Text, View, Dimensions } from 'react-native';

import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LABELS = ['Step 1', 'Step 2', 'Step 3'];
const STEP_CARD_WIDTH = 60;
const CONTAINER_HEIGHT = 90;
const PROGRESS_HEIGHT = 6;

function ProgressStepper({
  width = windowWidth,
  labels = LABELS,
  prevPosition = -1,
  currentPosition = 0,
}) {
  const progress_steps = labels.length + 1;
  const perStepWidth = width / progress_steps;
  const progress = useSharedValue(perStepWidth * prevPosition);
  const scale = useSharedValue(1);
  const colorChange = useSharedValue(0);

  useEffect(() => {
    progress.value = perStepWidth * prevPosition;
    colorChange.value = 0;
    const widthValueForStep = perStepWidth * currentPosition;
    progress.value = withDelay(
      700,
      withTiming(
        widthValueForStep,
        {
          duration: 300,
        },
        () => {
          scale.value = withSequence(
            withTiming(0.95),
            withTiming(1.2),
            withTiming(1, {}, () => {
              colorChange.value = withTiming(1);
            })
          );
        }
      )
    );
  }, [
    currentPosition,
    prevPosition,
    colorChange,
    perStepWidth,
    scale,
    progress,
  ]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: progress.value,
  }));

  const animatedScale = useAnimatedStyle(() => ({
    transform: [{ rotate: '45deg' }, { scale: scale.value }],
    backgroundColor: interpolateColor(
      colorChange.value,
      [0, 1],
      ['red', 'blue']
    ),
  }));

  return (
    <View style={styles.container}>
      <View style={[styles.progressContainer, { width: width }]}>
        <Animated.View style={[styles.stepProgress, animatedStyle]} />
      </View>
      <View style={styles.stepContainer}>
        {labels.map((label, index) => {
          return (
            <View
              key={index}
              style={[
                styles.stepCardContainer,
                { left: perStepWidth * (index + 1) - STEP_CARD_WIDTH / 2 },
              ]}
            >
              <Text
                style={[
                  styles.stepCardLabel,
                  currentPosition > index ? styles.stepCardLabelActive : null,
                ]}
                numberOfLines={1}
              >
                {label}
              </Text>
              <Animated.View
                style={[
                  styles.stepCardBox,
                  currentPosition > index + 1 ? styles.stepCardBoxActive : {},
                  currentPosition === index + 1 ? animatedScale : {},
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
}

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
    backgroundColor: '#DEDEDE',
  },
  stepContainer: {
    width: windowWidth,
    height: CONTAINER_HEIGHT,
    position: 'relative',
    top: 0,
    left: 0,
  },
  stepProgress: {
    backgroundColor: 'orange',
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
    left: 0,
    bottom: 24,
    color: 'black',
  },
  stepCardLabelActive: {
    color: 'black',
  },
  stepCardText: {
    color: 'white',
    fontWeight: 'bold',
    transform: [{ rotate: '-45deg' }],
  },
  stepCardBox: {
    width: STEP_CARD_WIDTH - 20,
    height: STEP_CARD_WIDTH - 20,
    bottom: 8,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '45deg' }],
    backgroundColor: '#DEDEDE',
    borderColor: 'white',
  },
  stepCardBoxActive: {
    backgroundColor: 'orange',
  },
});

export default ProgressStepper;
