import 'bulma/css/bulma.css';
import { useState, useEffect } from 'react';
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
  const [sortMode, setSortMode] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [goodsList, setGoodsList] = useState(goodsFromServer);

  const getSortedGoods = (mode, reversed) => {
    const sortedGoods = [...goodsFromServer];

    if (mode === 'alphabet') {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (mode === 'length') {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (reversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  useEffect(() => {
    const updatedList = getSortedGoods(sortMode, isReversed);

    setGoodsList(updatedList);
  }, [sortMode, isReversed]);

  const handleSortAlphabetically = () => {
    setSortMode('alphabet');
  };

  const handleSortByLength = () => {
    setSortMode('length');
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortMode('');
    setIsReversed(false);
  };

  const getButtonClass = mode => {
    let colorClass = '';

    if (mode === 'alphabet') {
      colorClass = 'is-info';
    } else if (mode === 'length') {
      colorClass = 'is-success';
    } else if (mode === 'reverse') {
      colorClass = 'is-warning';
    }

    const isActive =
      (mode === 'reverse' && isReversed) ||
      (mode === sortMode && mode !== 'reverse');

    return `button ${colorClass} ${isActive ? '' : 'is-light'}`;
  };

  const isResetVisible = () => {
    return sortMode !== '' || isReversed;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={getButtonClass('alphabet')}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={getButtonClass('length')}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={getButtonClass('reverse')}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isResetVisible() && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
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
