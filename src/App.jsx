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

const SORT_ALPHA = 'abc';
const SORT_LENGTH = 'length';

function sortFunction(goods, sortType, isReverse) {
  const visibleGoods = [...goods];
  const multipl = isReverse ? -1 : 1;

  if (sortType !== '') {
    visibleGoods.sort((good1, good2) => {
      switch (sortType) {
        case SORT_ALPHA:
          return good1.localeCompare(good2) * multipl;
        case SORT_LENGTH:
          return (good1.length - good2.length) * multipl;
        default:
          return 0;
      }
    });
  } else if (isReverse) return visibleGoods.reverse();

  return visibleGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods = sortFunction(goodsFromServer, sortField, reverseField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SORT_ALPHA ? 'is-light' : ''}`}
          onClick={() => {
            setSortField(SORT_ALPHA);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SORT_LENGTH ? 'is-light' : ''}`}
          onClick={() => {
            setSortField(SORT_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverseField !== true ? 'is-light' : ''}`}
          onClick={() => {
            setReverseField(prev => !prev);
          }}
        >
          Reverse
        </button>

        {(sortField !== '' || reverseField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReverseField(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
