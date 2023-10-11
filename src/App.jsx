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

const SORT_BY_NAME = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';

const buttons = [
  { sortType: SORT_BY_NAME, buttonStyle: 'is-info' },
  { sortType: SORT_BY_LENGTH, buttonStyle: 'is-success' },
  { sortType: 'Reverse', buttonStyle: 'is-warning' },
];

const sortByParams = (toSortArray, sortType, reversing) => {
  const array = [...toSortArray];

  switch (sortType) {
    case SORT_BY_NAME:
      array.sort((a, b) => a.localeCompare(b));
      break;
    case SORT_BY_LENGTH:
      array.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  return reversing ? array.reverse() : array;
};

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const reset = () => {
    setSortType('');
    setIsReversed(false);
  };

  const sortedGoods = sortByParams(goodsFromServer, sortType, isReversed);

  const isSorted = sortType || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        {buttons.map(button => (
          <button
            onClick={() => (
              button.sortType === 'Reverse'
                ? setIsReversed(prevState => !prevState)
                : setSortType(button.sortType)
            )
            }
            type="button"
            className={
              cn(
                'button',
                button.buttonStyle,
                { 'is-light': button.sortType === 'Reverse'
                  ? !isReversed
                  : button.sortType !== sortType },
              )
            }
          >
            {button.sortType}
          </button>
        ))}

        {isSorted
          && (
            <button
              onClick={reset}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {sortedGoods.map(elem => (
          <li data-cy="Good" key={elem}>
            {elem}
          </li>
        ))}
      </ul>
    </div>
  );
};
