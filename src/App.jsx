import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

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

function getPreparedGoods(goods, sortType, isRevers) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isRevers) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isRevers, setIsRevers] = useState(false);

  const goods = getPreparedGoods(goodsFromServer, sortField, isRevers);

  const reset = () => {
    setSortField('');
    setIsRevers(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          type="button"
          className={`button is-info ${cn({
            'is-light': sortField !== SORT_FIELD_ALPHABET,
          })}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={`button is-success ${cn({
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsRevers(!isRevers)}
          type="button"
          className={`button is-warning ${cn({
            'is-light': isRevers === false,
          })}`}
        >
          Reverse
        </button>

        {
          (sortField !== '' || isRevers)
          && (
            <button
              onClick={reset}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {goods.map(good => (
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
