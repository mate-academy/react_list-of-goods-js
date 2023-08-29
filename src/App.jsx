import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

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

const SORT_ALPHABETICALLY_VALUE = 'Sort alphabetically';
const SORT_BY_LENGTH_VALUE = 'Sort by length';
const RESET_VALUE = 'Reset';
const REVERSE_VALUE = 'Reverse';
const REVERSE_DEFAULT_VALUE = false;

function getGoodsSorted(goods, sortKey, reverse) {
  const tempGoods = [...goods];

  if (sortKey !== '') {
    tempGoods.sort((goodA, goodB) => {
      switch (sortKey) {
        case SORT_ALPHABETICALLY_VALUE:
          return goodA.localeCompare(goodB);

        case SORT_BY_LENGTH_VALUE:
          return goodA.length - goodB.length;

        default:
          return 0;
      }
    });
  }

  return (reverse !== REVERSE_DEFAULT_VALUE
    ? tempGoods.reverse()
    : tempGoods);
}

export const App = () => {
  const [sortSelect, setSortSelect] = useState('');
  const [reverseSelect, setReverseSelect] = useState(REVERSE_DEFAULT_VALUE);

  const sortedGoods = getGoodsSorted(
    goodsFromServer, sortSelect, reverseSelect,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortSelect !== SORT_ALPHABETICALLY_VALUE,
          })}
          onClick={() => {
            setSortSelect(SORT_ALPHABETICALLY_VALUE);
          }}
        >
          {SORT_ALPHABETICALLY_VALUE}
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortSelect !== SORT_BY_LENGTH_VALUE,
          })}
          onClick={() => {
            setSortSelect(SORT_BY_LENGTH_VALUE);
          }}
        >
          {SORT_BY_LENGTH_VALUE}
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reverseSelect === REVERSE_DEFAULT_VALUE,
          })}
          onClick={() => {
            setReverseSelect(!reverseSelect);
          }}
        >
          {REVERSE_VALUE}
        </button>

        {(sortSelect || reverseSelect) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortSelect('');
              setReverseSelect(REVERSE_DEFAULT_VALUE);
            }}
          >
            {RESET_VALUE}
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
