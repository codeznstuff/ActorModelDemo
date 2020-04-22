import React, { FC, useLayoutEffect, useState } from 'react';
import { buttonProps } from '../../@types/constants';
import styles from './Button.module.scss';
import { useStateContext } from '../../context/context';

export const Button: FC<buttonProps> = (props: buttonProps) => {
  const { currentKeyPress } = useStateContext();
  const [buttonEffect, setButtonEffect] = useState<boolean>(false);

  /* Ignore in test coverage report due to simplicity*/
  /* istanbul ignore next */
  useLayoutEffect(() => {
    if (currentKeyPress === props.id) {
      setButtonEffect(true);
    } else {
      setButtonEffect(false);
    }
  }, [currentKeyPress, props.id]);

  const getClassName = (operator?: boolean) => {
    let cls = styles.btn_wrapper + ' ';
    if (operator) {
      cls += buttonEffect ? styles.operator_hover : styles.operator;
    } else {
      cls += buttonEffect ? styles.btn_wrapper_hover : '';
    }
    return cls;
  };
  return (
    <div id={'Button' + props.id} className={getClassName(props.operator)} onClick={() => props.handleClick(props.value)} data-testid={props.id}>
      {props.value}
    </div>
  );
};

export default Button;
