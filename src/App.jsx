import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
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

function isEquial(optionsA, optionsb) {
  return JSON.stringify(optionsA) === JSON.stringify(optionsb);
}

export const App = () => {
  const [sortOption, setSortOption] = useState('');
  const [direction, setDirection] = useState('');

  const reverse = () => {
    if (direction) {
      return direction === 'asc' ? -1 : 1;
    }

    return 0;
  };

  const copiedGoods = [...goodsFromServer]
    .sort((a, b) => {
      const actionsByOption = {
        alphabetically: (optionA, optionB) => optionA.localeCompare(optionB),
        length: (optionA, optionB) => optionA.length - optionB.length,
      };

      if (sortOption) {
        return actionsByOption[sortOption](a, b);
      }

      return 0;
    })
    .sort(reverse);

  const handleSetSort = option => {
    if (sortOption !== option) {
      setSortOption(option);
    }
  };

  const handleReset = () => {
    setSortOption('');
    setDirection('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortOption !== 'alphabetically',
          })}
          onClick={() => handleSetSort('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortOption !== 'length',
          })}
          onClick={() => handleSetSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': direction !== 'asc',
          })}
          onClick={() => setDirection(direction === 'asc' ? 'desc' : 'asc')}
        >
          Reverse
        </button>
        {!isEquial(goodsFromServer, copiedGoods) && (
          <button
            type="button"
            className={cn('button is-info is-light')}
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {copiedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
