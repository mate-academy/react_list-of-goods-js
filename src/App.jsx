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
  const [goods, setGoods] = useState(goodsFromServer);
  const [originalOrder] = useState([...goodsFromServer]);
  const [isReversed, setIsReversed] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  const sortAlphabetically = () => {
    const sortedGoods = [...goods].sort();

    setGoods(sortedGoods);
    setActiveButton('alphabetical');
  };

  const sortByLength = () => {
    const sortedGoods = [...goods].sort((a, b) => a.length - b.length);

    setGoods(sortedGoods);
    setActiveButton('length');
  };

  const reverseOrder = () => {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    setIsReversed(!isReversed);
    setActiveButton('reverse');
  };

  const resetOrder = () => {
    setGoods(originalOrder);
    setIsReversed(false);
    setActiveButton(null);
  };

  const showResetButton =
    JSON.stringify(goods) !== JSON.stringify(originalOrder);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeButton === 'alphabetical' && !isReversed ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeButton === 'length' && !isReversed ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${activeButton === 'reverse' ? '' : 'is-light'}`}
          onClick={reverseOrder}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetOrder}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good, index) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
