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

export const App = () => {
  const [sortedGoods, setSortedGoods] = useState([...goodsFromServer]);
  const [isSorted, setIsSorted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortButton, setSortButton] = useState(null);

  const sortGoods = (sortField) => {
    const sorted = [...sortedGoods].sort((good1, good2) => {
      switch (sortField) {
        case 'alphabetically':
          return (isReversed
            ? good2.localeCompare(good1)
            : good1.localeCompare(good2)
          );
        case 'byLength':
          return (isReversed
            ? good2.length - good1.length
            : good1.length - good2.length
          );
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

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortButton !== 'alphabetically',
          })}
          onClick={() => sortGoods('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortButton !== 'byLength',
          })}
          onClick={() => sortGoods('byLength')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={reverseList}
        >
          Reverse
        </button>

        {(isSorted || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetList}
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
