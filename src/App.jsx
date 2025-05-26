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
  const [sortByAlphabet, setSortByAlphabet] = useState(false);
  const [sortByLength, setSortByLength] = useState(false);
  const [reversedList, setReversedList] = useState(false);
  const [initialGoods] = useState(goodsFromServer);

  const getPreparedGoods = () => {
    const preparedGoods = [...initialGoods];

    if (sortByAlphabet) {
      preparedGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortByLength) {
      preparedGoods.sort((a, b) => a.length - b.length);
    }

    if (reversedList) {
      preparedGoods.reverse();
    }

    return preparedGoods;
  };

  const handleReset = () => {
    setSortByAlphabet(false);
    setSortByLength(false);
    setReversedList(false);
  };

  const handleAlphabetClick = () => {
    if (!sortByAlphabet) {
      setSortByAlphabet(true);
      setSortByLength(false);
    } else {
      setSortByAlphabet(false);
    }
  };

  const handleLengthClick = () => {
    if (!sortByLength) {
      setSortByLength(true);
      setSortByAlphabet(false);
    } else {
      setSortByLength(false);
    }
  };

  const goods = getPreparedGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${!sortByAlphabet ? 'is-light' : ''}`}
          onClick={handleAlphabetClick}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${!sortByLength ? 'is-light' : ''}`}
          onClick={handleLengthClick}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reversedList ? 'is-light' : ''}`}
          onClick={() => setReversedList(prev => !prev)}
        >
          Reverse
        </button>

        {(sortByAlphabet || sortByLength || reversedList) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
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
