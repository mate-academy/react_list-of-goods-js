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

const getVisibleGoods = ({ isAlphabeticalActive, isLengthActive, isReverseActive }) => {
  const result = [...goodsFromServer];

  if (isAlphabeticalActive) {
    result.sort();
  }

  if (isLengthActive) {
    result.sort((a, b) => a.length - b.length);
  }

  if (isReverseActive) {
    result.reverse();
  }

  return result;
};

export const App = () => {
  const [isAlphabeticalActive, setIsAlphabeticalActive] = useState(false);
  const [isLengthActive, setIsLengthActive] = useState(false);
  const [isReverseActive, setIsReverseActive] = useState(false);

  const goods = getVisibleGoods({
    isAlphabeticalActive,
    isLengthActive,
    isReverseActive,
  });
  const showResetButton = isAlphabeticalActive || isLengthActive || isReverseActive;

  const sortAlphabetically = () => {
    setIsAlphabeticalActive(true);
    setIsLengthActive(false);
  };

  const sortByLength = () => {
    setIsLengthActive(true);
    setIsAlphabeticalActive(false);
  };

  const reverse = () => {
    setIsReverseActive(current => !current);
  };

  const reset = () => {
    setIsAlphabeticalActive(false);
    setIsLengthActive(false);
    setIsReverseActive(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isAlphabeticalActive ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isLengthActive ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReverseActive ? '' : 'is-light'}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
