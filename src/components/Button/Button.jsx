import cn from 'classnames';
import { FUNCTIONS } from '../functions';

export const Button = ({
  name,
  text,
  colorName,
  colorNameCondition,
  sortField,
  setSortField,
  setReverseField,
}) => {
  return (
    <button
      onClick={() => {
        if (setReverseField) {
          setReverseField('');
        }

        FUNCTIONS.checkField(name, sortField, setSortField);
      }}
      type="button"
      className={cn(`button ${colorName} `, {
        'is-light': colorNameCondition,
      })}
    >
      {text}
    </button>
  );
};
