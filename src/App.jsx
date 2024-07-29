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

function getPreparedGoods(goods, sortField, isReversed) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');

  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);

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
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
          }}
          className={cn(
            `button is-success ${sortField !== SORT_FIELD_LENGTH && 'is-light'}`,
            {
              active: sortField === SORT_FIELD_NAME,
            },
          )}
        >
          Sort by length
        </button>
        <button
          type="button"
          onClick={() => setIsReversed(!isReversed)}
          className={cn('button', 'is-warning', {
            'is-light': isReversed === false,
          })}
        >
          Reverse
        </button>

        {sortField === '' && isReversed === false ? (
          ''
        ) : (
          <button
            type="button"
            className={cn(
              `button is-success ${sortField !== '' && 'is-light'}`,
              {
                active: sortField === SORT_FIELD_NAME,
              },
            )}
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
