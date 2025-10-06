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
  const [sortBy, setSortBy] = useState('');
  const [goods] = useState(goodsFromServer);

  const [reversed, setReversed] = useState(false);
  const [selectedGoods, setSelectedGoods] = useState([]);

  const isDefaultOrder = sortBy === '' && reversed === false;

  const handleSetSort = field => {
    setReversed(false);
    setSortBy(field);
  };

  const handleReverseSort = () => {
    setReversed(current => !current);
  };

  const handleResetSort = () => {
    setSortBy('');
    setReversed(false);
  };

  const handleSelectGoods = good => {
    setSelectedGoods(currentSelectedGoods => {
      if (currentSelectedGoods.includes(good)) {
        return currentSelectedGoods.filter(item => item !== good);
      }

      return [...currentSelectedGoods, good];
    });
  };

  const visibleGoods = [...goods];

  if (sortBy === 'name') {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortBy === 'length') {
    visibleGoods.sort((a, b) => a.length - b.length || a.localeCompare(b));
  }

  if (reversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy === 'name' ? '' : 'is-light'}`}
          onClick={() => handleSetSort('name')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortBy === 'length' ? '' : 'is-light'}`}
          onClick={() => handleSetSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={handleReverseSort}
        >
          Reverse
        </button>

        {!isDefaultOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetSort}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            <button
              type="button"
              className={`button is-small ${
                selectedGoods.includes(good) ? 'is-success' : 'is-light'
              }`}
              onClick={() => handleSelectGoods(good)}
            >
              {good}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
