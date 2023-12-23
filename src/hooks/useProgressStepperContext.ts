import { useContext } from 'react';
import { ProgressStepperContext } from '../contexts/ProgressStepperContextProvider';

export default function useProgressStepperContext() {
  const context = useContext(ProgressStepperContext);
  if (!context) {
    throw new Error(
      'Progress Stepper must be wrapped inside a ProgressStepperContextProvider.'
    );
  }
  return context;
}
