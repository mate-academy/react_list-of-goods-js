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

const NOT_ACTIVE_CLASS = 'is-light';

export const App = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState(null);

  const resetGoods = () => {
    setGoods([...goodsFromServer]);
    setIsReversed(false);
    setSortBy(null);
  };

  const reverseGoods = () => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
  };

  const sortAlphabetically = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    setGoods(sorted);
    setSortBy('alphabet');
    setIsReversed(false);
  };

  const sortByLength = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);

    setGoods(sorted);
    setSortBy('length');
    setIsReversed(false);
  };

  const getButtonClass = buttonType => {
    switch (buttonType) {
      case 'reverse':
        return isReversed ? '' : NOT_ACTIVE_CLASS;
      case 'alphabet':
        return sortBy === 'alphabet' ? '' : NOT_ACTIVE_CLASS;
      case 'length':
        return sortBy === 'length' ? '' : NOT_ACTIVE_CLASS;
      default:
        return '';
    }
  };

  const isResetVisible = () => goods.toString() !== goodsFromServer.toString();

  return (
    <div className="App">
      <h1>Goods List</h1>
      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
      <div className="buttons">
        <button
          type="button"
          className={getButtonClass('reverse')}
          onClick={reverseGoods}
        >
          Reverse
        </button>
        <button
          type="button"
          className={getButtonClass('alphabet')}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={getButtonClass('length')}
          onClick={sortByLength}
        >
          Sort by length
        </button>
        {isResetVisible() && (
          <button type="button" onClick={resetGoods}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
};
