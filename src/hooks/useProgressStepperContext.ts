import { useContext } from 'react';
import { ProgressStepperContext } from '../contexts/ProgressStepperContextProvider';

export default function useProgressStepperContext() {
  return useContext(ProgressStepperContext);
}
