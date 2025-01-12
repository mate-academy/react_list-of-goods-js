import React, { useState } from 'react';
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
  const [sortingCriterion, setSortingCriterion] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const resetSorting = () => {
    setSortingCriterion('');
    setIsReversed(false);
  };

  let displayedGoods = [...goodsFromServer];

  if (sortingCriterion) {
    displayedGoods = [...goodsFromServer].sort((item1, item2) => {
      switch (sortingCriterion) {
        case 'alphabetically':
          return item1.localeCompare(item2);
        case 'length':
          return item1.length - item2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    displayedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortingCriterion === 'alphabetically' ? '' : `is-light`}`}
          onClick={() => setSortingCriterion('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortingCriterion === 'length' ? '' : `is-light`}`}
          onClick={() => setSortingCriterion('length')}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : `is-light`}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortingCriterion || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSorting}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {displayedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
