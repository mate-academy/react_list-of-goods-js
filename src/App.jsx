import 'bulma/css/bulma.css';
import { useState } from 'react';
import cn from 'classnames';
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

const SORT_FIELD = {
  LENGTH: 'length',
  NAME: 'name',
};

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  if (!sortField && isReversed) {
    return preparedGoods.reverse();
  }

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case (SORT_FIELD.NAME):
          return isReversed
            ? good2.localeCompare(good1)
            : good1.localeCompare(good2);
        case (SORT_FIELD.LENGTH):
          if (good2.length !== good1.length) {
            return isReversed
              ? good2.length - good1.length
              : good1.length - good2.length;
          }

          return isReversed
            ? good2.localeCompare(good1)
            : good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortField, isReversed },
  );
  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  const setSort = field => () => {
    setSortField(field);
  };

  const onReversed = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD.NAME,
          })}
          onClick={setSort(SORT_FIELD.NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD.LENGTH,
          })}
          onClick={setSort(SORT_FIELD.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={onReversed}
        >
          Reverse
        </button>
        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )
        }
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
