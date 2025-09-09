import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

const SORT_FIELD_ALPHABET = 'alphabetically';
const SORT_FIELD_LENGTH = 'byLength';

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

export const App = () => {
  const [sortedGoods, setSortedGoods] = useState([...goodsFromServer]);
  const [isSorted, setIsSorted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortButton, setSortButton] = useState(null);

  const sortGoods = sortField => {
    const sorted = [...sortedGoods].sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return isReversed
            ? good2.localeCompare(good1)
            : good1.localeCompare(good2);
        case SORT_FIELD_LENGTH:
          return isReversed
            ? good2.length - good1.length
            : good1.length - good2.length;
        default:
          return 0;
      }
    });

    setSortedGoods(sorted);
    setIsSorted(true);
    setSortButton(sortField);
  };

  const reverseList = () => {
    const reversed = [...sortedGoods].reverse();

    setSortedGoods(reversed);
    setIsReversed(!isReversed);
  };

  const resetList = () => {
    setSortedGoods([...goodsFromServer]);
    setIsSorted(false);
    setIsReversed(false);
    setSortButton(null);
  };

  const areArraysEqual = (arr1, arr2) => {
    return arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => sortGoods(SORT_FIELD_ALPHABET)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortButton !== SORT_FIELD_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => sortGoods(SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortButton !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={reverseList}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(!areArraysEqual(sortedGoods, goodsFromServer) || isSorted) && (
          <button
            onClick={resetList}
            type="button"
            className="button is-danger is-light"
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
