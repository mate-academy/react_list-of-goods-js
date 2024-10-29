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

const INITIAL_STATE = { sort: 'none', reverse: false };

const ALPHABET_SORT = 'alphabet';
const STR_LENGTH_SORT = 'length';

const getPreparedGoods = (goods, { sort, reverse }) => {
  const preparedGoods = [...goods];

  if (sort) {
    preparedGoods.sort((good1, good2) => {
      switch (sort) {
        case ALPHABET_SORT:
          return good1.localeCompare(good2);

        case STR_LENGTH_SORT:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState(INITIAL_STATE);

  const handleSort = sortType => {
    setSortField(prevState => ({
      sort: sortType,
      reverse: prevState.reverse,
    }));
  };

  const handleReset = () => setSortField(INITIAL_STATE);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField.sort !== ALPHABET_SORT,
          })}
          onClick={() => handleSort(ALPHABET_SORT)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField.sort !== STR_LENGTH_SORT,
          })}
          onClick={() => handleSort(STR_LENGTH_SORT)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !sortField.reverse,
          })}
          onClick={() =>
            setSortField({ ...sortField, reverse: !sortField.reverse })
          }
        >
          Reverse
        </button>

        {sortField.sort === 'none' && sortField.reverse === false ? (
          ''
        ) : (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleReset()}
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
