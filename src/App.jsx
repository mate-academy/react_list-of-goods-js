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

const SORT_BY_LENGTH = 'length';
const SORT_BY_ALPHABET = 'alphabet';
const REVERSE = 'reverse';

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_LENGTH:
          return good1.length - good2.length;
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });
  let isClicked = false;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_BY_ALPHABET,
          })}
          onClick={() => {
            setSortField(SORT_BY_ALPHABET);
            isClicked = true;
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => {
            setSortField(SORT_BY_LENGTH);
            isClicked = true;
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': sortField === REVERSE,
          })}
          onClick={() => {
            setIsReversed(REVERSE);
            isClicked = true;
          }}
        >
          Reverse
        </button>

        {isClicked && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setIsReversed('');
              isClicked = false;
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
