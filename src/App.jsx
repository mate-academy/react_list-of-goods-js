import 'bulma/css/bulma.css';
import './App.scss';
import { useState, useMemo } from 'react';

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

  const visibleGoods = useMemo(() => {
    const sorted = [...goodsFromServer];

    if (sortType === 'alphabet') {
      sorted.sort((a, b) => a.localeCompare(b));
    } else if (sortType === 'length') {
      sorted.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sorted.reverse();
    }

    return sorted;
  }, [sortType, isReversed]);

  // ВИПРАВЛЕНО: Збереження стану isReversed при зміні sortType
  const sortByAlph = () => {
    setSortType('alphabet');
    // setIsReversed(false); <--- Рядок видалено
  };

  const sortByLength = () => {
    setSortType('length');
    // setIsReversed(false); <--- Рядок видалено
  };

  const reverse = () => {
    setIsReversed(prev => !prev);
  };

  const reset = () => {
    setSortType('none');
    setIsReversed(false);
  };

  const showResetButton = sortType !== 'none' || isReversed;

  // Логіка підсвічування: Перевіряємо лише, чи встановлений sortType.
  const isSortedAlphActive = sortType === 'alphabet';
  const isSortedLengthActive = sortType === 'length';

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${!isSortedAlphActive && 'is-light'}`}
          onClick={sortByAlph}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${!isSortedLengthActive && 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {showResetButton && (
          <button type="button" className="button is-danger" onClick={reset}>
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
