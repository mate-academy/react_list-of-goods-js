import 'bulma/css/bulma.css';

export const Button = ({
  className,
  isReversed,
  nameField,
  sortField,
  handleClick,
}) => {
  let classNameButton;

  if (isReversed && nameField === 'Reverse') {
    classNameButton = className;
  } else {
    classNameButton =
      sortField === nameField ? className : `${className} is-light`;
  }

  return (
    <button
      type="button"
      className={classNameButton}
      onClick={() => handleClick(nameField)}
    >
      {nameField}
    </button>
  );
};
