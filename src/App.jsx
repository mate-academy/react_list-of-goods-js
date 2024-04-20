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

const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_ALPHABETICALLY = 'alphabetically';

function getPreparedGoods(goods, { sortField, reverseMethod }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return good1[sortField] - good2[sortField];
        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (reverseMethod) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseMethod, setReverseMethod] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverseMethod,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETICALLY,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverseMethod,
          })}
          onClick={() => {
            setReverseMethod(!reverseMethod);
          }}
        >
          Reverse
        </button>

        {(reverseMethod || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReverseMethod(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good, i) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
