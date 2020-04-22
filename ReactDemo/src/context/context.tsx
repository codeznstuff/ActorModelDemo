import React, { useState, useContext, ReactElement } from 'react';
import { StateContext, OperationType, ClientReturnContract } from '../@types/constants';
import Calc from '../utils/calculation';

/* Ignore in test coverage report due to simplicity*/
/* istanbul ignore next */
const Context = React.createContext<StateContext>({
  previousValue: '',
  currentValue: '',
  currentOperation: OperationType.None,
  handleOperation: (opProp: OperationType) => {
    console.log(opProp);
  },
  addToInput: (value: string) => {
    console.log(value);
  },
  getOperation: () => '',
  handleEqual: () => {},
  handleClear: () => {},
  keyPress: (key: string) => {
    console.log(key);
  },
  currentKeyPress: ''
});

export const ContextProvider = (props: {
  children: ReactElement;
  currentValue?: string;
  previousValue?: string;
  currentOperation?: OperationType;
}) => {
  const [currentValue, setCurrentValue] = useState<string>(props.currentValue ? props.currentValue : '');
  const [previousValue, setPreviousValue] = useState<string>(props.previousValue ? props.previousValue : '');
  const [currentOperation, setOperation] = useState<OperationType>(props.currentOperation ? props.currentOperation : OperationType.None);
  const [currentKeyPress, setCurrentKeyPress] = useState<string>('');

  const handleOperation = (opProp: OperationType) => {
    if (opProp === OperationType.Equal) {
      handleEqual();
      return;
    }
    setOperation(opProp);

    //Current Value is the value you are typing
    //The Previous Value is the value in history after hitting a mathematical operation (+, -, /, x)
    if (currentValue === '') {
      if (previousValue === '') {
        setPreviousValue('0'); //Hitting a math operation with empty input box (should default previous value at zero)
      } //Hitting Operation with no current value (Doesn't do anything except change operation)
    } else {
      if (previousValue === '') {
        //There is a current value but no previous value (all it does is set the previous value to current and clear current value)
        setPreviousValue(Calc.getValue(currentValue));
        setCurrentValue('');
      } else {
        //Hit a math operation with both values (complete the calcuation and add the NEW operation back on the previous), different than hitting equals
        Calc.calculate(Calc.getValue(currentValue), Calc.getValue(previousValue), currentOperation).then((result: ClientReturnContract) => {
          if (result.result === 'NaN' || !result.success) {
            setCurrentValue('NaN');
            setPreviousValue('');
            setOperation(OperationType.None);
          } else {
            setPreviousValue(result.result);
            setOperation(opProp);
            setCurrentValue('');
          }
        });
      }
    }
  };

  const handleEqual = () => {
    if (currentOperation === OperationType.None) {
      return;
    }
    Calc.calculate(Calc.getValue(currentValue), Calc.getValue(previousValue), currentOperation).then((result: ClientReturnContract) => {
      if (result.result === 'NaN' || !result.success) {
        setCurrentValue('NaN');
        setPreviousValue('');
        setOperation(OperationType.None);
      } else {
        setCurrentValue(result.result);
        setOperation(OperationType.None);
        setPreviousValue('');
      }
    });
  };
  const handleClear = () => {
    if (currentValue === '') {
      setPreviousValue('');
      setOperation(OperationType.None);
    } else {
      setCurrentValue('');
    }
  };
  const getOperation = (): string => {
    switch (currentOperation) {
      case OperationType.Addition:
        return ' + ';
      case OperationType.Subtraction:
        return ' - ';
      case OperationType.Multiplication:
        return ' * ';
      case OperationType.Division:
        return ' / ';
      case OperationType.None:
        return '';
    }
    return '';
  };

  const keyPress = (key: string) => {
    setCurrentKeyPress(key);
    setTimeout(() => {
      setCurrentKeyPress('');
    }, 125);
  };
  const addToInput = (value: string) => {
    if (currentValue.length >= 20) return;
    if (value === '.') {
      if (Calc.countNumberInString(currentValue, '.') > 0) {
        return;
      }
    }
    if (currentValue === 'NaN' || currentValue === '∞') {
      setCurrentValue('');
    } else {
      if (currentValue === '0' && value !== '.') setCurrentValue(value);
      else setCurrentValue(currentValue + value);
    }
  };

  return (
    <Context.Provider
      value={{
        currentValue,
        previousValue,
        currentOperation,
        handleOperation,
        addToInput,
        getOperation,
        handleEqual,
        handleClear,
        keyPress,
        currentKeyPress
      }}
      {...props}
    />
  );
};

/* Ignore in test coverage report due to simplicity*/
/* istanbul ignore next */
export const useStateContext = (): StateContext => {
  const context = useContext<StateContext>(Context);

  if (context === undefined) {
    throw new Error(`Error using Context`);
  }
  return context;
};
export default Context;
