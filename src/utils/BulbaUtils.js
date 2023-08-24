import CN from 'classnames';

export const changeColorIfPressed = (isPressed, status) => (CN(
  'button',
  status,
  { 'is-light': isPressed },
));
