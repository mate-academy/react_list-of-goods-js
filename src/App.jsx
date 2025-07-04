import React, { useState } from 'react';

const goodsFromServer = [
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
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(null); // 'alpha' | 'length' | null

  const sortAlphabetically = () => {
    setGoods(prevGoods => [...prevGoods].sort((a, b) => a.localeCompare(b)));
    setIsReversed(false);
    setSortType('alpha');
  };

  const sortByLength = () => {
    setGoods(prevGoods => [...prevGoods].sort((a, b) => a.length - b.length));
    setIsReversed(false);
    setSortType('length');
  };

  const reverseGoods = () => {
    setGoods(prevGoods => [...prevGoods].reverse());
    setIsReversed(prev => !prev);
    setSortType(null);
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
    setIsReversed(false);
    setSortType(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortAlphabetically}
          className={`button is-info ${sortType === 'alpha' && !isReversed ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className={`button is-success ${sortType === 'length' && !isReversed ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverseGoods}
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {JSON.stringify(goods) !== JSON.stringify(goodsFromServer) && (
          <button
            type="button"
            onClick={resetGoods}
            className="button is-danger"
          >
            Reset
          </button>
        )}
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

export default App;
