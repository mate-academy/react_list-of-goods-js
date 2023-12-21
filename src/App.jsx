import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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
const SORT_NAME = 'name';
const SORT_LENGTH = 'length';

function getNewSortList(list, sortValue, isReverse) {
  const valueReset = [...list];

  if (sortValue) {
    valueReset.sort((val1, val2) => {
      switch (sortValue) {
        case SORT_NAME:
          return val1.localeCompare(val2);
        case SORT_LENGTH:
          return val1.length - val2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    valueReset.reverse();
  }

  return valueReset;
}

export const App = () => {
  const [sortValue, setSortValue] = useState('');
  const [isReverse, setValueReverse] = useState(false);
  const getNewList = getNewSortList(goodsFromServer, sortValue, isReverse);

  const reverseValue = () => {
    setValueReverse(prev => !prev);
  };

  const resetValues = () => {
    setSortValue('');
    setValueReverse(false);
  };

  return (
    <div className="App">
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={cn(
              { 'is-light': sortValue !== SORT_NAME },
              'button is-info',
            )}
            onClick={() => setSortValue(SORT_NAME)}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={cn(
              { 'is-light': sortValue !== SORT_LENGTH },
              'button is-success',
            )}
            onClick={() => setSortValue(SORT_LENGTH)}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={cn(
              { 'is-light': !isReverse },
              'button is-warning',
            )}
            onClick={reverseValue}
          >
            Reverse
          </button>

          {(isReverse || sortValue !== '') && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={resetValues}
            >
              Reset
            </button>
          )}
        </div>

        <ul className="GoodList">
          {getNewList.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
