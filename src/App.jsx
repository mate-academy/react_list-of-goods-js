import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

const SORT_BY_LENGTH = 'length';
const SORT_BY_ABC = 'abc';

const getSortedGoods = (sortType, reversed) => {
  let sortedGoods = [...goodsFromServer];

  if (sortType) {
    sortedGoods.sort((a, b) => {
      switch (sortType) {
        case SORT_BY_ABC:
          return a.localeCompare(b);
        case SORT_BY_LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    sortedGoods = sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [reversed, setReversed] = useState(false);

  const visibleGoods = getSortedGoods(sortType, reversed);

  const handleSort = type => {
    setSortType(type);
  };

  const handleReverse = () => {
    setReversed(!reversed);
  };

  const handleReset = () => {
    setReversed(false);
    setSortType('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => handleSort(SORT_BY_ABC)}
          className={cn('button', 'is-info', {
            'is-light': sortType !== SORT_BY_ABC,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => handleSort(SORT_BY_LENGTH)}
          className={cn('button', 'is-success', {
            'is-light': sortType !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={cn('button', 'is-warning', { 'is-light': !reversed })}
        >
          Reverse
        </button>
        {(sortType || reversed) && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
