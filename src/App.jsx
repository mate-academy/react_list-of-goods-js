import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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
  NAME: 'name',
  LENGTH: 'length',
  NONE: 'none',
};

function getPreparedGoods(goods, sortField, isReversed) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD.NAME:
          return good1.localeCompare(good2);

        case SORT_FIELD.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });

    if (isReversed) {
      preparedGoods.reverse();
    }
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SORT_FIELD.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD.NAME)}
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SORT_FIELD.NAME,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD.LENGTH)}
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SORT_FIELD.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(prevIsReversed => !prevIsReversed)}
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortField !== SORT_FIELD.NONE || isReversed) && (
          <button
            onClick={() => {
              setSortField(SORT_FIELD.NONE);
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
