import cn from 'classnames';
import { useState } from 'react';

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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';
const SORT_REVERSE = 'reverse';

function getPreparedGoods(goods, { sortCase, reverseCase }) {
  const preparedGoods = [...goods];

  if (sortCase) {
    preparedGoods.sort((good1, good2) => {
      switch (sortCase) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseCase) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortCase, setSortCase] = useState('');
  const [reverseCase, setReverseCase] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortCase,
    reverseCase,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortCase(SORT_BY_ALPHABET)}
          type="button"
          className={cn(
            { 'is-light': SORT_BY_ALPHABET !== sortCase },
            'button is-info',
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortCase(SORT_BY_LENGTH)}
          type="button"
          className={cn(
            { 'is-light': SORT_BY_LENGTH !== sortCase },
            'button is-success',
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            { 'is-light': SORT_REVERSE !== reverseCase },
            'button is-warning',
          )}
          onClick={() => {
            // eslint-disable-next-line no-unused-expressions
            SORT_REVERSE !== reverseCase
              ? setReverseCase(SORT_REVERSE)
              : setReverseCase('');
          }}
        >
          Reverse
        </button>

        {(sortCase || reverseCase) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortCase('');
              setReverseCase('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
