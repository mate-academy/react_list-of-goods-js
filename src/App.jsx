import 'bulma/css/bulma.css';
import cn from 'classnames';
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
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const reset = () => {
    setSortBy('');
    setIsReversed(false);
  };

  const visibleGoods = [...goodsFromServer];

  visibleGoods.sort((a, b) => {
    if (sortBy === 'alphabet') {
      return a.localeCompare(b);
    }

    if (sortBy === 'length') {
      return a.length - b.length;
    }

    return 0;
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== 'alphabet',
          })}
          onClick={() => setSortBy('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== 'length',
          })}
          onClick={() => setSortBy('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortBy !== '' || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
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
