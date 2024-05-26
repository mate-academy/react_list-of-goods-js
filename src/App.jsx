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

const getPreparedGoods = (goods, activeButton, isReversed) => {
  const preparedGoods = [...goods];

  if (activeButton === 'alphabetical') {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  } else if (activeButton === 'length') {
    preparedGoods.sort((a, b) => a.length - b.length);
  } else if (activeButton === null) {
    return preparedGoods;
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [isReversed, setIsReversed] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [isModified, setIsModified] = useState(false);

  const sortAlphabetically = () => {
    setActiveButton('alphabetical');
    setIsReversed(false);
    setIsModified(true);
  };

  const sortByLength = () => {
    setActiveButton('length');
    setIsReversed(false);
    setIsModified(true);
  };

  const reverseOrder = () => {
    setGoods(prevGoods => [...prevGoods].reverse());
    setIsReversed(!isReversed);
    setIsModified(true);
  };

  const resetOrder = () => {
    setGoods([...goodsFromServer]);
    setIsReversed(false);
    setActiveButton('');
    setIsModified(false);
  };

  const visibleGoods = getPreparedGoods(goods, activeButton, isReversed);

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
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseOrder}
        >
          Reverse
        </button>
        {isModified && (
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
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
