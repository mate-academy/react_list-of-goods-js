import { useState } from 'react';
import cn from 'classnames/bind';
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

const SORT_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

const getSortedGoods = (goods, { sort, reverse }) => {
  if (sort) {
    goods.sort((a, b) => {
      switch (sort) {
        case SORT_ALPHABET:
          return a.localeCompare(b);

        case SORT_BY_LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    return goods.reverse();
  }

  return goods;
};

export const App = () => {
  const [sortedBy, setSortedBy] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getSortedGoods(
    [...goodsFromServer], { sort: sortedBy, reverse },
  );

  const handlerReset = () => {
    setSortedBy('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', { [`is-light`]: sortedBy !== SORT_ALPHABET })}
          onClick={() => setSortedBy(SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', { [`is-light`]: sortedBy !== SORT_BY_LENGTH })}
          onClick={() => setSortedBy(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { [`is-light`]: !reverse })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortedBy || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handlerReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
