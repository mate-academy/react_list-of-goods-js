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

const SORT_FIELD_ALPH = 'alph';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, sortField, toReverse) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPH:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (toReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversedField, setReversedField] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer, sortField, reversedField,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_ALPH)}
          className={cn('button is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPH })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          className={cn('button is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReversedField(!reversedField)}
          className={cn('button is-warning',
            { 'is-light': !reversedField })}
        >
          Reverse
        </button>

        {(sortField !== '' || reversedField !== false) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReversedField(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good.key} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
