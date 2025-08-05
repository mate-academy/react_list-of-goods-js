import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const sortGoods = (type, reversed) => {
    const sorted = [...goodsFromServer];

    if (type === 'alphabet') {
      sorted.sort((a, b) => a.localeCompare(b));
    } else if (type === 'length') {
      sorted.sort((a, b) => a.length - b.length);
    }

    if (reversed) {
      sorted.reverse();
    }

    return sorted;
  };

  const handleAlphabetSort = () => {
    setSortType('alphabet');
    setGoods(sortGoods('alphabet', isReversed));
  };

  const handleLengthSort = () => {
    setSortType('length');
    setGoods(sortGoods('length', isReversed));
  };

  const handleReverse = () => {
    const newReversed = !isReversed;

    setIsReversed(newReversed);

    if (sortType === null) {
      setGoods(
        newReversed ? [...goodsFromServer].reverse() : [...goodsFromServer],
      );
    } else {
      setGoods(sortGoods(sortType, newReversed));
    }
  };

  const handleReset = () => {
    setSortType(null);
    setIsReversed(false);
    setGoods([...goodsFromServer]);
  };

  const isInitialState = sortType === null && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== 'alphabet' ? 'is-light' : ''}`}
          onClick={handleAlphabetSort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== 'length' ? 'is-light' : ''}`}
          onClick={handleLengthSort}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isInitialState && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
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
