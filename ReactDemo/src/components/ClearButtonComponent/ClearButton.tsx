import React from 'react';
import styles from './ClearButton.module.scss';
import { clearButtonProps } from '../../@types/constants';

export const ClearButton = (props: clearButtonProps) => (
    <div className={styles.clear_btn} onClick={() => props.handleClear()} data-testid="clearButton">
        <u>C</u>LEAR
    </div>
)

export default ClearButton