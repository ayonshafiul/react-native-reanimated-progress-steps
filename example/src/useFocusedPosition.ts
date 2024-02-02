import { useEffect } from 'react';
import { useProgressStepperContext } from 'react-native-reanimated-progress-steps';
import { useIsFocused } from '@react-navigation/native';

export default function useFocusedPosition(position: number) {
  const isFocused = useIsFocused();
  const { setCurrentPosition } = useProgressStepperContext();
  useEffect(() => {
    if (isFocused) {
      setCurrentPosition(position);
    }
  }, [isFocused, setCurrentPosition, position]);
}
