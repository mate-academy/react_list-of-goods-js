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

function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i += 1) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

const SORT_ALPHABETICALLY = 'alphabetically';
const SORT_LENGTH = 'length';
const REVERSE = 'reverse';

export const App = () => {
  const [sortedGoods, setSortedGoods] = useState([...goodsFromServer]);
  const [selectedSortField, setSelectedSortField] = useState('');
  const [showResetButton, setShowResetButton] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  const handleSort = sortField => {
    let sortedItems = [...sortedGoods];

    switch (sortField) {
      case SORT_ALPHABETICALLY:
        setSelectedSortField(sortField);
        sortedItems.sort((a, b) => {
          const result = a.localeCompare(b);

          return isReversed ? -result : result;
        });
        break;
      case SORT_LENGTH:
        setSelectedSortField(sortField);
        sortedItems.sort((a, b) => {
          const result = a.length - b.length;

          return isReversed ? -result : result;
        });
        break;
      case REVERSE:
        sortedItems.reverse();
        setIsReversed(!isReversed);
        break;
      default:
        sortedItems = [...goodsFromServer];
        break;
    }

    setSortedGoods(sortedItems);
    setShowResetButton(true);
  };

  const handleReset = () => {
    setSortedGoods([...goodsFromServer]);
    setShowResetButton(false);
    setIsReversed(false);
    setSelectedSortField('');
  };

  const isDefaultState = arraysAreEqual(sortedGoods, goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${selectedSortField === SORT_ALPHABETICALLY ? '' : 'is-light'}`}
          onClick={() => handleSort(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${selectedSortField === SORT_LENGTH ? '' : 'is-light'}`}
          onClick={() => handleSort(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => handleSort(REVERSE)}
        >
          Reverse
        </button>

        {showResetButton && !isDefaultState && (
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
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
