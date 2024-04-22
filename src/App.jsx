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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_REVERSE = 'reverse';

function getPreparedGoods(goods, sortedField) {
  const preparedGoods = [...goods];

  if (sortedField.includes(SORT_FIELD_ALPHABETICALLY)) {
    preparedGoods.sort((good1, good2) => {
      return good1.localeCompare(good2);
    });
  }

  if (sortedField.includes(SORT_FIELD_LENGTH)) {
    preparedGoods.sort((good1, good2) => {
      return good1.length - good2.length;
    });
  }

  if (sortedField.includes(SORT_FIELD_REVERSE)) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState([]);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField);

  function updateSortField(field) {
    if (field === SORT_FIELD_REVERSE) {
      setSortField(
        sortField.includes(field)
          ? [...sortField].filter(currentField => currentField !== field)
          : [...sortField, field],
      );
    } else {
      setSortField(
        field === SORT_FIELD_LENGTH
          ? [...sortField, field].filter(
              currentField => currentField !== SORT_FIELD_ALPHABETICALLY,
            )
          : [...sortField, field].filter(
              currentField => currentField !== SORT_FIELD_LENGTH,
            ),
      );
    }
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': !sortField.includes(SORT_FIELD_ALPHABETICALLY),
          })}
          onClick={() => updateSortField(SORT_FIELD_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': !sortField.includes(SORT_FIELD_LENGTH),
          })}
          onClick={() => updateSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !sortField.includes(SORT_FIELD_REVERSE),
          })}
          onClick={() => updateSortField(SORT_FIELD_REVERSE)}
        >
          Reverse
        </button>

        {sortField.length > 0 && (
          <>
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => setSortField([])}
            >
              Reset
            </button>
          </>
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
