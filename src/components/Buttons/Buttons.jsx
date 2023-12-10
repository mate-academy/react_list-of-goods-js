import cn from 'classnames';

import { SORT_BY } from '../../constants/sortBy';

export const Buttons = ({ sortedBy, setSortedBy }) => {
  const reverse = () => {
    if (sortedBy === SORT_BY.REVERSE_A) {
      setSortedBy(SORT_BY.REVERSE_B);
    } else {
      setSortedBy(SORT_BY.REVERSE_A);
    }
  };

  return (
    <div className="buttons">
      <button
        type="button"
        className={`button is-info ${
          sortedBy !== SORT_BY.ALPHABET && 'is-light'
        }`}
        onClick={() => setSortedBy(SORT_BY.ALPHABET)}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className={cn('button', 'is-success', {
          'is-light': sortedBy !== SORT_BY.LENGTH,
        })}
        onClick={() => setSortedBy(SORT_BY.LENGTH)}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={cn('button', 'is-warning', {
          'is-light':
            sortedBy !== SORT_BY.REVERSE_A || sortedBy === SORT_BY.REVERSE_B,
        })}
        onClick={reverse}
      >
        Reverse
      </button>

      {sortedBy !== '' && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => setSortedBy('')}
        >
          Reset
        </button>
      )}
    </div>
  );
};
