import { useState } from 'react';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';

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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, sortField, isReversed) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState();
  const hasActiveSort = sortField || isReversed;
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField, isReversed,
  });
  const handleButtonReset = () => {
    setSortField('');
    setIsReversed(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SORT_FIELD_NAME },
          )}
          onClick={() => setSortField(SORT_FIELD_NAME)}
          type="button"
        >
          Sort alphabetically
        </button>

        <button
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH },
          )}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
        >
          Sort by length
        </button>

        <button
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed(!isReversed)}
          type="button"
        >
          Reverse
        </button>

        {hasActiveSort && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleButtonReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            key={uuidv4()}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
