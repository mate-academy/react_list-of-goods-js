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

const sortTypes = {
  alphabetically: 'alphabetically',
  byLength: 'byLength',
  none: 'none',
};

const sortList = (items, sortType, isReversed) => {
  const newItems = [...items];

  switch (sortType) {
    case sortTypes.alphabetically:
      newItems.sort((a, b) => a.localeCompare(b));
      break;
    case sortTypes.byLength:
      newItems.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    newItems.reverse();
  }

  return newItems;
};

export const App = () => {
  const [sortType, setSortType] = useState(sortTypes.none);
  const [isReversed, setIsReversed] = useState(false);

  const handleReset = () => {
    setSortType(sortTypes.none);
    setIsReversed(false);
  };

  const goods = sortList(goodsFromServer, sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === sortTypes.alphabetically ? '' : 'is-light'}`}
          onClick={() => setSortType(sortTypes.alphabetically)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${sortType === sortTypes.byLength ? '' : 'is-light'}`}
          onClick={() => setSortType(sortTypes.byLength)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>
        {(sortType !== sortTypes.none || isReversed) && (
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
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
