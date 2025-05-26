import { useState, useEffect } from 'react';
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
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  useEffect(() => {
    if (!sortType) return;

    let sorted;

    if (sortType === 'alphabet') {
      sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));
    } else if (sortType === 'length') {
      sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sorted.reverse();
    }

    setGoods(sorted);
  }, [sortType, isReversed]);

  const handleAlphabetSort = () => {
    setSortType('alphabet');
  };

  const handleLengthSort = () => {
    setSortType('length');
  };

  const handleReverse = () => {
    if (!sortType) {
      setGoods(prev => {
        const reversed = [...prev].reverse();
        const isNowReversed = reversed.join(',') !== goodsFromServer.join(',');

        setIsReversed(isNowReversed);

        return reversed;
      });
    } else {
      setIsReversed(prev => !prev);
    }
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    setSortType(null);
    setIsReversed(false);
  };

  const isChanged = () => {
    return goods.join(',') !== goodsFromServer.join(',');
  };

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

        {isChanged() && (
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
