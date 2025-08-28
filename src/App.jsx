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

export const App = () => {
  const [handleSortBy, setSortBy] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const getVisibleGoods = () => {
    const visibleGoods = [...goodsFromServer].map((n, i) => ({
      id: i + 1,
      n,
    }));

    switch (handleSortBy) {
      case 'alphabet':
        visibleGoods.sort((a, b) => a.n.localeCompare(b.n));
        break;

      case 'length':
        visibleGoods.sort((a, b) => a.n.length - b.n.length);
        break;

      default:
        break;
    }

    if (isReversed) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  };

  const handleReset = () => {
    setSortBy(null);
    setIsReversed(false);
  };

  const goods = getVisibleGoods();
  const isResetVisible = handleSortBy !== null || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${handleSortBy === 'alphabet' ? '' : 'is-light'}`}
          onClick={() => setSortBy('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${handleSortBy === 'length' ? '' : 'is-light'}`}
          onClick={() => setSortBy('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {isResetVisible && (
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
          <li key={good.id} data-cy="Good">
            {good.n}
          </li>
        ))}
      </ul>
    </div>
  );
};
