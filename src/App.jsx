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

function getSortedGoods(goods, sortMethod, sortDirection) {
  const preparedGoods = [...goods];

  switch (sortMethod) {
    case 'alphabetical':
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case 'length':
      preparedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (sortDirection === 'reverse') {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortMethod, setSortMethod] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  const visibleGoods = getSortedGoods(
    goodsFromServer,
    sortMethod,
    sortDirection,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortMethod !== 'alphabetical',
          })}
          onClick={() => setSortMethod('alphabetical')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortMethod !== 'length',
          })}
          onClick={() => setSortMethod('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': sortDirection !== 'reverse',
          })}
          onClick={() => {
            setSortDirection(prev => (prev === 'reverse' ? '' : 'reverse'));
          }}
        >
          Reverse
        </button>

        {(sortDirection || sortMethod) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortDirection('');
              setSortMethod('');
            }}
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
