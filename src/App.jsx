import { useState } from 'react';
import { v4 as getId } from 'uuid';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

const SORT_BY_ALPHABET = 'alphabetically';
const SORT_BY_LENGTH = 'length';

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

const getPreparedGoods = (goods, { sortField, isReverse }) => {
  let preparedGoods = goods.map(good => ({ name: good, id: getId() }));

  if (sortField) {
    preparedGoods = preparedGoods.toSorted((good1, good2) => {
      switch (sortField) {
        case SORT_BY_ALPHABET:
          return good1.name.localeCompare(good2.name);
        case SORT_BY_LENGTH:
          return good1.name.length - good2.name.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const isOriginalOrder = !!sortField || isReverse;

  const preparedGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReverse,
  });

  const handleResetClick = () => {
    setSortField('');
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_BY_ALPHABET)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_BY_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReverse(!isReverse)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
        >
          Reverse
        </button>

        {isOriginalOrder && (
          <button
            onClick={handleResetClick}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(({ id, name }) => (
          <li key={id} data-cy="Good">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};
