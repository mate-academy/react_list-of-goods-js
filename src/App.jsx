import 'bulma/css/bulma.css';
import classNames from 'classnames';
import { useState } from 'react';
import './App.scss';

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

function getPreparedGoods(goods, sortField, isReversed) {
  const preparedGoods = [...goods];

  if (sortField === 'alphabet') {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortField === 'length') {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);
  const isChanged = sortField !== '' || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField('alphabet')}
          className={classNames('button', 'is-info', {
            'is-light': sortField !== 'alphabet',
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField('length')}
          className={classNames('button', 'is-success', {
            'is-light': sortField !== 'length',
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(prev => !prev)}
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
            className="button is-danger is-light"
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
