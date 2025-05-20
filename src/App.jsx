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
    let preparedGoods = [...initialGoods];

    if (sortByAlphabet) {
      preparedGoods.sort((a, b) => a.localeCompare(b));
    }

    if (sortByLength) {
      preparedGoods.sort((a, b) => a.length - b.length);
    }

    if (reversedList) {
      preparedGoods = preparedGoods.slice().reverse();
    }

    return preparedGoods;
  };

  const handleReset = () => {
    setSortByAlphabet(false);
    setSortByLength(false);
    setReversedList(false);
  };

  const goods = getPreparedGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${!sortByAlphabet ? 'is-light' : ''}`}
          onClick={() => setSortByAlphabet(prev => !prev)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${!sortByLength ? 'is-light' : ''}`}
          onClick={() => setSortByLength(prev => !prev)}
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
