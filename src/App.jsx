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

const ALPHABET_SORT = 'alphabetically';
const LENGTH_SORT = 'length';
const REVERSE = true;

function getSortedGoods(goods, { sortType, reverse }) {
  let preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((firstGood, secondGood) => {
      switch (sortType) {
        case ALPHABET_SORT:
          return firstGood.localeCompare(secondGood);

        case LENGTH_SORT:
          return firstGood.length - secondGood.length;

        default:
          return 0;
      }
    });
  }

  if (reverse === REVERSE) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortType, setsortType] = useState('');
  const [reverse, setReverse] = useState(false);
  const goodsCopy = getSortedGoods(goodsFromServer, { sortType, reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== ALPHABET_SORT,
          })}
          onClick={() => {
            setsortType(ALPHABET_SORT);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== LENGTH_SORT,
          })}
          onClick={() => {
            setsortType(LENGTH_SORT);
          }}
        >
          Sort by length
        </button>

        {!reverse ? (
          <button
            type="button"
            className="button is-warning is-light"
            onClick={() => {
              setReverse(REVERSE);
            }}
          >
            Reverse
          </button>
        ) : (
          <button
            type="button"
            className={cn('button', 'is-warning', {
              'is-light': sortType === REVERSE,
            })}
            onClick={() => {
              setReverse(false);
            }}
          >
            Reverse
          </button>
        )}

        {(sortType || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setsortType('');
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsCopy.map(good => (
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
