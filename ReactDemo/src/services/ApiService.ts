import axios, { AxiosResponse } from 'axios';
import { handleError } from '../utils/handleError';
import { ClientReturnContract } from '../@types/constants';

export const add = async (x: number, y: number): Promise<ClientReturnContract> => {
  try {
    const response: AxiosResponse = await axios.get(`http://localhost:5000/calculator/add`, {
      params: {
        x: x,
        y: y
      }
    });
    return { result: response.data, success: true };
  } catch (e) {
    handleError(e);
    return { result: '', success: false };
  }
};

export const subtract = async (x: number, y: number): Promise<ClientReturnContract> => {
  try {
    const response: AxiosResponse = await axios.get(`http://localhost:5000/calculator/subtract`, {
      params: {
        x: x,
        y: y
      }
    });
    console.log(response);
    return { result: response.data, success: true };
  } catch (e) {
    handleError(e);
    return { result: '', success: false };
  }
};

export const multiply = async (x: number, y: number): Promise<ClientReturnContract> => {
  try {
    const response: AxiosResponse = await axios.get(`http://localhost:5000/calculator/multiply`, {
      params: {
        x: x,
        y: y
      }
    });
    console.log(response);
    return { result: response.data, success: true };
  } catch (e) {
    handleError(e);
    return { result: '', success: false };
  }
};

export const divide = async (x: number, y: number): Promise<ClientReturnContract> => {
  try {
    const response: AxiosResponse = await axios.get(`http://localhost:5000/calculator/divide`, {
      params: {
        x: x,
        y: y
      }
    });
    console.log(response);
    return { result: response.data, success: true };
  } catch (e) {
    handleError(e);
    return { result: '', success: false };
  }
};
