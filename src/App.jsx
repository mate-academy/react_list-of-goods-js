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
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const getProcessedProducts = () => {
    const result = [...goodsFromServer];

    if (sortType === 'alpha') {
      result.sort((a, b) => a.localeCompare(b));
    }

    if (sortType === 'length') {
      result.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  };

  const products = getProcessedProducts();

  const sortedProducts = () => {
    setSortType('alpha');
  };

  const productByLength = () => {
    setSortType('length');
  };

  const reverseProducts = () => {
    setIsReversed(prev => !prev);
  };

  const resetProducts = () => {
    setSortType(null);
    setIsReversed(false);
  };

  const isResetVisible = sortType !== null || isReversed;

  const isActive = type => sortType === type;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isActive('alpha') ? '' : 'is-light'}`}
          onClick={sortedProducts}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isActive('length') ? '' : 'is-light'}`}
          onClick={productByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseProducts}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetProducts}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {products.map(product => (
          <li key={product} data-cy="Good">
            {product}
          </li>
        ))}
      </ul>
    </div>
  );
};
