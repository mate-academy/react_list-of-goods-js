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
  const [goods, setGoods] = useState(goodsFromServer);
  const [activeSort, setActiveSort] = useState(null);
  const [isReversed, setIsReversed] = useState(false);
  const reset = 'reset';
  const alphabeticaly = 'alphabeticaly';
  const length = 'byLength';
  const reverse = 'reverse';
  const isSorted = activeSort !== null;

  const handleSort = (sortType) => {
    const sortFunctions = {
      alphabeticaly: () => {
        const sortedGoods
          = [...goods].sort((a, b) => a[0].localeCompare(b[0],
            'en', { sensitivity: 'base' }));

        setGoods(sortedGoods);
        setActiveSort(sortType);
        setIsReversed(false);
      },
      byLength: () => {
        const sortedGoods = [...goods].sort((a, b) => a.length - b.length);

        setGoods(sortedGoods);
        setActiveSort(sortType);
        setIsReversed(false);
      },
      reverse: () => {
        const reversedGoods = [...goods].reverse();

        setGoods(reversedGoods);
        setActiveSort(sortType);
        setIsReversed(!isReversed);
      },
      reset: () => {
        setGoods(goodsFromServer);
        setActiveSort(null);
        setIsReversed(false);
      },
    };

    if (sortType !== activeSort || (sortType === 'reverse' && isReversed)) {
      sortFunctions[sortType]();
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeSort === alphabeticaly ? 'is-info' : 'is-light'}`}
          onClick={() => handleSort(alphabeticaly)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeSort === length ? 'is-info' : 'is-light'}`}
          onClick={() => handleSort(length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${activeSort === reverse ? 'is-info' : 'is-light'}`}
          onClick={() => handleSort(reverse)}
        >
          Reverse
        </button>

        {isSorted ? (
          <button
            type="button"
            className={`button is-danger ${activeSort === 'reset' ? 'is-info' : 'is-light'}`}
            onClick={() => handleSort('reset')}
          >
            Reset
          </button>
        ) : null}

      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>

    </div>
  );
};
