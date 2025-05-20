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
  const [sortByAlphabet, setSortByAlphabet] = useState('');
  const [sortByLength, setSortByLength] = useState(false);
  const [reversedList, setReversedList] = useState(false);

  const getPreparedGoods = () => {
    let preparedGoods = [...goodsFromServer];

    if (sortByAlphabet) {
      preparedGoods.sort((current, next) => current.localeCompare(next));
    }

    if (sortByLength) {
      preparedGoods.sort(
        (currentGood, nextGood) => currentGood.length - nextGood.length,
      );
    }

    if (reversedList) {
      preparedGoods = preparedGoods.toReversed();
    }

    return preparedGoods;
  };

  const handleReset = () => {
    setSortByAlphabet('');
    setSortByLength(false);
    setReversedList(false);
  };

  const goods = getPreparedGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className="button is-info is-light"
          onClick={() => setSortByAlphabet('asc')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={() => setSortByLength(true)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={() => setReversedList(true)}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={handleReset}
        >
          Reset
        </button>
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
