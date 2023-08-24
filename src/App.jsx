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

function getPreparedGoods(goods) {
  return goods.map((good, index) => ({ good, key: index }));
}

const preparedGoods = getPreparedGoods(goodsFromServer);

// eslint-disable-next-line no-console
console.log(preparedGoods);

const SORT_BY_ALPHABET = 'alpha';
const SORT_BY_LENGTH = 'length';

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(preparedGoods);
  const [resetButtonHidden, setResetButtonHidden] = useState(false);

  function getSortBy(products, sortBy) {
    if (sortBy === SORT_BY_ALPHABET) {
      return () => {
        setResetButtonHidden(true);
        setVisibleGoods([...products]
          .sort((good1, good2) => good1.good.localeCompare(good2.good)));
      };
    }

    if (sortBy === SORT_BY_LENGTH) {
      return () => {
        setResetButtonHidden(true);
        setVisibleGoods([...products]
          .sort((good1, good2) => good1.good.length - good2.good.length));
      };
    }

    return () => {
      setResetButtonHidden(true);
      setVisibleGoods([...visibleGoods].reverse());
    };
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={getSortBy(preparedGoods, SORT_BY_ALPHABET)}
          type="button"
          className="button is-info is-light"
        >
          Sort alphabetically
        </button>

        <button
          onClick={getSortBy(preparedGoods, SORT_BY_LENGTH)}
          type="button"
          className="button is-success is-light"
        >
          Sort by length
        </button>

        <button
          onClick={getSortBy(preparedGoods)}
          type="button"
          className="button is-warning is-light"
        >
          Reverse
        </button>

        {resetButtonHidden && (
          <button
            onClick={() => {
              setResetButtonHidden(false);
              setVisibleGoods([...preparedGoods]);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(({ good, key }) => (
          <li
            data-cy="Good"
            key={key}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
