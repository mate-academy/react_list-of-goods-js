import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { useState } from 'react';
import { GoodsList } from './components/GoodList';

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

const SORT_TYPE = { length: 'length', alphabet: 'alphabet' };

function sortPreparedGoods(arr, sortBy, isReverse) {
  let preparedGoodsList = [...arr];

  switch (sortBy) {
    case SORT_TYPE.length:
      preparedGoodsList.sort((a, b) => a.length - b.length);
      break;

    case SORT_TYPE.alphabet:
      preparedGoodsList.sort((a, b) => a.localeCompare(b));
      break;

    default: preparedGoodsList = [...goodsFromServer];
  }

  if (isReverse) {
    preparedGoodsList.reverse();
  }

  return preparedGoodsList;
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const preparedGoodsList = sortPreparedGoods(
    goodsFromServer,
    sortBy,
    isReverse,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortBy !== SORT_TYPE.alphabet },
          )}
          onClick={() => setSortBy(SORT_TYPE.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortBy !== SORT_TYPE.length },
          )}
          onClick={() => setSortBy(SORT_TYPE.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReverse },
          )}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(sortBy || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReverse(false);
              setSortBy('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={preparedGoodsList} />
    </div>
  );
};
