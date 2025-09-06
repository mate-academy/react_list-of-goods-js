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
  const [activeSort, setActiveSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const handleReset = () => {
    setActiveSort('');
    setIsReversed(false);
  };

  const handleSortAlphabeticallyClick = () => {
    setActiveSort('alphabetical');
  };

  const handleSortLengthClick = () => {
    setActiveSort('length');
  };

  const handleReverseClick = () => {
    setIsReversed(!isReversed);
  };

  const displayedGoods = useMemo(() => {
    const sortedList = [...goodsFromServer];

    if (activeSort === 'alphabetical') {
      sortedList.sort((a, b) => a.localeCompare(b));
    } else if (activeSort === 'length') {
      sortedList.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sortedList.reverse();
    }

    return sortedList;
  }, [activeSort, isReversed]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSortAlphabeticallyClick}
          type="button"
          className={`button is-info ${activeSort === 'alphabetical' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSortLengthClick}
          type="button"
          className={`button is-success ${activeSort === 'length' ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverseClick}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(activeSort !== '' || isReversed) && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {displayedGoods.map(goods => (
          <li key={goods} data-cy="Good">
            {goods}
          </li>
        ))}
      </ul>
    </div>
  );
};
