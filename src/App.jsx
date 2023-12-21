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

const defaultState = {
  alphabetically: false,
  length: false,
  reverse: false,
};

export const App = () => {
  const [sortedProducts, setSortedProducts] = useState(goodsFromServer);
  const [actionState, setActionState] = useState(defaultState);

  const sortByAlphabet = () => {
    const newSortedProducts = [...sortedProducts].sort(
      (a, b) => a.localeCompare(b),
    );

    setSortedProducts(newSortedProducts);
    setActionState({
      alphabetically: true,
      length: false,
      reverse: false,
    });
  };

  const sortedByLength = () => {
    const newSortedProducts = [...sortedProducts].sort(
      (a, b) => a.length - b.length,
    );

    setSortedProducts(newSortedProducts);
    setActionState({
      alphabetically: false,
      length: true,
      reverse: false,
    });
  };

  const sortByReverse = () => {
    const newSortedProducts = [...sortedProducts].reverse();

    setSortedProducts(newSortedProducts);
    setActionState(prevState => ({
      ...prevState,
      reverse: !prevState.reverse,
    }));
  };

  const handleReset = () => {
    setSortedProducts(goodsFromServer);
    setActionState(defaultState);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByAlphabet}
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': !actionState.alphabetically },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortedByLength}
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': !actionState.length },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={sortByReverse}
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !actionState.reverse },
          )}
        >
          Reverse
        </button>

        {(actionState.alphabetically
          || actionState.length || actionState.reverse) && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedProducts.map(product => (
          <li key={product} data-cy="Good">
            {product}
          </li>
        ))}
      </ul>
    </div>
  );
};
