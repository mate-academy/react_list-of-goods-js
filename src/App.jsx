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
  const [sortOrder, setSortOrder] = useState('none');
  const [isReversed, setIsReversed] = useState(false);

  const getSortedGoods = (goods, order, reversed) => {
    const sortedGoods = [...goods];

    if (order === 'alphabetical') {
      sortedGoods.sort();
    } else if (order === 'length') {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (reversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const visibleGoods = useMemo(
    () => getSortedGoods(goodsFromServer, sortOrder, isReversed),
    [sortOrder, isReversed],
  );

  const handleSortAlphabetically = () => {
    setSortOrder('alphabetical');
  };

  const handleSortByLength = () => {
    setSortOrder('length');
  };

  const handleReverseOrder = () => {
    setIsReversed(!isReversed);
  };

  const handleResetOrder = () => {
    setSortOrder('none');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortOrder === 'alphabetical' ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortOrder === 'length' ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverseOrder}
        >
          Reverse
        </button>

        {(sortOrder !== 'none' || isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleResetOrder}
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
