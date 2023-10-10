import { useState } from 'react';
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

const SORT_BY_NAME = 'name';
const SORT_BY_LENGTH = 'length';

const prepareList = (list, sortType, isReversed) => {
  const sortedList = [...list];

  switch (sortType) {
    case SORT_BY_NAME:
      sortedList.sort((a, b) => a.localeCompare(b));
      break;
    case SORT_BY_LENGTH:
      sortedList.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    sortedList.reverse();
  }

  return sortedList;
};

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const preparedList = prepareList(goodsFromServer, sortType, isReversed);

  const handleReset = () => {
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SORT_BY_NAME ? '' : 'is-light'}`}
          onClick={() => setSortType(SORT_BY_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SORT_BY_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortType(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortType || isReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={handleReset}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {preparedList.map(good => (
          <li key={good.id} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
