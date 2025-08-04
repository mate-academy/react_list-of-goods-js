import React, { useState } from 'react';
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
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const sortAlphabet = arr => {
    return arr.sort((a, b) => a.localeCompare(b));
  };

  const sortByLength = arr => {
    return arr.sort((a, b) => a.length - b.length);
  };

  const handleSortAlphabet = () => {
    let sorted = [...goodsFromServer];

    sorted = sortAlphabet(sorted);
    if (isReversed) {
      sorted = sorted.reverse();
    }

    setGoods(sorted);
    setSortType('alphabet');
  };

  const handleSortByLength = () => {
    let sorted = [...goodsFromServer];

    sorted = sortByLength(sorted);
    if (isReversed) {
      sorted = sorted.reverse();
    }

    setGoods(sorted);
    setSortType('length');
  };

  const handleReverse = () => {
    setGoods(prevGoods => {
      return [...prevGoods].reverse();
    });
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    setSortType(null);
    setIsReversed(false);
  };

  const isDefault = JSON.stringify(goods) === JSON.stringify(goodsFromServer);

  return (
    <div>
      <div>
        <button
          type="button"
          data-cy="sortAlphabet"
          onClick={handleSortAlphabet}
          className={sortType === 'alphabet' ? '' : 'is-light'}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          data-cy="sortByLength"
          onClick={handleSortByLength}
          className={sortType === 'length' ? '' : 'is-light'}
        >
          Sort by length
        </button>

        <button
          type="button"
          data-cy="reverse"
          onClick={handleReverse}
          className={isReversed ? '' : 'is-light'}
        >
          Reverse
        </button>

        {!isDefault && (
          <button type="button" data-cy="reset" onClick={handleReset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
