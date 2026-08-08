import { Button } from '../Button/Button';

export const Buttons = ({
  buttonProps,
  onClick,
  activeSort,
  isReverse,
  showResetButton,
}) => {
  return buttonProps.map(buttonProp => {
    if (buttonProp.text === 'Reset' && !showResetButton) {
      return null;
    }

    let isActive = false;

    if (buttonProp.text === activeSort) {
      isActive = true;
    } else if (buttonProp.text === 'Reverse' && isReverse) {
      isActive = true;
    }

    return (
      <Button
        key={buttonProp.text}
        buttonText={buttonProp.text}
        buttonType={buttonProp.class}
        isActive={isActive}
        onClick={() => onClick(buttonProp.text)}
      />
    );
  });
};
