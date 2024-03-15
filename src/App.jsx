import { useState } from 'react';

import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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

const sortByAlphabet = data => {
  return data.sort((a, b) => a.localeCompare(b));
};

const sortByLength = data => {
  return data.sort((a, b) => a.length - b.length || a.localeCompare(b));
};

const ALPHABET = 'alphabet';
const LENGTH = 'length';

export const App = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortedBy, setSortedBy] = useState('');

  const toggleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const isResetButtonVisible = sortedBy || isReversed;

  const getPreparedData = () => {
    let result = [...goodsFromServer];

    if (sortedBy) {
      result =
        sortedBy === ALPHABET ? sortByAlphabet(result) : sortByLength(result);
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortedBy !== ALPHABET,
          })}
          onClick={() => {
            setSortedBy(ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortedBy !== LENGTH,
          })}
          onClick={() => {
            setSortedBy(LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortedBy('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getPreparedData().map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
