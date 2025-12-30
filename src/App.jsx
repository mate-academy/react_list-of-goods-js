import 'bulma/css/bulma.css';
import './App.scss';
import { useState, useRef } from 'react';
import { FoodList } from './components/foods';

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
  const originalGoodsRef = useRef([...goodsFromServer]);

  const [sortField, setSortField] = useState(goodsFromServer);
  const [sortMode, setSortMode] = useState('initial'); // 'initial' | 'alpha' | 'length'
  const [isReversed, setIsReversed] = useState(false);

  // Порівняння масивів для показу кнопки Reset
  const equalsArrays = (a, b) => {
    if (a.length !== b.length) return false;

    return a.every((item, index) => item === b[index]);
  };

  const isOriginalOrder = equalsArrays(sortField, originalGoodsRef.current);

  const handleSortAlphabetically = () => {
    const sorted = [...originalGoodsRef.current].sort(
      (a, b) => a.toLowerCase().localeCompare(b.toLowerCase()),
      // eslint-disable-next-line function-paren-newline
    );
    setSortField(isReversed ? [...sorted].reverse() : sorted);
    setSortMode('alpha');
    // isReversed залишається як є — щоб не ламати поточний реверс
  };

  const handleSortByLength = () => {
    const sorted = [...originalGoodsRef.current].sort(
      (a, b) => a.length - b.length,
    );

    setSortField(isReversed ? [...sorted].reverse() : sorted);
    setSortMode('length');
  };

  const handleReverse = () => {
    setSortField(prev => [...prev].reverse());
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortField(originalGoodsRef.current);
    setSortMode('initial');
    setIsReversed(false);
  };

  const getSortButtonClass = type => {
    const isActive = sortMode === type;

    return `button ${isActive ? 'is-info' : 'is-info is-light'}`.trim();
  };

  const getLengthButtonClass = () => {
    const isActive = sortMode === 'length';

    return `button ${isActive ? 'is-success' : 'is-success is-light'}`.trim();
  };

  const getReverseButtonClass = () => {
    return `button ${isReversed ? 'is-warning' : 'is-warning is-light'}`.trim();
  };

  const resetButtonClass = 'button is-danger';

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSortAlphabetically}
          type="button"
          className={getSortButtonClass('alpha')}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSortByLength}
          type="button"
          className={getLengthButtonClass()}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={getReverseButtonClass()}
        >
          Reverse
        </button>

        {/* Кнопка Reset видно тільки якщо список змінено */}
        {!isOriginalOrder && (
          <button
            onClick={handleReset}
            type="button"
            className={resetButtonClass}
          >
            Reset
          </button>
        )}
      </div>

      <FoodList goodsFrom={sortField} />
    </div>
  );
};
