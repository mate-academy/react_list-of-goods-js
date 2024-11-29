import React, { useState } from 'react';
import 'bulma/css/bulma.css';

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

const prepareGoods = (goods, sortType, isReversed) => {
  const sortedGoods = [...goods];

  if (sortType === 'alphabet') {
    sortedGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortType === 'length') {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const preparedGoods = prepareGoods(goodsFromServer, sortType, isReversed);

  const isGoodsChanged = sortType !== '' || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          data-cy="SortAlphabeticallyButton"
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={() => setSortType('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          data-cy="SortByLengthButton"
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={() => setSortType('length')}
        >
          Sort by length
        </button>

        <button
          data-cy="ReverseButton"
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isGoodsChanged && (
          <button
            data-cy="ResetButton"
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortType('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
