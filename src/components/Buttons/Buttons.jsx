import cn from 'classnames';

import { SORT_BY } from '../../constants/sortBy';

export const Buttons = ({ sortField, sortedBy }) => {
  console.log('');

  return (
    <div className="buttons">
      <button
        type="button"
        className={`button is-info ${
          sortField !== SORT_BY.ALPHABET && 'is-light'
        }`}
        onClick={() => sortedBy(SORT_BY.ALPHABET)}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className={cn('button', 'is-success', {
          'is-light': sortField !== SORT_BY.LENGTH,
        })}
        onClick={() => sortedBy(SORT_BY.LENGTH)}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={cn('button', 'is-warning', {
          'is-light':
            sortField !== SORT_BY.REVERSE,
        })}
        onClick={() => sortedBy(SORT_BY.REVERSE)}
      >
        Reverse
      </button>

      {sortField !== '' && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => sortedBy('')}
        >
          Reset
        </button>
      )}
    </div>
  );
};
