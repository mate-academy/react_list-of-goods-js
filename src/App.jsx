import 'bulma/css/bulma.css';
import classNames from 'classnames';

import { useState } from 'react';
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

const sortByABC = 'abc';
const sortByLength = 'length';

const sorting = (goodsArr, sortBy, isReversed) => {
  const preparedGoods = [...goodsArr];

  if (sortBy) {
    preparedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case sortByABC:
          return good1.localeCompare(good2);

        case sortByLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortMethod, setSortMethod] = useState('');
  const [isReversed, setOrder] = useState(false);

  const visibleGoods = sorting(goodsFromServer, sortMethod, isReversed);

  const makeSetSortMethod = (sortingMethod) => {
    setSortMethod(sortingMethod);
  };

  const makeSetOrder = () => setOrder(!isReversed);

  const makeReset = () => {
    setSortMethod('');
    setOrder(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortMethod !== sortByABC,
          })}
          onClick={setSortMethod(sortByABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortMethod !== sortByLength,
          })}
          onClick={makeSetSortMethod(sortByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': isReversed === false,
          })}
          onClick={makeSetOrder()}
        >
          Reverse
        </button>

        {(isReversed || sortMethod) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={makeReset()}
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
