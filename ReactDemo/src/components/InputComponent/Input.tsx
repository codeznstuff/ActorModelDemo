import React from 'react';
import styles from './Input.module.scss';
import { inputProps } from '../../@types/constants';

export const Input = (props: inputProps) => (
  <table className={styles.input} data-testid="input">
    <tbody>
      <tr>
        <td id="previous" data-testid="previous">{props.previousInput}</td>
      </tr>
      <tr>
        <td data-testid="current">{props.input}</td>
      </tr>
    </tbody>
  </table>
)

export default Input;