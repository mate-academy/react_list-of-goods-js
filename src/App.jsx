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

const SORT_ALPHABET = 'alphabet';
const SORT_LENGTH = 'length';

const getPrepearedGoods = (goods, { sortField, reverseThis }) => {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_LENGTH:
          return good1.length - good2.length;
        default:
          return false;
      }
    });
  }

  if (reverseThis) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseThis, setReverseThis] = useState(false);
  const visibleGoods = getPrepearedGoods(
    goodsFromServer, { sortField, reverseThis },
  );

  const reset = () => {
    setSortField('');
    setReverseThis(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_ALPHABET)}
          className={cn('button is-info', {
            'is-light': sortField !== SORT_ALPHABET,
          })}

        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_LENGTH)}
          className={cn('button is-success', {
            'is-light': sortField !== SORT_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReverseThis(!reverseThis)}
          className={cn('button is-warning', {
            'is-light': !reverseThis,
          })}
        >
          Reverse
        </button>

        {(sortField || reverseThis) && (
          <button
            type="button"
            onClick={reset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
