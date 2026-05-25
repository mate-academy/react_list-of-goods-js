import React, { useState } from 'react';
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
  const [sortBy, setSortBy] = useState('initial');
  const [isReversed, setIsReversed] = useState(false);

  // 1. Criar uma cópia usando const
  const processedGoods = [...goodsFromServer];

  if (sortBy === 'alphabetical') {
    processedGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortBy === 'length') {
    processedGoods.sort((a, b) => a.length - b.length);
  }

  // 2. Aplicar a inversão se ativo
  if (isReversed) {
    processedGoods.reverse();
  }

  const currentStr = JSON.stringify(processedGoods);
  const initialStr = JSON.stringify(goodsFromServer);
  const isChanged = currentStr !== initialStr;

  // Manipuladores de clique
  const handleSortAlphabetically = () => {
    setSortBy('alphabetical');
  };

  const handleSortByLength = () => {
    setSortBy('length');
  };

  const handleToggleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortBy('initial');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortBy !== 'alphabetical' ? 'is-light' : ''
          }`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortBy !== 'length' ? 'is-light' : ''
          }`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={handleToggleReverse}
        >
          Reverse
        </button>

        {isChanged && (
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
        {processedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
