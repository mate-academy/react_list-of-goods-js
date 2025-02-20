import { useState } from 'react';
import 'bulma/css/bulma.css';
import classname from 'classnames';
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

const SORT = {
  alphabetically: 'alphabetically',
  byLength: 'length',
};

function sortGoods(sortBy, reverse) {
  const sorted = [...goodsFromServer].sort((a, b) => {
    switch (sortBy) {
      case SORT.alphabetically:
        return a.localeCompare(b);
      case SORT.byLength:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (reverse) {
    return sorted.reverse();
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
          className={classname('button', 'is-info', {
            'is-light': sortBy !== SORT.alphabetically,
          })}
          onClick={() => setSortBy(SORT.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classname('button', 'is-success', {
            'is-light': sortBy !== SORT.byLength,
          })}
          onClick={() => setSortBy(SORT.byLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classname('button', 'is-warning', {
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
