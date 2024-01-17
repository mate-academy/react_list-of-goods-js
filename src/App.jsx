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

export const App = () => {
  const [sortedGoods, setSortedGoods] = useState([...goodsFromServer]);
  const [isSorted, setIsSorted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortButton, setSortButton] = useState(null);

  const sortAlphabetically = () => {
    const sorted = isReversed
      ? [...sortedGoods]
        .sort((good1, good2) => good1.localeCompare(good2))
        .reverse()
      : [...sortedGoods].sort((good1, good2) => good1.localeCompare(good2));

    setSortedGoods(sorted);
    setIsSorted(true);
    setSortButton('alphabetically');
  };

  const sortByLength = () => {
    const sorted = isReversed
      ? [...sortedGoods].sort((good1, good2) => good2.length - good1.length)
      : [...sortedGoods].sort((good1, good2) => good1.length - good2.length);

    setSortedGoods(sorted);
    setIsSorted(true);
    setSortButton('byLength');
  };

  const reverseList = () => {
    const reversed = [...sortedGoods].reverse();

    setSortedGoods(reversed);
    setIsSorted(!isSorted);
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
          className={`button is-info ${sortButton === 'alphabetically' ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortButton === 'byLength' ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
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
