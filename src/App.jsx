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

export const sortAlphabetically = goods => {
  return goods.toSorted((a, b) => a.localeCompare(b));
};

export const sortByLength = goods => {
  return goods.toSorted((a, b) => a.length - b.length);
};

const SORT_ALPHABET = 'alphabet';
const SORT_LENGTH = 'length';

export const App = () => {
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  let goods = [...goodsFromServer];

  if (sortType === SORT_ALPHABET) {
    goods = sortAlphabetically(goods);
  } else if (sortType === SORT_LENGTH) {
    goods = sortByLength(goods);
  }

  if (isReversed) {
    goods = goods.toReversed();
  }

  const isReset = sortType !== null || isReversed;

  const handleReset = () => {
    setSortType(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SORT_ALPHABET,
          })}
          onClick={() => {
            setSortType(current => {
              return current === SORT_ALPHABET ? null : SORT_ALPHABET;
            });
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SORT_LENGTH,
          })}
          onClick={() => {
            setSortType(current => {
              return current === SORT_LENGTH ? null : SORT_LENGTH;
            });
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(current => !current)}
        >
          Reverse
        </button>

        {isReset && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
