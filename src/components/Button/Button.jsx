export const Button = ({
  text,
  highlightClass,
  highlightCondition,
  handleClick,
}) => (
  <button
    type="button"
    className={`button ${highlightClass} ${
      highlightCondition ? '' : 'is-light'
    }`}
    onClick={handleClick}
  >
    {text}
  </button>
);
