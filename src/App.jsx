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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, sortField, reversedOrder) {
  const preparedGoods = [...goods];

  if (sortField || reversedOrder) {
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

  return reversedOrder ? preparedGoods.reverse() : preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversedOrder, setReversedOrder] = useState(false);
  const goodsToDispaly
    = getPreparedGoods(goodsFromServer, sortField, reversedOrder);

  const resetGoodsFormat = () => {
    setSortField('');
    setReversedOrder(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': !(sortField === SORT_FIELD_ALPHABET) },
          )}
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABET, reversedOrder);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': !(sortField === SORT_FIELD_LENGTH) },
          )}
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH, reversedOrder);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !reversedOrder },
          )}
          onClick={() => {
            setReversedOrder(!reversedOrder);
          }}
        >
          Reverse
        </button>

        {(sortField || reversedOrder) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoodsFormat}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsToDispaly.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
