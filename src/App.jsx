import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import classNames from 'classnames'; // Імпортуємо бібліотеку classnames

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
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortedBy, setSortedBy] = useState(null);
  const [reversed, setReversed] = useState(false);

  const sortAlphabetically = () => {
    const sortedGoods = [...goods].sort();

    if (reversed) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
    setSortedBy('alphabet');
    setReversed(false); // Скидаємо стан reversed після сортування
  };

  const sortByLength = () => {
    const sortedGoods = [...goods].sort((a, b) => a.length - b.length);

    if (reversed) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
    setSortedBy('length');
    setReversed(false); // Скидаємо стан reversed після сортування
  };

  const reverseOrder = () => {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    setReversed(!reversed);
  };

  const resetOrder = () => {
    setGoods(goodsFromServer);
    setSortedBy(null);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': !(sortedBy === 'alphabet' && !reversed),
          })}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': !(sortedBy === 'length' && !reversed),
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={reverseOrder}
        >
          Reverse
        </button>

        {sortedBy || reversed ? (
          <button
            type="button"
            className="button is-danger"
            onClick={resetOrder}
          >
            Reset
          </button>
        ) : null}
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

createRoot(document.getElementById('root')).render(<App />);
