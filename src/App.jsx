import cn from 'classnames';
import { useState } from 'react';

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

function getPreparedGoods(goods, { sortField, reverseArray }) {
  const visibleGoods = [...goods];

  if (sortField) {
    visibleGoods.sort((first, second) => {
      switch (sortField) {
        case SORT_BY.ALPHABET:
          return first.localeCompare(second);

        case SORT_BY.LENGTH:
          return first.length - second.length;

        default:
          return visibleGoods;
      }
    });
  }

  if (reverseArray) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

const SORT_BY = {
  ALPHABET: 'alphabet',
  LENGTH: 'length',
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseArray, setReverseArray] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, reverseArray },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SORT_BY.ALPHABET })}
          onClick={() => setSortField(SORT_BY.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SORT_BY.LENGTH })}
          onClick={() => setSortField(SORT_BY.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': !reverseArray })}
          onClick={() => setReverseArray(!reverseArray)}
        >
          Reverse
        </button>

        {
          (sortField || reverseArray) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortField('');
                setReverseArray(false);
              }}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {
          visibleGoods.map(good => (
            <li
              key={good}
              data-cy="Good"
            >
              {good}
            </li>
          ))
        }
      </ul>
    </div>
  );
};
