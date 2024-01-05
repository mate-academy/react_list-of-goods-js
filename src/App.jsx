import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
import { SORT_BY_LENGTH, SORT_BY_ALPHABET } from './utils';

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

function formatGoods(goods, isReverse, sortMode) {
  const data = [...goods];

  switch (sortMode) {
    case ('alphabetically'):
      data.sort((a, b) => a.localeCompare(b));
      break;
    case ('by length'):
      data.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  return isReverse ? data.reverse() : data;
}

export const App = () => {
  const [isReverse, setIsReverse] = useState(false);
  const [sortMode, setSortMode] = useState(null);
  const goods = formatGoods(goodsFromServer, isReverse, sortMode);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortMode !== SORT_BY_ALPHABET })}
          onClick={() => setSortMode(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortMode !== SORT_BY_LENGTH })}
          onClick={() => setSortMode(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': !isReverse })}
          onClick={() => setIsReverse(prevIsReverse => !prevIsReverse)}
        >
          Reverse
        </button>

        {(isReverse || sortMode) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReverse(false);
              setSortMode(null);
            }}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
