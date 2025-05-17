import 'bulma/css/bulma.css';
import { useState } from 'react';
import classNames from 'classnames';

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
  const [sortedField, setSortedField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = [...goodsFromServer].sort((goodA, goodB) => {
    switch (sortedField) {
      case 'Sort alphabetically':
        return goodA.localeCompare(goodB);
      case 'Sort by length':
        return goodA.length - goodB.length;
      default:
        return 0;
    }
  });

  const visibleGoods = isReversed ? [...sortedGoods].reverse() : sortedGoods;

  const handleSort = field => {
    setSortedField(field);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortedField('');
    setIsReversed(false);
  };

  const resetGoods = sortedField || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        {['Sort alphabetically', 'Sort by length'].map(field => (
          <button
            key={field}
            type="button"
            className={classNames('button', {
              'is-light': field !== sortedField,
              'is-info': field === 'Sort alphabetically',
              'is-success': field === 'Sort by length',
            })}
            onClick={() => handleSort(field)}
          >
            {field}
          </button>
        ))}

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {resetGoods && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
