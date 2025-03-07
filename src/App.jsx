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

const SORT_BY_ALPHABET = 'alph';
const SORT_BY_LENGTH = 'length';
const RESET = '';

const getPreparedGoods = (goods, sortField) => {
  const preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_BY_ALPHABET:
        return preparedGoods.sort((good1, good2) => good1.localeCompare(good2));

      case SORT_BY_LENGTH:
        return preparedGoods.sort(
          (good1, good2) => good1.length - good2.length,
        );

      case RESET:
        return [...goods];

      default:
        return 0;
    }
  }

  return preparedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  let visibleGoods = getPreparedGoods(goodsFromServer, sortField, reversed);

  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_BY_ALPHABET,
          })}
          onClick={() => {
            setSortField(SORT_BY_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => {
            setSortField(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': reversed === false,
          })}
          onClick={() => {
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {JSON.stringify(goodsFromServer) !== JSON.stringify(visibleGoods) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(RESET);
              setReversed(false);
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
