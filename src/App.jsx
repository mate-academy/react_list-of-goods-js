import 'bulma/css/bulma.css';
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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, reverseOrder }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseOrder) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseOrder, setReverseOrder] = useState(false);

  const goods = getPreparedGoods(goodsFromServer, { sortField, reverseOrder });
  const isGoods = goodsFromServer.every((good, i) => good === goods[i]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SORT_BY_ALPHABET);
          }}
          type="button"
          className={`button is-info ${sortField === SORT_BY_ALPHABET ? null : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SORT_BY_LENGTH);
          }}
          type="button"
          className={`button is-success ${sortField === SORT_BY_LENGTH ? null : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReverseOrder(!reverseOrder);
          }}
          type="button"
          className={`button is-warning ${reverseOrder ? null : 'is-light'}`}
        >
          Reverse
        </button>
        {!isGoods ? (
          <button
            onClick={() => {
              setSortField('');
              setReverseOrder(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
