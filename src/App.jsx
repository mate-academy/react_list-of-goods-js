import React, { useMemo, useState } from 'react';
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
  const [sortType, setSortType] = useState('none');
  const [isReversed, setIsReversed] = useState(false);

  const displayedGoods = useMemo(() => {
    let goods = [...goodsFromServer];

    if (sortType === 'alphabet') {
      goods.sort((a, b) => a.localeCompare(b));
    }

    if (sortType === 'length') {
      goods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      goods = goods.reverse();
    }

    return goods;
  }, [sortType, isReversed]);

  const handleSortAlphabetically = () => {
    setSortType('alphabet');
    setIsReversed(false);
  };

  const handleSortByLength = () => {
    setSortType('length');
    setIsReversed(false);
  };

  const handleReverse = () => {
    setIsReversed((prev) => !prev);
  };

  const handleReset = () => {
    setSortType('none');
    setIsReversed(false);
  };

  const isDefaultOrder = sortType === 'none' && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={handleSortByLength}
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

        {!isDefaultOrder && (
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
        {displayedGoods.map((item) => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
