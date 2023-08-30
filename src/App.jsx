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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, isReversed }) {
  let preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_FIELD_NAME: (
        preparedGoods.sort((good1, good2) => good1.localeCompare(good2))
      );
        break;

      case SORT_FIELD_LENGTH: (
        preparedGoods
          .sort((good1, good2) => good1[sortField] - good2[sortField])
      );
        break;

      default:
        return 0;
    }
  }

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setReverseField] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, isReversed },
  );

  const resetSortingSettings = () => {
    setSortField('');
    setReverseField(false);
  };

  const isSortByReversed = (sortField || isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_NAME,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_NAME);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
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
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setReverseField(!isReversed)}
        >
          Reverse
        </button>

        {isSortByReversed && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSortingSettings}
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
