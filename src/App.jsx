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

  const sortAlphabetically = () => {
    const sorted = [...goods].sort((a, b) => a.localeCompare(b));

    setGoods(isReversed ? sorted.reverse() : sorted);
    setActiveSort('alpha');
  };

  const sortByLength = () => {
    const sorted = [...goodsFromServer].sort((a, b) => {
      // Primary criterion: length
      if (a.length !== b.length) {
        return a.length - b.length;
      }
      // Secondary criterion: alphabetical

      return a.localeCompare(b);
    });

    setGoods(isReversed ? sorted.reverse() : sorted);
    setActiveSort('length');
  };

  const reverseList = () => {
    const reversed = [...goods].reverse();

    setGoods(reversed);
    setIsReversed(!isReversed);
  };

  const resetList = () => {
    setGoods(goodsFromServer);
    setActiveSort(null);
    setIsReversed(false);
  };

  const getButtonClass = type => {
    // Key change: Each button has its own highlighting logic without unnecessary else
    if (type === 'info') {
      // Alphabetical sort button - highlight when alpha sort is active
      return `button is-${type} ${activeSort === 'alpha' ? '' : 'is-light'}`;
    }

    if (type === 'success') {
      // Length sort button - highlight when length sort is active
      return `button is-${type} ${activeSort === 'length' ? '' : 'is-light'}`;
    }

    if (type === 'warning') {
      // Reverse button - highlight when reversed
      return `button is-${type} ${isReversed ? '' : 'is-light'}`;
    }
    // Reset button - no special highlighting

    return `button is-${type}`;
  };

  const isOriginalOrder = activeSort === null && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={getButtonClass('info')}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={getButtonClass('success')}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={getButtonClass('warning')}
          onClick={reverseList}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className={getButtonClass('danger')}
            onClick={resetList}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
