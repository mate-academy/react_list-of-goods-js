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

const SORT_FIELD_ALPHABETICALLY = 'Sort alphabetically';
const SORT_FIELD_BY_LENGTH = 'Sort by length';
const RESET_FIELD = 'Reset';
const EMPTY_FIELD = '';

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortField) {
      case SORT_FIELD_ALPHABETICALLY:
        return good1.localeCompare(good2);
      case SORT_FIELD_BY_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(EMPTY_FIELD);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const handleReset = () => {
    setSortField(EMPTY_FIELD);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETICALLY,
          })}
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_BY_LENGTH,
          })}
          onClick={() => setSortField(SORT_FIELD_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className={cn('button is-danger', {
              'is-light': sortField !== RESET_FIELD,
            })}
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      {visibleGoods.map(good => (
        <ul key={good}>
          <li data-cy="Good">{good}</li>
        </ul>
      ))}
    </div>
  );
};
