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

const SORT_FIELD_ALPHABETICALLY = 'Sort alphabetically';
const SORT_FIELD_BY_LENGTH = 'Sort by length';

function getPreparedGoods(goods, sortField) {
  const preparedGoods = [...goods];

  switch (sortField.sortType) {
    case SORT_FIELD_ALPHABETICALLY:
      return preparedGoods.sort((good1, good2) => good1.localeCompare(good2));

    case SORT_FIELD_BY_LENGTH:
      return preparedGoods.sort((good1, good2) => good1.length - good2.length);

    default:
      return preparedGoods;
  }
}

export const App = () => {
  const [sortField, setSortField] = useState({
    sortType: '',
    isReversed: false,
  });

  let sortedGoods = getPreparedGoods(goodsFromServer, sortField);

  function reverseGoods(goods) {
    return [...goods].reverse();
  }

  if (sortField.isReversed === true) {
    sortedGoods = reverseGoods(sortedGoods);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() =>
            setSortField({
              sortType: SORT_FIELD_ALPHABETICALLY,
              isReversed: sortField.isReversed,
            })
          }
          className={cn('button', 'is-info', {
            'is-light': sortField.sortType !== SORT_FIELD_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField.sortType !== SORT_FIELD_BY_LENGTH,
          })}
          onClick={() =>
            setSortField({
              sortType: SORT_FIELD_BY_LENGTH,
              isReversed: sortField.isReversed,
            })
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': sortField.isReversed !== true,
          })}
          onClick={() =>
            setSortField({ ...sortField, isReversed: !sortField.isReversed })
          }
        >
          Reverse
        </button>

        {(sortField.isReversed || sortField.sortType) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortField({ sortType: '', isReversed: false })}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
