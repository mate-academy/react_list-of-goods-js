import { useState } from 'react';

import 'bulma/css/bulma.css';
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

function getPrepareGoods(goods, paramSort = '', isReversed = false) {
  const prepareGoods = [...goods];

  prepareGoods.sort((goods1, goods2) => {
    switch (paramSort) {
      case 'alphabetically':
        return goods1.localeCompare(goods2);
      case 'byLength':
        return goods1.length - goods2.length;
      default:
        return 0;
    }
  });

  if (!isReversed) {
    return prepareGoods;
  }

  return prepareGoods.reverse();
}

const arraysAreEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  let isEqual = true;

  arr1.forEach((value, index) => {
    if (value !== arr2[index]) {
      isEqual = false;
    }
  });

  return isEqual;
};

export const App = () => {
  const [sortParam, setSortParam] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPrepareGoods(goodsFromServer, sortParam, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortParam === 'alphabetically' ? '' : 'is-light'}`}
          onClick={() => {
            setSortParam('alphabetically');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortParam === 'byLength' ? '' : 'is-light'}`}
          onClick={() => {
            setSortParam('byLength');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed === true ? '' : 'is-light'}`}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {!arraysAreEqual(visibleGoods, goodsFromServer) && (
          <button
            type="button"
            className={`button is-danger ${sortParam === '' && !isReversed ? '' : 'is-light'}`}
            onClick={() => {
              setSortParam('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
