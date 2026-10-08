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

const SORT_ALPHABET = 'Sort alphabetically';
const SORT_LENGTH = 'Sort by length';
const SORT_REVERSE = 'Reverse';

export const App = () => {
  const [typeOfSort, setTypeOfSort] = useState('');
  const [sortReverse, setSortReverse] = useState('');
  const copyGoods = [...goodsFromServer];

  switch (typeOfSort) {
    case SORT_ALPHABET:
      copyGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SORT_LENGTH:
      copyGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (sortReverse === SORT_REVERSE) {
    copyGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': typeOfSort !== SORT_ALPHABET,
          })}
          onClick={() => setTypeOfSort(SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': typeOfSort !== SORT_LENGTH,
          })}
          onClick={() => setTypeOfSort(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': sortReverse !== SORT_REVERSE,
          })}
          onClick={() =>
            setSortReverse(sortReverse !== SORT_REVERSE ? SORT_REVERSE : '')
          }
        >
          Reverse
        </button>

        {(typeOfSort !== '' || sortReverse !== '') && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setTypeOfSort('');
              setSortReverse('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {copyGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
