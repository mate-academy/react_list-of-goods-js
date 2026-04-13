import 'bulma/css/bulma.css';
import './App.scss';
import { useState, useRef } from 'react';
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

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const originalGoods = useRef([...goodsFromServer]);
  const isOriginal = visibleGoods.join(',') === originalGoods.current.join(',');

  const sortByAlphabetically = () => {
    const sorted = [...visibleGoods].sort((a, b) => a.localeCompare(b));

    setVisibleGoods(reversed ? sorted.reverse() : sorted);
    setSortField('alphabetically');
  };

  const sortByLength = () => {
    const sorted = [...visibleGoods].sort((a, b) => {
      const lengthDiff = a.length - b.length;

      if (lengthDiff !== 0) {
        return lengthDiff;
      }

      return a.localeCompare(b);
    });

    setVisibleGoods(reversed ? sorted.reverse() : sorted);
    setSortField('length');
  };

  const reset = () => {
    setVisibleGoods([...originalGoods.current]);
    setSortField('');
    setReversed(false);
  };

  const toggleReverse = () => {
    setVisibleGoods(prev => [...prev].reverse());
    setReversed(prev => !prev);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== 'alphabetically',
          })}
          onClick={sortByAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== 'length',
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {!isOriginal && (
          <button
            type="button"
            className={classNames('button', 'is-danger', 'is-light')}
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
