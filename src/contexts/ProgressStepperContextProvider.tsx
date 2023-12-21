import React, { useState, createContext } from 'react';

export type ProgressStepperContextProviderProps = {
  children: React.ReactNode;
};

export type ProgressStepperContextValue = {
  currentPosition: number;
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
    setCurrentPosition((prevPosition) => prevPosition + 1);
  };
  const goToPrevious = () => {
    setCurrentPosition((prevPosition) => prevPosition - 1);
  };
  return (
    <ProgressStepperContext.Provider
      value={{ currentPosition, goToNext, goToPrevious }}
    >
      {children}
    </ProgressStepperContext.Provider>
  );
}
