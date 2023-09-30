import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
import { useState } from 'react';
import { GoodList } from './components/GoodList/GoodList';

const SORT_FIELD_ALPHABET = 'name';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_REVERESE = 'id';

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

function getPreparedGoods(goods, { sortField }) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1[sortField] - good2[sortField];

        case SORT_FIELD_REVERESE:
          return preparedGoods.reverse();

        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');

  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortField },
  );

  return (
    <div className="section content">
      <div className="buttons">

        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPHABET },
          )}

        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_REVERESE)}
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': visibleGoods },
          )}
        >
          Reverse
        </button>

        {sortField && (
          <button
            onClick={() => setSortField('')}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}

      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
