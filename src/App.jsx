import { useState } from 'react';
import 'bulma/css/bulma.css';

import './App.scss';
import { GoodList } from './Goodlist/Goodlist';

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

const SORT_ALPHABET = 'alphabet';
const SORT_LENGTH = 'length';

function getPreparedGoods(goods, { sortMethod, isReversed }) {
  let preparedGoods = [...goods];

  if (sortMethod) {
    preparedGoods.sort((good1, good2) => {
      switch (sortMethod) {
        case SORT_LENGTH:
          return good1.length - good2.length;

        case SORT_ALPHABET:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortMethod, setSortMethod] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortMethod,
    isReversed,
  });
  const isResetVisible = sortMethod !== '' || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortMethod === SORT_ALPHABET ? '' : 'is-light'}`}
          onClick={() => setSortMethod(SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortMethod === SORT_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortMethod(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortMethod('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
