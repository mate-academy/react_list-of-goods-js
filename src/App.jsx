import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
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

const getPreparedGoods = (goods, { sortedField, reversed }) => {
  const preparedGoods = [...goods];

  if (sortedField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortedField) {
        case 'alphabet':
          return good1.localeCompare(good2);
        case 'length':
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortedField, setSortedField] = useState('');
  const [reversed, setReversed] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortedField,
    reversed,
  });

  const isResetVisible = sortedField !== '' || reversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortedField('alphabet')}
          type="button"
          className={cn(
            {
              'is-light': sortedField !== 'alphabet',
            },
            'button is-info',
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortedField('length')}
          type="button"
          className={cn(
            {
              'is-light': sortedField !== 'length',
            },
            'button is-success',
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={cn(
            {
              'is-light': !reversed,
            },
            'button is-warning',
          )}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            onClick={() => {
              setSortedField('');
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
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
