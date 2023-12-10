import cn from 'classnames';

import { ORDER, DIRECTION } from '../../constants';

export const Buttons = ({
  sortAlphabetically,
  sortByLength,
  reverse,
  reset,
  order,
  direction,
}) => (
  <div className="buttons">
    <button
      type="button"
      className={cn('button', 'is-info', {
        'is-light': order !== ORDER.ALPHABETICALLY,
      })}
      onClick={sortAlphabetically}
    >
      Sort alphabetically
    </button>

    <button
      type="button"
      className={cn('button', 'is-success', {
        'is-light': order !== ORDER.BY_LENGTH,
      })}
      onClick={sortByLength}
    >
      Sort by length
    </button>

    <button
      type="button"
      className={cn('button', 'is-warning', {
        'is-light': direction !== DIRECTION.OPPOSITE,
      })}
      onClick={reverse}
    >
      Reverse
    </button>

    { (direction !== DIRECTION.DIRECTLY || order !== ORDER.BY_DEFAULT)
      && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={reset}
        >
          Reset
        </button>
      )}
  </div>
);
