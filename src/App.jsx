import { useState } from 'react';
import cn from 'classnames';
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

export const App = () => {
  const [sortedItems, setSortedItems] = useState(goodsFromServer);
  const [isAlphaSorted, setIsAlphaSorted] = useState(false);
  const [isLengthSorted, setIsLengthSorted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  const sortAlpha = () => {
    setSortedItems([...goodsFromServer].sort((a, b) => a.localeCompare(b)));
    setIsAlphaSorted(true);
    setIsLengthSorted(false);
  };

  const sortByLength = () => {
    setSortedItems([...goodsFromServer].sort((a, b) => a.length - b.length));
    setIsLengthSorted(true);
    setIsAlphaSorted(false);
  };

  const reversed = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setSortedItems(goodsFromServer);
    setIsLengthSorted(false);
    setIsAlphaSorted(false);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', { 'is-light': !isAlphaSorted })}
          onClick={sortAlpha}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button', 'is-success', { 'is-light': !isLengthSorted },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={reversed}
        >
          Reverse
        </button>

        {(isAlphaSorted || isLengthSorted || isReversed)
          && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
          )
        }
      </div>

      <ul>
        {!isReversed && sortedItems.map(good => (
          <li data-cy="Good" key={good}>{ good }</li>
        ))}
        {isReversed && sortedItems.map(good => (
          <li data-cy="Good" key={good}>{ good }</li>
        )).reverse()}
      </ul>
    </div>
  );
};
