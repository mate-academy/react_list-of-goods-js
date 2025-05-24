import 'bulma/css/bulma.css';
import classNames from 'classnames';
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
  const [goods, setGood] = useState(goodsFromServer);
  const [state, setState] = useState('noReset');

  const sortByLenght = () => {
    if (state !== 'length') {
      setGood([...goods].sort((a, b) => a.length - b.length));
      setState('length');
    } else {
      setGood([...goods].sort((a, b) => b.length - a.length));
      setState(null);
    }
  }

  const sortByAlphabet = () => {
    if (state !== 'alphabet') {
      setGood([...goods].sort((a, b) => a.localeCompare(b)));
      setState('alphabet');
    } else {
      setGood([...goods].sort((a, b) => b.localeCompare(a)));
      setState(null);
    }
  };

  const reversed = () => {
    setGood([...goods].reverse());
    setState('reversed');
  };

  const reset = () => {
    setGood([...goodsFromServer]);
    setState('noReset');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByAlphabet}
          type="button"
          className={classNames('button is-success', {
            'is-light': state !== 'alphabet',
          })}
        >
          Sort alphabetically
        </button>
        <button
          onClick={sortByLenght}
          type="button"
          className={classNames('button is-success', {
            'is-light': state !== 'length',
          })}
        >
          Sort by length
        </button>
        <button
          onClick={reversed}
          type="button"
          className={classNames('button is-warning', {
            'is-light': state !== 'reversed',
          })}
        >
          Reverse
        </button>

        {state !== 'noReset' && (
          <button
            onClick={reset}
            type="button"
            className={classNames('button is-danger', {
              'is-light': state !== 'noReset',
            })}
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
