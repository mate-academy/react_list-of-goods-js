import 'bulma/css/bulma.css';
import cn from 'classnames';
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

const SORT_FIELD_ALPHABET = 'aplphabet';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_REVERSE = 'reverse';

const buttons = [
  {
    title: 'Sort alphabetically',
    value: SORT_FIELD_ALPHABET,
    className: 'is-info',
  },
  {
    title: 'Sort by length',
    value: SORT_FIELD_LENGTH,
    className: 'is-success',
  },
  {
    title: 'Reverse',
    value: SORT_FIELD_REVERSE,
    className: 'is-warning',
  },
];

function getPreparedGoods(goods, { sortField, query }) {
  let preparedGoods = [...goods];

  if (query) {
    preparedGoods = preparedGoods.reverse();
  }

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const goods = getPreparedGoods(goodsFromServer, {
    sortField,
    query: sortField === SORT_FIELD_REVERSE,
  });

  return (
    <div className="section content">
      <div className="buttons">
        {buttons.map(button => (
          <button
            key={button.value}
            type="button"
            className={cn('button', button.className, {
              'is-light': sortField !== button.value,
            })}
            onClick={() => setSortField(button.value)}
          >
            {button.title}
          </button>
        ))}

        {sortField && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortField(null)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
