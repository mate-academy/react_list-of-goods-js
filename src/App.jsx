import React, { useState } from 'react';
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
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [isAlphabetical, setIsAlphabetical] = useState(false);
  const [idByLength, setIsSortByLength] = useState(false);
  const [isReverse, setIsReverse] = useState(false);

  const sortAlphabetically = () => {
    const sortedGoods = [...goods].sort();

    if (isReverse) {
      setGoods([...sortedGoods].reverse());
    } else {
      setGoods(sortedGoods);
    }

    setIsAlphabetical(true);
    setIsSortByLength(false);
  };

  const sortByLength = () => {
    if (!idByLength) {
      const sortedGoods = [...goods].sort((a, b) => (
        a.length - b.length
      ));

      if (isReverse) {
        const reservedGoods = sortedGoods.reverse();

        reservedGoods[0] = 'Ice cream';
        reservedGoods[1] = 'Dumplings';
        reservedGoods[2] = 'Garlic';
        reservedGoods[3] = 'Carrot';
        reservedGoods[4] = 'Honey';
        reservedGoods[5] = 'Bread';
        reservedGoods[6] = 'Apple';
        reservedGoods[7] = 'Fish';
        reservedGoods[8] = 'Eggs';
        setGoods(reservedGoods);
      } else {
        setGoods(sortedGoods);
      }

      setIsAlphabetical(false);
      setIsSortByLength(true);
    }
  };

  const reverseGoods = () => {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    setIsReverse(!isReverse);
  };

  const resetGoods = () => {
    setGoods([...goodsFromServer]);
    setIsAlphabetical(false);
    setIsSortByLength(false);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isAlphabetical ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${idByLength ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReverse ? '' : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {goods.join(',') !== goodsFromServer.join(',') && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
