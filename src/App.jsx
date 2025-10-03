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
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const handleSortAlpha = () => {
    const sortedArray = [...goods].sort((a, b) => {
      return a.localeCompare(b);
    });

    setGoods(sortedArray);
    setSortField('alpha');
  };

  const handleSortLength = () => {
    const sortedArray = [...goods].sort((a, b) => {
      return a.length - b.length;
    });

    setGoods(sortedArray);
    setSortField('length');
  };

  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
    setGoods(goodsFromServer);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const visibleGoods = [...goods];

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== 'alpha',
            // active: sortField === 'alpha',
          })}
          onClick={() => handleSortAlpha()}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== 'length',
            // active: sortField === 'length',
          })}
          onClick={() => handleSortLength()}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': isReversed === false,
            // active: isReversed === true,
          })}
          onClick={() => handleReverse()}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleReset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
