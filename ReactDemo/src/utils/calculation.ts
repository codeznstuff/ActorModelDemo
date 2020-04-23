import { OperationType, ClientReturnContract } from '../@types/constants';
import { add, subtract, multiply, divide } from '../services/ApiService';

export default {
  getValue(value: string): string {
    return value === '' || value === '.' || value === 'NaN' ? '0' : value;
  },
  async calculate(currentValue: string, previousValue: string, operation: OperationType): Promise<ClientReturnContract> {
    let val1 = parseFloat(currentValue);
    let val2 = parseFloat(previousValue);

    let clientReturnContract: ClientReturnContract = { result: '', success: false };

    switch (+operation) {
      case OperationType.Addition:
        clientReturnContract = await add(val2, val1);
        break;
      case OperationType.Subtraction:
        clientReturnContract = await subtract(val2, val1);
        break;
      case OperationType.Multiplication:
        clientReturnContract = await multiply(val2, val1);
        break;
      case OperationType.Division:
        clientReturnContract = await divide(val2, val1);
        break;
      default:
        break;
    }

    return clientReturnContract;
  },
  countNumberInString(string: string, word: string): number {
    return string.split(word).length - 1;
  },
  isNaN(value: string | number): boolean {
    console.log(Number.isNaN(Number(value)));
    return Number.isNaN(Number(value));
  }
};
