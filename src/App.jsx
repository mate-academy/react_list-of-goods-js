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

  const applySort = type => {
    const sortedGoods = [...goodsFromServer];

    if (type === 'alphabetical') {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (type === 'length') {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
    setSortType(type);
  };

  const handleReverse = () => {
    const newReversed = !isReversed;

    setIsReversed(newReversed);

    let sortedGoods = [...goodsFromServer];

    if (sortType === 'alphabetical') {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortType === 'length') {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (newReversed) {
      sortedGoods.reverse();
    }

    if (!sortType) {
      sortedGoods = [...goods].reverse();
    }

    setGoods(sortedGoods);
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    setSortType(null);
    setIsReversed(false);
  };

  const isInitial = () => {
    return (
      goods.join(',') === goodsFromServer.join(',') &&
      sortType === null &&
      isReversed === false
    );
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabetical' ? '' : 'is-light'}`}
          onClick={() => applySort('alphabetical')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={() => applySort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isInitial() && (
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
