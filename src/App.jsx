import 'bulma/css/bulma.css';
import './App.scss';

import cn from 'classnames';
import { useState } from 'react';

const SORT_FIELD = {
  ALPHABET: 'name',
  LENGTH: 'length',
  NONE: 'none',
};

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

function getPreparedGoods(goods, { sortField, reverseField }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((element1, element2) => {
      switch (sortField) {
        case SORT_FIELD.LENGTH:
          return element1[sortField] - element2[sortField];

        case SORT_FIELD.ALPHABET:
          return element1.localeCompare(element2);

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SORT_FIELD.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer,
    { sortField, reverseField: isReversed });

  const handleSort = field => () => setSortField(field);
  const handleReverse = () => setIsReversed(prevIsReversed => !prevIsReversed);
  const handleReset = () => {
    setIsReversed(false);
    setSortField(SORT_FIELD.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSort(SORT_FIELD.ALPHABET)}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SORT_FIELD.ALPHABET })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSort(SORT_FIELD.LENGTH)}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SORT_FIELD.LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={cn('button is-warning',
            { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        {
          ((sortField || isReversed) && (sortField !== SORT_FIELD.NONE)) && (
            <button
              onClick={handleReset}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {visibleGoods.map(element => (
          <li data-cy="Good">{element}</li>
        ))}
      </ul>
    </div>
  );
};
