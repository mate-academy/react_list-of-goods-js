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

const SORT_FILED_ALPHABETICALLY = 'alphabetically';
const SORT_FILED_BY_LENGTH = 'length';
const REVERSE = true;

function getPreparedGoods(goods, { sortField, reverse }) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((firstGood, secondGood) => {
      switch (sortField) {
        case SORT_FILED_ALPHABETICALLY:
          return firstGood.localeCompare(secondGood);

        case SORT_FILED_BY_LENGTH:
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
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const goodsCopy = getPreparedGoods(goodsFromServer, { sortField, reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FILED_ALPHABETICALLY,
          })}
          onClick={() => {
            setSortField(SORT_FILED_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FILED_BY_LENGTH,
          })}
          onClick={() => {
            setSortField(SORT_FILED_BY_LENGTH);
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
              'is-light': sortField === REVERSE,
            })}
            onClick={() => {
              setReverse(false);
            }}
          >
            Reverse
          </button>
        )}

        {(sortField || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
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
