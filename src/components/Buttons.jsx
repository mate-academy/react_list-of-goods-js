import classNames from 'classnames';

import {
  RESET_VALUE,
  SORT_BY_LENGTH,
  SORT_BY_NAME,
  REVERSE,
} from '../variables';

export const Buttons = ({ sortBy, onSort, reverse, onReverse }) => {

  return (
    <div className="buttons">
      <button
        type="button"
        className={classNames('button', 'is-info', {
          'is-light': SORT_BY_NAME !== sortBy,
        })}
        onClick={() => onSort(SORT_BY_NAME)}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className={classNames('button', 'is-info', {
          'is-light': SORT_BY_LENGTH !== sortBy,
        })}
        onClick={() => onSort(SORT_BY_LENGTH)}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={classNames('button', 'is-info', {
          'is-light': !reverse,
        })}
        onClick={() => {
          onReverse(!reverse);
        }}
      >
        Reverse
      </button>

      {(sortBy || reverse) && (
        <button
          type="button"
          className="button is-info"
          onClick={() => {
            onSort(RESET_VALUE);
            onReverse(REVERSE);
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
};
