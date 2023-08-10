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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

const sortGoods = (array, sortParameter, reverseParameter) => {
  let sortedGoods = [...array];

  switch (sortParameter) {
    case SORT_FIELD_ALPHABETICALLY:
      sortedGoods = sortedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SORT_FIELD_LENGTH:
      sortedGoods = sortedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (reverseParameter) {
    sortedGoods = sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  let visibleGoods = [...goodsFromServer];
  const [sortField, setSortField] = useState('');
  const [reverseList, setReverseList] = useState(false);
  const makeResetButtonVisible = sortField !== '' || reverseList;

  const handleClick = (sortBy) => {
    setSortField(sortBy);
  };

  const handleReset = () => {
    setSortField('');
    setReverseList(false);
  };

  const handleReverse = () => {
    setReverseList(prevReverseList => !prevReverseList);
  };

  visibleGoods = sortGoods(visibleGoods, sortField, reverseList);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SORT_FIELD_ALPHABETICALLY ? 'is-light' : ''}`}
          onClick={() => {
            handleClick(SORT_FIELD_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SORT_FIELD_LENGTH ? 'is-light' : ''}`}
          onClick={() => {
            handleClick(SORT_FIELD_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverseList ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {makeResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
