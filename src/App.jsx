import 'bulma/css/bulma.css';

import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

function getPrepareGoods(goods, sortType, isReverse) {
  let prepareGoods = goods;

  if (!sortType && !isReverse) {
    return prepareGoods;
  }

  if (prepareGoods.length) {
    prepareGoods = [...goods].sort((good1, good2) => {
      switch (sortType) {
        case 'alphabetically':
          return (good1.localeCompare(good2));

        case 'length':
          return (good1.length - good2.length);

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    prepareGoods = prepareGoods.reverse();
  }

  return prepareGoods;
}

export function App() {
  const [sortType, setSortType] = useState('');
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getPrepareGoods(goodsFromServer, sortType, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info', { 'is-light': sortType !== 'alphabetically' },
          )}
          onClick={() => setSortType('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success', { 'is-light': sortType !== 'length' },
          )}
          onClick={() => setSortType('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning', { 'is-light': !reverse },
          )}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortType.length > 0 || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType('');
              setReverse(false);
            }}
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
}
