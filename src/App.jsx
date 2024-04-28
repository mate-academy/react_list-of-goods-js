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

const SORT_APLHABETICALLY = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';

function getPreparedGoods(goods, sortField, query) {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SORT_APLHABETICALLY:
      preparedGoods.sort();
      break;

    case SORT_BY_LENGTH:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      break;
  }

  if (!query) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [query, setQuery] = useState(true);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, query);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_APLHABETICALLY,
          })}
          onClick={() => {
            setSortField(SORT_APLHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => {
            setSortField(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': query,
          })}
          onClick={() => {
            setQuery(!query);
          }}
        >
          Reverse
        </button>

        {(!sortField && query) || (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setQuery(true);
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
