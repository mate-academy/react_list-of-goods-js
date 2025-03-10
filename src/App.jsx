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

function getPrepareGoods(goods, { sortField, reversed }) {
  const visibleGoods = [...goods];

  if (sortField) {
    visibleGoods.sort((good1, good2) => {
      switch (sortField) {
        case 'Sort alphabetically':
          return good1.localeCompare(good2);
        case 'Sort by length':
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const preparedGoods = getPrepareGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField('Sort alphabetically')}
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== 'Sort alphabetically',
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField('Sort by length')}
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== 'Sort by length',
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={classNames('button is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
