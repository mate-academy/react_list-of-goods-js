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

const initialGoods = [...goodsFromServer];

export const App = () => {
  const [sortBy, setSortBy] = useState('none');
  const [isReversed, setIsReversed] = useState(false);

  const getVisibleGoods = () => {
    const result = [...initialGoods];

    switch (sortBy) {
      case 'alphabet':
        result.sort((a, b) => a.localeCompare(b));
        break;

      case 'length':
        result.sort((a, b) => a.length - b.length);
        break;

      default:
        break;
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  };

  const visibleGoods = getVisibleGoods();
  const isModified = sortBy !== 'none' || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy === 'alphabet' ? '' : `is-light`} `}
          onClick={() => {
            setSortBy('alphabet');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy === 'length' ? '' : `is-light`} `}
          onClick={() => {
            setSortBy('length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed === true ? '' : `is-light`} `}
          onClick={() => {
            setIsReversed(prev => !prev);
          }}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy('none');
              setIsReversed(false);
            }}
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
