import { useState } from 'react';
import cn from 'classnames';
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

const SORT_TYPE_ALPHABET = 'Sort alphabetically';
const SORT_TYPE_LENGTH = 'Sort by length';
const SORT_TYPE_REVERSE = 'Reverse';

function getPreparedGoods(goods, { sortType, isReverse }) {
  let preparedGoods = [...goods];

  if (isReverse === 1) {
    preparedGoods = preparedGoods
      .sort((good1, good2) => preparedGoods.indexOf(good2)
        - preparedGoods.indexOf(good1));
  }

  preparedGoods.sort((good1, good2) => {
    switch (sortType) {
      case SORT_TYPE_ALPHABET: {
        if (isReverse === 0) {
          return good1.localeCompare(good2);
        }

        return good2.localeCompare(good1);
      }

      case SORT_TYPE_LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  return preparedGoods;
}

export const App = () => {
  const [isReverse, setIsReverse] = useState(0);
  const [sortType, setSortType] = useState('');
  const sortedGoods = getPreparedGoods(
    goodsFromServer, { sortType, isReverse },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'button is-info is-light': sortType !== SORT_TYPE_ALPHABET,
          })}
          onClick={() => setSortType(SORT_TYPE_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'button is-success is-light': sortType !== SORT_TYPE_LENGTH,
          })}
          onClick={() => setSortType(SORT_TYPE_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'button is-warning is-light': sortType !== SORT_TYPE_REVERSE,
          })}
          onClick={() => {
            if (isReverse === 0) {
              setIsReverse(1);
            } else {
              setIsReverse(0);
            }

            setSortType(SORT_TYPE_REVERSE);
          }}
        >
          Reverse
        </button>
        {sortType && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType('');
              setIsReverse(0);
            }}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {sortedGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
