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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(goods, sortOrder, isReverse) {
  const preparedGoods = [...goods];

  if (sortOrder) {
    preparedGoods.sort((a, b) => {
      switch (sortOrder) {
        case SORT_BY_ALPHABET:
          return a.localeCompare(b);

        case SORT_BY_LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortOrder, setSortOrder] = useState('');
  const [isReverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortOrder, isReverse);

  const showReset = sortOrder || isReverse;

  const setGoodsByDefault = () => {
    setSortOrder('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortOrder !== SORT_BY_ALPHABET },
          )}
          onClick={() => setSortOrder(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortOrder !== SORT_BY_LENGTH },
          )}
          onClick={() => setSortOrder(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReverse },
          )}
          onClick={() => setReverse(!isReverse)}
        >
          Reverse
        </button>

        {showReset && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={setGoodsByDefault}
        >
          Reset
        </button>
        )}
      </div>

      <ul>
        {
          visibleGoods.map(good => (
            <li
              data-cy="Good"
              key={good}
            >
              {good}
            </li>
          ))
        }
      </ul>
    </div>
  );
};
