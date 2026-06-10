import 'bulma/css/bulma.css';
import cn from 'classnames';
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

const ALPHABET_SORT = 'Alphabet';
const LENGTH_SORT = 'Length';
const RESET = '';

function sortGoods(goods, filter, reverse) {
  const sortedGoods = [...goods];

  if (filter === ALPHABET_SORT) {
    sortedGoods.sort();
  }

  if (filter === LENGTH_SORT) {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  if (reverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [filterState, setFilterState] = useState('');
  const [reverse, setReverse] = useState(false);

  const isResetVisible = filterState || reverse;
  const filteredGoods = sortGoods(goodsFromServer, filterState, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': filterState !== ALPHABET_SORT,
          })}
          onClick={() => {
            setFilterState(ALPHABET_SORT);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': filterState !== LENGTH_SORT,
          })}
          onClick={() => {
            setFilterState(LENGTH_SORT);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => {
            setReverse(prev => !prev);
          }}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className={cn('button', 'is-danger', {
              'is-light': filterState !== RESET,
            })}
            onClick={() => {
              setFilterState(RESET);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {filteredGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
