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
  { sortType: 'Reverse', buttonStyle: 'is-danger' },
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
  const [sortType, setType] = useState('');
  const [reversed, reverse] = useState(false);
  const reset = () => {
    setType('');
    reverse(false);
  };

  const sorted = sortByParams(goodsFromServer, sortType, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        {buttons.map(button => (
          <button
            onClick={() => (
              button.sortType === 'Reverse'
                ? reverse(!reversed)
                : setType(button.sortType)
            )
            }
            type="button"
            className={
              cn(
                'button',
                button.buttonStyle,
                { 'is-light': button.sortType === 'Reverse'
                  ? !reversed
                  : button.sortType !== sortType },
              )
            }
          >
            {button.sortType}
          </button>
        ))}

        {(sortType || reversed)
          && (
            <button
              onClick={() => reset()}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {sorted.map(elem => <li data-cy="Good" key={elem}>{elem}</li>)}
      </ul>
    </div>
  );
};
