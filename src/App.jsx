import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

function solutionGoods(goods, sortField, reversed) {
  let newGoods = [...goods];

  if (sortField) {
    newGoods.sort((good1, good2) => {
      switch (sortField) {
        case 'abc':
          return good1.localeCompare(good2);
        case 'length':
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    newGoods = newGoods.reverse();
  }

  return newGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const visibleGoods = solutionGoods(goodsFromServer, sortField, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField('abc')}
          className={cn('button', { 'is-light': sortField !== 'abc' })}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          onClick={() => setSortField('length')}
          className={cn('button', { 'is-light': sortField !== 'length' })}
        >
          Sort by length
        </button>
        <button
          type="button"
          onClick={() => setReversed(!reversed)}
          className={cn('button', { 'is-light': reversed === false })}
        >
          Reverse
        </button>
        {(sortField !== '' || reversed === true) && (
          <button
            type="button"
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
            className={cn('button', 'is-light')}
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
