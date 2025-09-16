import { useState, useMemo } from 'react';
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
  const [sortType, setSortType] = useState(null);
  const [reversed, setReversed] = useState(false);

  // Handlers (✅ назви з дієслів)
  const sortByAlphabet = () => setSortType('alphabet');
  const sortByLength = () => setSortType('length');
  const reverseOrder = () => setReversed(prev => !prev);
  const resetOrder = () => {
    setSortType(null);
    setReversed(false);
  };

  const visibleGoods = useMemo(() => {
    const sortedGoods = [...goodsFromServer];

    if (sortType === 'alphabet') {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortType === 'length') {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (reversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  }, [sortType, reversed]);

  const isOriginalOrder = useMemo(() => {
    if (visibleGoods.length !== goodsFromServer.length) {
      return false;
    }

    return visibleGoods.every((item, index) => item === goodsFromServer[index]);
  }, [visibleGoods]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={reverseOrder}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetOrder}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
