export const Button = ({ buttonText, buttonType = '', onClick, isActive }) => {
  const buttonClass = isActive
    ? `button ${buttonType}`
    : `button ${buttonType} is-light`;

  return (
    <button type="button" className={buttonClass} onClick={onClick}>
      {buttonText}
    </button>
  );
};
