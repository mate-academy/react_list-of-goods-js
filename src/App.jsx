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

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortOrder, setSortOrder] = useState('initial');

  const sortAlphabetically = () => {
    const sorted = [...goods].sort();

    setGoods(sorted);
    setSortOrder('alphabetical');
  };

  const sortByLength = () => {
    const sorted = [...goods].sort((a, b) => a.length - b.length);

    setGoods(sorted);
    setSortOrder('length');
  };

  const reverseOrder = () => {
    const reversed = [...goods].reverse();

    setGoods(reversed);
    setSortOrder(sortOrder === 'initial' ? 'reversed' : 'initial');
  };

  const resetOrder = () => {
    setGoods(goodsFromServer);
    setSortOrder('initial');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button ${sortOrder === 'alphabetical' ? 'is-info' : 'is-info is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button ${sortOrder === 'length' ? 'is-success' : 'is-success is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button ${sortOrder !== 'initial' ? 'is-warning' : 'is-warning is-light'}`}
          onClick={reverseOrder}
        >
          Reverse
        </button>

        {sortOrder !== 'initial' && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetOrder}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
