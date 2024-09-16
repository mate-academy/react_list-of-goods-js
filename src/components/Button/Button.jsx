import cn from 'classnames';

export const Button = ({ click, condition, mainClass, title }) => {
  return (
    <button
      type="button"
      onClick={click}
      className={cn(`button ${mainClass}`, {
        'is-light': condition,
      })}
    >
      {title}
    </button>
  );
};
