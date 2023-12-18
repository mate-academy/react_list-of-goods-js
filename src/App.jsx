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

  const sortByLetters = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    setSortedProducts(actionState.reverse ? sorted.reverse() : sorted);
    setActionState(prevState => ({
      ...prevState,
      alphabetically: true,
      length: false,
    }));
  };

  const sortbyLength = () => {
    const sorted = [...goodsFromServer]
      .sort((a, b) => a.length - b.length);

    setSortedProducts(actionState.reverse ? sorted.reverse() : sorted);
    setActionState(prevState => ({
      ...prevState,
      alphabetically: false,
      length: true,
    }));
  };

  const handleReverseClick = () => {
    const reversedProducts = [...sortedProducts].reverse();

    setSortedProducts(reversedProducts);
    setActionState(prevState => ({
      ...prevState,
      reverse: !prevState.reverse,
    }));
  };

  const handleResetClick = () => {
    setSortedProducts(goodsFromServer);
    setActionState(defaultState);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByLetters}
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
          onClick={sortbyLength}
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
          onClick={handleReverseClick}
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
            onClick={handleResetClick}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedProducts.map(product => (
          <li key={product} data-cy="Good">{product}</li>
        ))}
      </ul>
    </div>
  );
};
