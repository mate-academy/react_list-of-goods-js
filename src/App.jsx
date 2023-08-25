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

function getPreparedGoods(goods, sortField) {
  const prepareGoods = [...goods];

  if (sortField) {
    prepareGoods.sort((good1, good2) => {
      switch (sortField.field) {
        case SORT_FIELD.BY_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_FIELD.BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return sortField.isReversed
    ? prepareGoods.reverse()
    : prepareGoods;
}

const SORT_FIELD = {
  BY_ALPHABET: 'alphabet',
  BY_LENGTH: 'length',
};

const defaultSortField = {
  field: '',
  isReversed: false,
};

export const App = () => {
  const [sortField, setSortField] = useState(defaultSortField);

  const visibleGoods
    = getPreparedGoods(goodsFromServer, sortField);

  const { field, isReversed } = sortField;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': !(field === SORT_FIELD.BY_ALPHABET) })}
          onClick={() => setSortField({
            ...sortField,
            field: SORT_FIELD.BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': !(field === SORT_FIELD.BY_LENGTH) })}
          onClick={() => setSortField({
            ...sortField,
            field: SORT_FIELD.BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn('button is-warning', {
              'is-light': !isReversed,
            })
          }
          onClick={() => setSortField({
            ...sortField,
            isReversed: !isReversed,
          })}
        >
          Reverse
        </button>

        {field || isReversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortField('')}
          >
            Reset
          </button>
        ) : ''}

      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
