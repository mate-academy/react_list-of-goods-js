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
  sortField: null,
  isReversed: false,
};

const getPreparedGoods = (goods, { sortField, isReversed }) => {
  const preparedGoods = [...goods];

  if (sortField === 'alphabetically') {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortField === 'length') {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [actionState, setActionState] = useState(defaultState);

  const handleSortFieldChange = (sortField) => {
    setActionState((...prevState) => ({
      ...prevState,
      sortField,
    }));
  };

  const handleReverse = () => {
    setActionState(prevState => ({
      ...prevState,
      isReversed: !prevState.isReversed,
    }));
  };

  const handleReset = () => {
    setActionState(defaultState);
  };

  const sortedProducts = getPreparedGoods(goodsFromServer, actionState);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSortFieldChange('alphabetically')}
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': actionState.sortField !== 'alphabetically' },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => handleSortFieldChange('length')}
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': actionState.sortField !== 'length' },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !actionState.isReversed },
          )}
        >
          Reverse
        </button>

        {(actionState.sortField || actionState.isReversed) && (
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
