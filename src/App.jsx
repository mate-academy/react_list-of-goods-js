import 'bulma/css/bulma.css';
import cn from 'classnames';
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

const SORT_ALPHABETICALLY = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';

function getSortedList(sign, reverse) {
  let newList = [...goodsFromServer];

  if (reverse) {
    newList = [...goodsFromServer].reverse();

    if (sign) {
      switch (sign) {
        case SORT_ALPHABETICALLY:
          return [...goodsFromServer].sort((first, second) => {
            return second.localeCompare(first);
          });

        case SORT_BY_LENGTH:
          return [...goodsFromServer].sort((first, second) => {
            if (second.length === first.length) {
              return second.localeCompare(first);
            }

            return second.length - first.length;
          });

        default:
          break;
      }
    }
  } else {
    switch (sign) {
      case SORT_ALPHABETICALLY:
        return [...goodsFromServer]
          .sort((first, second) => {
            return second.localeCompare(first);
          })
          .reverse();

      case SORT_BY_LENGTH:
        return [...goodsFromServer]
          .sort((first, second) => {
            if (second.length === first.length) {
              return second.localeCompare(first);
            }

            return second.length - first.length;
          })
          .reverse();

      default:
        break;
    }
  }

  return newList;
}

export const App = () => {
  const [sortSign, setSortSign] = useState('');
  const [reverse, setReverseSortList] = useState(false);
  const newSortList = getSortedList(sortSign, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortSign(SORT_ALPHABETICALLY)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortSign !== SORT_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortSign(SORT_BY_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortSign !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseSortList(!reverse)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
        >
          Reverse
        </button>

        {sortSign || reverse ? (
          <button
            onClick={() => {
              setSortSign('');
              setReverseSortList(false);
            }}
            type="button"
            className={cn('button is-dangeris-light')}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {newSortList.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
