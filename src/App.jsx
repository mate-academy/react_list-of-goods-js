import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

const SORT_FIELD_ALPHABETICALLY = 'name';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, isReversedField }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1[sortField] - good2[sortField];

        default:
          return 0;
      }
    });
  }

  return isReversedField
    ? preparedGoods.reverse()
    : preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversedField, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, isReversedField },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPHABETICALLY },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(!isReversedField)}
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversedField },
          )}
        >
          Reverse
        </button>

        {(sortField !== '' || isReversedField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversed(false);
              setSortField('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
