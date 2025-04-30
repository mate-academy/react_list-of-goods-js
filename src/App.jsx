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
  const [sortType, setSortType] = useState(null); // 'alphabet' | 'length' | null
  const [isReversed, setIsReversed] = useState(false);
  const [goods, setGoods] = useState([...goodsFromServer]);

  const sortGoods = (type, reversed) => {
    let sorted = [...goodsFromServer];

    if (type === 'alphabet') {
      sorted.sort((a, b) => a.localeCompare(b));
    } else if (type === 'length') {
      sorted.sort((a, b) => a.length - b.length);
    }

    if (reversed) {
      sorted.reverse();
    }

    return sorted;
  };

  const updateGoods = (newSortType = sortType, newReversed = isReversed) => {
    const sortedGoods = sortGoods(newSortType, newReversed);
    setGoods(sortedGoods);
  };

  const handleSortAlphabetically = () => {
    const newSortType = 'alphabet';
    setSortType(newSortType);
    updateGoods(newSortType, isReversed);
  };

  const handleSortByLength = () => {
    const newSortType = 'length';
    setSortType(newSortType);
    updateGoods(newSortType, isReversed);
  };

  const handleReverse = () => {
    const newReversed = !isReversed;
    setIsReversed(newReversed);
    updateGoods(sortType, newReversed);
  };

  const handleReset = () => {
    setSortType(null);
    setIsReversed(false);
    setGoods([...goodsFromServer]);
  };

  const isModified = JSON.stringify(goods) !== JSON.stringify(goodsFromServer);

  const getButtonClass = (buttonType) => {
    const baseClass = {
      alphabet: 'button is-info',
      length: 'button is-success',
      reverse: 'button is-warning',
      reset: 'button is-danger',
    }[buttonType];

    const isActive =
      (buttonType === 'alphabet' && sortType === 'alphabet') ||
      (buttonType === 'length' && sortType === 'length') ||
      (buttonType === 'reverse' && isReversed);

    return isActive ? baseClass : `${baseClass} is-light`;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={getButtonClass('alphabet')}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={getButtonClass('length')}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={getButtonClass('reverse')}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className={getButtonClass('reset')}
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
