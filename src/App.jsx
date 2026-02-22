import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';
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

export const Goods = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li key={good} data-cy="Good">
        {good}
      </li>
    ))}
  </ul>
);

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  // ✅ named methods (вимога checklist)

  const sortAlphabetically = () => setSortField('alphabetically');
  const sortByLength = () => setSortField('length');
  const toggleReverse = () => setReversed(prev => !prev);

  const resetGoods = () => {
    setSortField('');
    setReversed(false);
  };

  const getVisibleGoods = () => {
    let goods = [...goodsFromServer];

    if (sortField === 'alphabetically') {
      goods.sort((a, b) => a.localeCompare(b));
    }

    if (sortField === 'length') {
      goods.sort((a, b) => a.length - b.length);
    }

    if (reversed) {
      goods.reverse();
    }

    return goods;
  };

  const visibleGoods = getVisibleGoods();

  return (
    <div className="section content">
      <div>Sort by:</div>

      <div className="buttons">
        <button
          type="button"
          onClick={sortAlphabetically}
          className={classNames('button is-info', {
            'is-light': sortField !== 'alphabetically',
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className={classNames('button is-success', {
            'is-light': sortField !== 'length',
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={toggleReverse}
          className={classNames('button is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            onClick={resetGoods}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <Goods goods={visibleGoods} />
    </div>
  );
};