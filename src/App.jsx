import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const App = () => {
  const initialGoods = [
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

  const [goods, setGoods] = useState(initialGoods);
  const [sortOrder, setSortOrder] = useState('initial');

  const handleSort = (order) => {
    let sortedGoods = [...goods];

    switch (order) {
      case 'alphabetical':
        sortedGoods.sort();
        break;
      case 'length':
        sortedGoods.sort((a, b) => a.length - b.length);
        break;
      case 'reverse':
        sortedGoods.reverse();
        break;
      case 'initial':
        sortedGoods = initialGoods;
        break;
      default:
        break;
    }

    setGoods(sortedGoods);
    setSortOrder(order);
  };

  const showResetButton = sortOrder !== 'initial';

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortOrder === 'alphabetical' ? '' : 'is-light'}`}
          onClick={() => handleSort('alphabetical')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortOrder === 'length' ? '' : 'is-light'}`}
          onClick={() => handleSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortOrder === 'reverse' ? '' : 'is-light'}`}
          onClick={() => {
            handleSort(sortOrder === 'reverse' ? 'initial' : 'reverse');
          }
          }
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => handleSort('initial')}
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
