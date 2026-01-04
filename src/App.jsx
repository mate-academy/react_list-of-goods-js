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

const setMode = (mode = '') => {
  const goodsList = [...goodsFromServer];

  if (mode === 'abc') {
    goodsList.sort((a, b) => a.localeCompare(b));
  }

  if (mode === 'length') {
    goodsList.sort((a, b) => a.length - b.length);
  }

  return goodsList;
};

export const App = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [mode, setModeState] = useState('');

  const goodsList = setMode(mode);

  if (isReversed) {
    goodsList.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${mode === 'abc' ? '' : 'is-light'}`}
          onClick={() => {
            setModeState('abc');
          }}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${mode === 'length' ? '' : 'is-light'}`}
          onClick={() => {
            setModeState('length');
          }}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(mode.length > 0 || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setModeState('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsList.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
