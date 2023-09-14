import { useState } from 'react';
import cn from 'classnames';
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

const SORT_FIELD_ABC = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_REVERSE = 'reverse';

function getPreparedGood(goods, sortField) {
  const preparedGoods = [...goods];

  if (sortField === SORT_FIELD_ABC) {
    preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortField === SORT_FIELD_LENGTH) {
    preparedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (sortField === SORT_FIELD_REVERSE) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const visibleGoods = getPreparedGood(goodsFromServer, sortField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ABC)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ABC,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_REVERSE)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': sortField !== SORT_FIELD_REVERSE,
          })}
        >
          Reverse
        </button>

        {sortField !== '' && (
          <button
            onClick={() => setSortField('')}
            type="button"
            className="button is-danger is-light"
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
