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

const SORT_ALPHABETICALLY = 'alphabetically';
const SORT_LENGTH = 'length';
const REVERSE = 'reverse';

export const App = () => {
  const [sortedGoods, setSortedGoods] = useState([...goodsFromServer]);
  const [currentSortField, setCurrentSortField] = useState('');
  const [showResetButton, setShowResetButton] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  const handleSort = sortField => {
    let sortedItems = [...sortedGoods];

    switch (sortField) {
      case SORT_ALPHABETICALLY:
        sortedItems.sort((a, b) => {
          const result = a.localeCompare(b);

          return isReversed ? -result : result;
        });
        break;
      case SORT_LENGTH:
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
    setCurrentSortField(sortField);
    setShowResetButton(true);
  };

  const handleReset = () => {
    setSortedGoods([...goodsFromServer]);
    setCurrentSortField('');
    setShowResetButton(false);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${currentSortField !== SORT_ALPHABETICALLY && 'is-light'}`}
          onClick={() => handleSort(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${currentSortField !== SORT_LENGTH && 'is-light'}`}
          onClick={() => handleSort(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${currentSortField === REVERSE && isReversed ? '' : 'is-light'}`}
          onClick={() => handleSort(REVERSE)}
        >
          Reverse
        </button>

        {showResetButton && (
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
