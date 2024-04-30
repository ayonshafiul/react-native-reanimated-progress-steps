import { useContext } from 'react';

import { ProgressStepperVerticalContext } from '../contexts/ProgressStepperVerticalProvider';

export default function useProgressStepperVerticalContext() {
  const context = useContext(ProgressStepperVerticalContext);
  if (!context) {
    throw new Error(
      'ProgressStepperVertical must be wrapped inside a ProgressStepperVerticalProvider.'
    );
  }
  return context;
}
