import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';

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

const SORT_BY_ALPH = 'alphabet';
const SORT_BY_LENGTH = 'length';

function sortByStatus(goods, { sortStatus, reversed }) {
  const preparedGoods = [...goods];

  if (sortStatus !== '') {
    preparedGoods.sort((item1, item2) => {
      switch (sortStatus) {
        case SORT_BY_ALPH:
          return item1.localeCompare(item2);
        case SORT_BY_LENGTH:
          return item1.length - item2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortStatus, setSortStatus] = useState('');
  const [reversed, setReversed] = useState(false);
  const visibleGood = sortByStatus(goodsFromServer, { sortStatus, reversed });
  const reset = goodsFromServer.every(
    (value, index) => value !== visibleGood[index],
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortStatus !== SORT_BY_ALPH,
          })}
          onClick={() => {
            setSortStatus(SORT_BY_ALPH);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortStatus !== SORT_BY_LENGTH,
          })}
          onClick={() => {
            setSortStatus(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => {
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {reset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReversed(false);
              setSortStatus('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGood.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
