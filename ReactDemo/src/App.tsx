import React, { FC } from 'react';
import { ContextProvider } from './context/context';
import Calculator from './components/CalculatorComponent/Calculator';

const App: FC = () => {
  return (
    <ContextProvider>
      <Calculator />
    </ContextProvider>
  );
};
export default App;
