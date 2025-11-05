import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
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

const SORT = {
  ALPHABET: 'alp',
  LENGTH: 'len',
  REVERSE: 'rev',
};

function getSortedGoods(goods, { sortField, reversField }) {
  const prepearGoods = [...goods];

  if (sortField) {
    prepearGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT.LENGTH:
          return good1.length - good2.length;
        case SORT.ALPHABET:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (reversField === SORT.REVERSE) {
    prepearGoods.reverse();
  }

  return prepearGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversField, setReversField] = useState('');
  const normalGoods = getSortedGoods(goodsFromServer, {
    sortField,
    reversField,
  });
  const handleSort = field => setSortField(field);
  const handleReverse = () =>
    setReversField(prev => (prev === SORT.REVERSE ? '' : SORT.REVERSE));
  const handleReset = () => {
    setSortField('');
    setReversField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => handleSort(SORT.ALPHABET)}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT.ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => handleSort(SORT.LENGTH)}
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={cn('button', 'is-warning', {
            'is-light': reversField !== SORT.REVERSE,
          })}
        >
          Reverse
        </button>

        {(sortField || reversField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {normalGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
