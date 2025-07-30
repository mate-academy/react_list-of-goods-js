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
  const [active, setActive] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const getSorted = () => {
    const sorted = [...goodsFromServer];

    if (active === 'alphabetic') {
      sorted.sort((a, b) => a.localeCompare(b));
    } else if (active === 'length') {
      sorted.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sorted.reverse();
    }

    return sorted;
  };

  const sortedGoods = getSorted();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            active === 'alphabetic'
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setActive('alphabetic')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            active === 'length'
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setActive('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(active || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setActive('');
              setIsReversed(false);
            }}
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
