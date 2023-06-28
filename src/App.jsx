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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';
const SORT_DIRECTION_ASC = 'asc';
const SORT_DIRECTION_DESC = 'desc';

function sortGoods(goods, { sortField, sortDirection }) {
  const localGoods = [...goods];

  if (!sortField && sortDirection) {
    return localGoods.reverse();
  }

  localGoods.sort((good1, good2) => {
    switch (sortField) {
      default:
        return 0;

      case SORT_FIELD_NAME:
        return sortDirection === SORT_DIRECTION_ASC
          ? good2.localeCompare(good1)
          : good1.localeCompare(good2);

      case SORT_FIELD_LENGTH:
        return sortDirection === SORT_DIRECTION_ASC
          ? good2.length - good1.length
          : good1.length - good2.length;
    }
  });

  return localGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('');

  const showGoods = sortGoods(goodsFromServer, { sortField, sortDirection });

  const reset = () => {
    setSortField('');
    setSortDirection('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            ['button', 'is-info'],
            { 'is-light': sortField !== SORT_FIELD_NAME },
          )}
          onClick={() => setSortField(SORT_FIELD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            ['button', 'is-success'],
            { 'is-light': sortField !== SORT_FIELD_LENGTH },
          )}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            ['button', 'is-warning'],
            { 'is-light': sortDirection === SORT_DIRECTION_DESC },
          )}
          onClick={() => {
            const direction = sortDirection === SORT_DIRECTION_DESC
              ? SORT_DIRECTION_ASC
              : SORT_DIRECTION_DESC;

            setSortDirection(direction);
          }}
        >
          Reverse
        </button>

        {(sortField || sortDirection) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {showGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
