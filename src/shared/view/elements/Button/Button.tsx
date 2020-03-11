import React from 'react';
import block from 'bem-cn';

import './Button.scss';

type IProps = {
  type: 'submit' | 'button';
  theme?: 'account-action' | 'with-arrow';
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

const b = block('button');

function Button(props: IProps) {
  const {
    type: buttonType,
    theme = 'account-action',
    disabled: isDisabled = false,
    onClick: onButtonClick,
  } = props;

  return (
    <button
      className={b({ theme })}
      type={buttonType}
      disabled={isDisabled}
      onClick={onButtonClick}
    >
      {props.children}
    </button>
  );
}

export { Button };
