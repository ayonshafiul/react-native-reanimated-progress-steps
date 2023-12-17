import React, { useState, createContext } from 'react';

export type ProgressStepperContextProviderProps = {
  children: React.ReactNode;
};

export type ProgressStepperContextValue = {
  currentPosition: number;
  setCurrentPosition: React.Dispatch<React.SetStateAction<number>>;
  goToNext: () => void;
  goToPrevious: () => void;
};

export const ProgressStepperContext =
  createContext<ProgressStepperContextValue>({} as ProgressStepperContextValue);

export default function ProgressStepperContextProvider({
  children,
}: ProgressStepperContextProviderProps) {
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const goToNext = () => {
    console.log(currentPosition);
    setCurrentPosition((prevPosition) => prevPosition + 1);
  };
  const goToPrevious = () => {
    console.log('hello');
    setCurrentPosition((prevPosition) => prevPosition - 1);
  };
  return (
    <ProgressStepperContext.Provider
      value={{ currentPosition, setCurrentPosition, goToNext, goToPrevious }}
    >
      {children}
    </ProgressStepperContext.Provider>
  );
}
