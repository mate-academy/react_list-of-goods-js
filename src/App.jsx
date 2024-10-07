import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const originalGoods = [
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

const arraysAreEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
};

export const App = () => {
  const [goods, setGoods] = useState(originalGoods);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState('');

  const sortByAlphabet = () => {
    let sortedGoods = [...goods].sort((a, b) => a.localeCompare(b));
    if (isReversed) {
      sortedGoods.reverse();
    }
    setGoods(sortedGoods);
    setSortType('alphabet');
  };

  const sortByLength = () => {
    let sortedGoods = [...goods].sort((a, b) => a.length - b.length || originalGoods.indexOf(a) - originalGoods.indexOf(b));

    if (isReversed) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
    setSortType('length');
  };

  const reverseGoods = () => {
    const reversedGoods = [...goods].reverse();
    setGoods(reversedGoods);
    setIsReversed(!isReversed);
  };

  const resetGoods = () => {
    setGoods(originalGoods);
    setSortType('');
    setIsReversed(false);
  };

  const isChanged = !arraysAreEqual(goods, originalGoods) || isReversed || sortType !== '';

  return (
    <div className="section content">
      <div className="buttons">
        <button 
          type="button" 
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button" 
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
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

        {isChanged && (
          <button 
            type="button" 
            className="button is-danger"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good) => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
