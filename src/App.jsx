import 'bulma/css/bulma.css';
import './App.scss';

import React, { useState } from 'react';

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
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [isReversed, setIsReversed] = useState(false);
  const [sortOrder, setSortOrder] = useState('original');

  const isOriginal = JSON.stringify(goods) === JSON.stringify(goodsFromServer);

  // Manipuladores de eventos
  const handleSortAlphabetically = () => {
    // Classifica a lista em ordem alfabética.
    const sortedGoods = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    setGoods(sortedGoods);
    setIsReversed(false);
    setSortOrder('alphabetical');
  };

  const handleSortByLength = () => {
    // Classifica a lista por comprimento.
    const sortedGoods = [...goodsFromServer].sort(
      (a, b) => a.length - b.length,
    );

    setGoods(sortedGoods);
    setIsReversed(false);
    setSortOrder('length');
  };

  const handleReverse = () => {
    // Inverte a ordem atual da lista
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    // Reseta a lista para a ordem original do servidor
    setGoods([...goodsFromServer]);
    setIsReversed(false);
    setSortOrder('original');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortOrder === 'alphabetical' ? '' : 'is-light'
          }`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortOrder === 'length' ? '' : 'is-light'
          }`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isOriginal && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
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
