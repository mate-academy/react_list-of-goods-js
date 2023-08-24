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

const SORT_FIELD_STATES = {
  BY_ALPHABET: 'alphabet',
  BY_LENGTH: 'length',
};

const defaultSortField = {
  field: '',
  isReversed: false,
};

const sortGoods = (goods, obj) => {
  const result = [...goods].sort((firstGood, secondGood) => {
    switch (obj.field) {
      case SORT_FIELD_STATES.BY_ALPHABET:
        return firstGood.localeCompare(secondGood);
      case SORT_FIELD_STATES.BY_LENGTH:
        return firstGood.length - secondGood.length;
      default:
        return 0;
    }
  });

  return obj.isReversed
    ? result.reverse()
    : result;
};

export const App = () => {
  const [sortField, setSortField] = useState(defaultSortField);

  const visibleGoods = sortGoods(goodsFromServer, sortField);
  const { field, isReversed } = sortField;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn('button is-info', {
              'is-light': !(field === SORT_FIELD_STATES.BY_ALPHABET),
            })
          }
          onClick={() => setSortField({
            ...sortField,
            field: SORT_FIELD_STATES.BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn('button is-success', {
              'is-light': !(field === SORT_FIELD_STATES.BY_LENGTH),
            })
          }
          onClick={() => setSortField({
            ...sortField,
            field: SORT_FIELD_STATES.BY_LENGTH,
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
            onClick={() => setSortField({
              field: '',
              isSorted: false,
            })}
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
