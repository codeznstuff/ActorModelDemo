export enum OperationType {
  None = -1,
  Addition = 0,
  Subtraction = 1,
  Multiplication = 2,
  Division = 3,
  Equal = 4
}

export interface buttonProps {
  handleClick: (value: string) => void;
  operator?: boolean;
  value: string;
  id: string;
}
export interface clearButtonProps {
  handleClear: () => void;
}
export interface inputProps {
  input: string;
  previousInput: string;
}

export interface ClientReturnContract {
  result: string;
  success: boolean;
}
export interface OperatorDefinition {
  value: string;
  op: OperationType;
}
export interface IButtonValueMap {
  key: string;
  value: string;
}
export interface StateContext {
  currentValue: string;
  previousValue: string;
  currentOperation: OperationType;
  getOperation: () => string;
  handleOperation: (opProp: OperationType) => void;
  addToInput: (value: string) => void;
  handleEqual: () => void;
  handleClear: () => void;
  keyPress: (key: string) => void;
  currentKeyPress: string;
}
export const ButtonValueMap: Array<IButtonValueMap> = [
  {
    key: '.',
    value: 'Period'
  },
  {
    key: '-',
    value: 'Minus'
  },
  {
    key: '+',
    value: 'Plus'
  },
  {
    key: '/',
    value: 'Divide'
  },
  {
    key: '=',
    value: 'Enter'
  }
];
