import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
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

function getPrepared(goods, { sortField, reversed }) {
  const result = [...goods];

  if (sortField) {
    result.sort((a, b) => {
      if (sortField === 'alphabetically') {
        return a.localeCompare(b);
      }

      return a.length - b.length;
    });
  }

  return reversed ? result.toReversed() : result;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const visibleGoods = getPrepared(goodsFromServer, { sortField, reversed });

  const isChanged = sortField || reversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== 'alphabetically',
          })}
          onClick={() =>
            setSortField(sortField === 'alphabetically' ? '' : 'alphabetically')
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== 'by length',
          })}
          onClick={() =>
            setSortField(sortField === 'by length' ? '' : 'by length')
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => {
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className={cn('button is-danger is-light', {
              'is-light': sortField !== 'reset',
            })}
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
