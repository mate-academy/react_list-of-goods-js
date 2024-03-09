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

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [showReversed, setShowReversed] = useState(false);
  const [sortedBy, setSortedBy] = useState('');

  const applyReverse = data => (showReversed ? data.reverse() : data);

  const processData = (data, sort) => {
    setVisibleGoods(applyReverse(data));
    setSortedBy(sort);
  };

  const sortByAlphabet = () => {
    processData(
      [...goodsFromServer].sort((a, b) => a.localeCompare(b)),
      'alphabet',
    );
  };

  const sortByLength = () => {
    processData(
      [...goodsFromServer].sort(
        (a, b) => a.length - b.length || a.localeCompare(b),
      ),
      'length',
    );
  };

  const toggleReverse = () => {
    setShowReversed(!showReversed);
    setVisibleGoods([...visibleGoods].reverse());
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortedBy !== 'alphabet',
          })}
          onClick={() => {
            sortByAlphabet();
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortedBy !== 'length',
          })}
          onClick={() => {
            sortByLength();
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !showReversed,
          })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {sortedBy === '' && showReversed === false ? null : (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortedBy('');
              setShowReversed(false);
              setVisibleGoods([...goodsFromServer]);
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
