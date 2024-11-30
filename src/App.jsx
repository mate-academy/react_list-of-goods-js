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

const SORT_FIELD_ALPABETICAL = 'alphabetical';
const SORT_FIELD_LENGHT = 'length';

function getPreparedGoods(goods, { sortField, reverse }) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SORT_FIELD_ALPABETICAL:
          return a.localeCompare(b);
        case SORT_FIELD_LENGHT:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  const handleSortFieldChange = sortBy => {
    setSortField(sortBy);
  };

  const handleReset = () => {
    setSortField('');
    setReverse(false);
  };

  const isResetVisible = sortField || reverse;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info ', {
            'is-light': sortField !== SORT_FIELD_ALPABETICAL,
          })}
          onClick={() => handleSortFieldChange(SORT_FIELD_ALPABETICAL)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGHT,
          })}
          onClick={() => handleSortFieldChange(SORT_FIELD_LENGHT)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {isResetVisible && (
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
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
