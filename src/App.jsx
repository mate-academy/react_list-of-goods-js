import { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_BY_CHOICES = {
  alphabetically: 'alphabetically',
  byLength: 'length',
};

function sortGoods(sortBy, reverse) {
  const sorted = [...goodsFromServer].sort((good1, good2) => {
    switch (sortBy) {
      case SORT_BY_CHOICES.alphabetically:
        return good1.localeCompare(good2);
      case SORT_BY_CHOICES.byLength:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reverse) {
    return sorted.toReversed();
  }

  return sorted;
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = sortGoods(sortBy, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SORT_BY_CHOICES.alphabetically,
          })}
          onClick={() => setSortBy(SORT_BY_CHOICES.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SORT_BY_CHOICES.byLength,
          })}
          onClick={() => setSortBy(SORT_BY_CHOICES.byLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>
        {(sortBy !== '' || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy('');
              setReverse(false);
            }}
            hidden={sortBy === '' && !reverse}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
