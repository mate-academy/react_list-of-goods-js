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

const SORT_FEILD_ALPHABET = 'Sort alphabetically';
const SORT_FIELD_LENGTH = 'Sort by length';

function getPreparedGoods(goods, { sortField }, isReverse) {
  const preparedGoods = [...goods];

  if (sortField === SORT_FIELD_LENGTH || sortField === SORT_FEILD_ALPHABET) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        case SORT_FEILD_ALPHABET:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortField }, isReverse,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FEILD_ALPHABET)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FEILD_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
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

        {(sortField || isReverse) && (
          <button
            onClick={() => {
              setSortField('');
              setIsReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )
        }

      </div>

      <ul>
        {[...visibleGoods].map(goods => (
          <li data-cy="Good" key={goods}>{goods}</li>
        ))}
      </ul>
    </div>
  );
};
