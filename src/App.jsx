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

const SORT_GOODS_NAME = 'name';
const SORT_GOODS_LENGTH = 'length';

function getPreparedGoods(goods, sortField, reversField) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_GOODS_NAME:
          return good1.localeCompare(good2);

        case SORT_GOODS_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversField, setReversField] = useState(false);
  const visibleGoods = (
    getPreparedGoods(goodsFromServer, sortField, reversField)
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SORT_GOODS_NAME);
          }}
          type="button"
          className={
            cn(
              'button',
              'is-info',
              { 'is-light': sortField !== SORT_GOODS_NAME },
            )
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SORT_GOODS_LENGTH);
          }}
          type="button"
          className={
            cn(
              'button',
              'is-success',
              { 'is-light': sortField !== SORT_GOODS_LENGTH },
            )
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReversField(!reversField);
          }}
          type="button"
          className={
            cn(
              'button',
              'is-warning',
              { 'is-light': !reversField },
            )
          }
        >
          Reverse
        </button>

        {(sortField || reversField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReversField(false);
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
