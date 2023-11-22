import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';
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

const SORT_ABC = 'Sort alphabetically';
const SORT_LENGTH = 'Sort by length';

const getPreparedGoods = (goods, sortField, isReverseField = false) => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_ABC:
          return good1.localeCompare(good2);

        case SORT_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverseField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverseField, setIsReverseField] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    isReverseField,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            ' is-light': sortField !== SORT_ABC,
          })}
          onClick={() => setSortField(SORT_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            ' is-light': sortField !== SORT_LENGTH,
          })}
          onClick={() => setSortField(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            ' is-light': !isReverseField,
          })}
          onClick={() => setIsReverseField(!isReverseField)}
        >
          Reverse
        </button>

        {(sortField || isReverseField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setIsReverseField(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
