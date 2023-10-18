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
        case sortBy.ALPHABET:
          return first.localeCompare(second);

        case sortBy.LENGTH:
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

const sortBy = {
  ALPHABET: 'alphabet',
  LENGTH: 'length',
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, reverseArray: isReversed },
  );

  const resetButton = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== sortBy.ALPHABET })}
          onClick={() => setSortField(sortBy.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== sortBy.LENGTH })}
          onClick={() => setSortField(sortBy.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {
          (sortField || isReversed) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={resetButton}
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
