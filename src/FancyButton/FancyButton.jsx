import React from 'react';
import classNames from 'classnames';

const FancyButton = ({ label, onClick, isActive, colorClass }) => (
  <button
    type="button"
    className={classNames('button', colorClass, {
      'is-light': isActive,
    })}
    onClick={onClick}
  >
    {label}
  </button>
);

export default FancyButton;
