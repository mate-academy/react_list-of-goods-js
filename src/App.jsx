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

export const App = () => {
  const [sortedGoods, setSortedGoods] = useState(goodsFromServer);

  const sortAlphabetically = () => {
    const sorted = [...sortedGoods].sort();

    setSortedGoods(sorted);
  };

  const sortLength = () => {
    const sorted = [...sortedGoods].sort((a, b) => a.length - b.length);

    setSortedGoods(sorted);
  };

  const sortReverese = () => {
    const sorted = [...sortedGoods].reverse();

    setSortedGoods(sorted);
  };

  return (
    <>
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className="button is-info is-light"
            onClick={sortAlphabetically}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className="button is-success is-light"
            onClick={sortLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className="button is-warning is-light"
            onClick={sortReverese}
          >
            Reverse
          </button>

          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortedGoods(goodsFromServer)}
          >
            Reset
          </button>
        </div>

        <ul>
          {sortedGoods.map((good, i) => <li data-cy="Good">{good}</li>)}
        </ul>
      </div>
    </>
  );
};
