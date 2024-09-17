import { useState } from 'react';

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

const ALPHABET = 'alphabet';
const LENGTH = 'length';

const prepareGoods = (sortMethod, isListReversed) => {
  const goodsCopy = [...goodsFromServer];

  if (sortMethod) {
    goodsCopy.sort((a, b) => {
      switch (sortMethod) {
        case ALPHABET:
          return a.localeCompare(b);
        case LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (isListReversed) {
    goodsCopy.reverse();
  }

  return goodsCopy;
};

export const App = () => {
  const [sortMethod, setSortMethod] = useState('');
  const [isListReversed, setIsListReversed] = useState(false);

  const resetAll = () => {
    setSortMethod('');
    setIsListReversed(false);
  };

  const isResetButtonVisible = sortMethod || isListReversed;

  const goodsList = prepareGoods(sortMethod, isListReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortMethod(ALPHABET)}
          type="button"
          className={`button is-info ${sortMethod !== ALPHABET && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortMethod(LENGTH)}
          type="button"
          className={`button is-success ${sortMethod !== LENGTH && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsListReversed(!isListReversed)}
          type="button"
          className={`button is-warning ${!isListReversed && 'is-light'}`}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            onClick={resetAll}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsList.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
