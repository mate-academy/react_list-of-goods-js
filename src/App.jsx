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

const SORT_BY_ALPHABET = 'alpha';
const SORT_BY_LENGTH = 'length';

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);

  function getSortBy(products, sortBy) {
    if (sortBy === SORT_BY_ALPHABET) {
      return () => setVisibleGoods([...products]
        .sort((a, b) => a.localeCompare(b)));
    }

    if (sortBy === SORT_BY_LENGTH) {
      return () => setVisibleGoods([...products]
        .sort((a, b) => a.length - b.length));
    }

    return () => setVisibleGoods([...visibleGoods].reverse());
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={getSortBy(goodsFromServer, SORT_BY_ALPHABET)}
          type="button"
          className="button is-info is-light"
        >
          Sort alphabetically
        </button>

        <button
          onClick={getSortBy(goodsFromServer, SORT_BY_LENGTH)}
          type="button"
          className="button is-success is-light"
        >
          Sort by length
        </button>

        <button
          onClick={getSortBy(goodsFromServer)}
          type="button"
          className="button is-warning is-light"
        >
          Reverse
        </button>

        <button
          onClick={() => setVisibleGoods([...goodsFromServer])}
          type="button"
          className="button is-danger is-light"
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
