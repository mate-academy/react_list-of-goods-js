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
  const [sortType, setSortType] = useState(null);
  const [isDescending, setIsDescending] = useState(false);

  const applySort = (type, descending) => {
    const sorted = [...goodsFromServer];

    if (type === 'alphabet') {
      sorted.sort((a, b) => a.localeCompare(b));
    } else if (type === 'length') {
      sorted.sort((a, b) => a.length - b.length);
    }

    if (descending) {
      sorted.reverse();
    }

    setGoods(sorted);
  };

  const handleAlphabetSort = () => {
    setSortType('alphabet');
    setIsDescending(false);
    applySort('alphabet', false);
  };

  const handleLengthSort = () => {
    setSortType('length');
    setIsDescending(false);
    applySort('length', false);
  };

  const handleReverse = () => {
    const newIsDescending = !isDescending;

    if (sortType) {
      setIsDescending(newIsDescending);
      applySort(sortType, newIsDescending);
    } else {
      // Caso sem sort ativo, apenas inverte a ordem atual
      setGoods([...goods].reverse());
    }
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    setSortType(null);
    setIsDescending(false);
  };

  const isOriginalOrder =
    JSON.stringify(goods) === JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={handleAlphabetSort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={handleLengthSort}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortType ? '' : 'is-light'}`}
          onClick={handleReverse}
          disabled={!sortType}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
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
        {goods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
