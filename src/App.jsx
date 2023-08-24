import { useState } from 'react';

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

function getPreparedGoods(goods, { sortField, reverse }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          throw new Error('Sorting went wrong...');
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);

  const goods = getPreparedGoods(goodsFromServer, { sortField, reverse });

  const sortFieldAlphabet = () => {
    setSortField(SORT_FIELD_ALPHABET);
  };

  const sortFieldLength = () => {
    setSortField(SORT_FIELD_LENGTH);
  };

  const reset = () => {
    setReverse(false);
    setSortField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SORT_FIELD_ALPHABET && 'is-light'}`}
          onClick={sortFieldAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SORT_FIELD_LENGTH && 'is-light'}`}
          onClick={sortFieldLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reverse && 'is-light'}`}
          onClick={() => setReverse(prev => !prev)}
        >
          Reverse
        </button>

        {goods.join`` !== goodsFromServer.join``
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={reset}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
