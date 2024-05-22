import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

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

function sortByType(goods, sortType, reverse) {
  const sortedGoods = [...goods];

  sortedGoods.sort((good1, good2) => {
    switch (sortType) {
      case 'Sort alphabetically':
        return good1.localeCompare(good2);

      case 'Sort by length':
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (reverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [reverse, setReverse] = useState(false);

  const goods = sortByType(goodsFromServer, sortType, reverse);

  function reset() {
    setReverse(false);
    setSortType('');
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== 'Sort alphabetically',
          })}
          onClick={() => setSortType('Sort alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== 'Sort by length',
          })}
          onClick={() => setSortType('Sort by length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortType !== '' || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
