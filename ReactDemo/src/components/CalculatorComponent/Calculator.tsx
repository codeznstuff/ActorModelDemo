import React, { FC, useLayoutEffect, ReactElement } from 'react';
import { OperationType, OperatorDefinition, ButtonValueMap } from '../../@types/constants';
import styles from './Calculator.module.scss';
import { Button } from '../ButtonComponent/Button';
import { Input } from '../InputComponent/Input';
import { ClearButton } from '../ClearButtonComponent/ClearButton';
import Calc from '../../utils/calculation';
import { useStateContext } from '../../context/context';

const Calculator: FC = () => {
  const { addToInput, previousValue, getOperation, handleOperation, handleClear, handleEqual, currentValue, keyPress } = useStateContext();

  /* Ignore in test coverage report due to simplicity*/
  /* istanbul ignore next */
  const handleKeyPress = (event: KeyboardEvent) => {
    if (!Calc.isNaN(event.key) || event.key === '.') {
      addToInput(event.key);
    } else if (event.key === '+') {
      handleOperation(OperationType.Addition);
    } else if (event.key === '-') {
      handleOperation(OperationType.Subtraction);
    } else if (event.key === '*') {
      handleOperation(OperationType.Multiplication);
    } else if (event.key === '/') {
      handleOperation(OperationType.Division);
    } else if (event.key === 'Enter') {
      handleEqual();
    } else if (event.key === 'c') {
      handleClear();
    } else {
      return;
    }
    keyPress(getButtonId(event.key));
  };
  useLayoutEffect(() => {
    window.addEventListener('keyup', handleKeyPress);
    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    };
  });

  const getButtonId = (key: string): string => {
    let isButtonASymbol = ButtonValueMap.find(x => x.key === key);
    return isButtonASymbol ? isButtonASymbol.value : key;
  };
  const generateButtons = (values: Array<string>, operator: Array<OperatorDefinition>): Array<ReactElement> => {
    let result = [];
    for (var i = 0; i < values.length; i++) {
      let newButton = <Button id={getButtonId(values[i])} key={values[i]} value={values[i]} handleClick={addToInput} />;
      result.push(newButton);
    }
    for (var ii = 0; ii < operator.length; ii++) {
      let o = operator[ii].op;
      result.push(
        <Button
          id={getButtonId(operator[ii].value)}
          key={operator[ii].value}
          value={operator[ii].value}
          operator
          handleClick={() => handleOperation(o)}
        />
      );
    }
    return result;
  };

  return (
    <div className={styles.app} data-testid="calculator">
      <div className={styles.calculator_wrapper}>
        <Input previousInput={previousValue + getOperation()} input={currentValue} />
        <div className={styles.row}>{generateButtons(['7', '8', '9'], [{ value: 'x', op: OperationType.Multiplication }])}</div>
        <div className={styles.row}>{generateButtons(['4', '5', '6'], [{ value: '-', op: OperationType.Subtraction }])}</div>
        <div className={styles.row}>{generateButtons(['1', '2', '3'], [{ value: '+', op: OperationType.Addition }])}</div>
        <div className={styles.row}>
          {generateButtons(
            ['0', '.'],
            [
              { value: '=', op: OperationType.Equal },
              { value: '/', op: OperationType.Division }
            ]
          )}
        </div>
        <div className={styles.row}>
          <ClearButton handleClear={handleClear} />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
