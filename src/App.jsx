import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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
  const [activeSort, setActiveSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const getButtonClass = (type, baseClass) =>
    `button ${baseClass} ${activeSort === type ? '' : 'is-light'}`;

  const applyReverse = (list, reverse) =>
    reverse ? [...list].reverse() : list;

  const getSortedList = () => {
    let list = goodsFromServer;

    if (activeSort === 'alphabet') {
      list = [...goodsFromServer].sort((a, b) => a.localeCompare(b));
    } else if (activeSort === 'length') {
      list = [...goodsFromServer].sort((a, b) => a.length - b.length);
    }

    return applyReverse(list, isReversed);
  };

  // Оновлюємо goods коли змінюється activeSort або isReversed
  useEffect(() => {
    setGoods(getSortedList());
  }, [activeSort, isReversed]);

  const sortAlphabetically = () => setActiveSort('alphabet');

  const sortByLength = () => setActiveSort('length');

  const reverseGoods = () => setIsReversed(prev => !prev);

  const resetGoods = () => {
    setActiveSort('');
    setIsReversed(false);
  };

  const hasChanged = activeSort !== '' || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={getButtonClass('alphabet', 'is-info')}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={getButtonClass('length', 'is-success')}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {hasChanged && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
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
