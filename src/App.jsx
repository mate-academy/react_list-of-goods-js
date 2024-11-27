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

export const SORT_KEYS = {
  ALPHABETICAL: 'Alphabetical',
  LENGTH: 'Length',
};

export const App = () => {
  const [sort, setSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const getSortedList = () => {
    let sortedGoods = [...goodsFromServer];

    switch (sort) {
      case SORT_KEYS.ALPHABETICAL:
        sortedGoods.sort();
        break;
      case SORT_KEYS.LENGTH:
        sortedGoods.sort((a, b) => a.length - b.length);
        break;
      default:
        sortedGoods = [...goodsFromServer];
    }

    return isReversed ? sortedGoods.reverse() : sortedGoods;
  };

  const toggleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const isOriginalOrder = sort === '' && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sort === SORT_KEYS.ALPHABETICAL ? '' : 'is-light'}`}
          onClick={() => setSort(SORT_KEYS.ALPHABETICAL)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sort === SORT_KEYS.LENGTH ? '' : 'is-light'}`}
          onClick={() => setSort(SORT_KEYS.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSort('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getSortedList().map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
