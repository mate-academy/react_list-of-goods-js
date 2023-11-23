import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
/*eslint-disable */

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
  SORT_ALPHABETICALLY: 'Sort alphabetically',
  SORT_BY_LENGTH: 'Sort by length',
  REVERSE: 'Reverse',
};

const getPreparedGoods = (goods, { sortField, isReversed }) => {
  const preapredGoods = [...goods];

  if (sortField) {
    preapredGoods.sort((good1, good2) => {
      switch(sortField) {
        case SORT_FIELD.SORT_ALPHABETICALLY: {
          return good1.localeCompare(good2);
        }

        case SORT_FIELD.SORT_BY_LENGTH:
          return good1.length - good2.length
      }
    });
  }

  if(isReversed) {
    return preapredGoods.reverse()
  }

  return preapredGoods
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, { sortField, isReversed })

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SORT_FIELD.SORT_ALPHABETICALLY);
          }}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD.SORT_ALPHABETICALLY,
          })}
          >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SORT_FIELD.SORT_BY_LENGTH);
          }}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD.SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed((current) => {
              return !current
            })
          }}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': isReversed === false
          })}
        >
          Reverse
        </button>

        {sortField || isReversed ? (
          <button
            onClick={() => {
              setSortField('')
              setIsReversed(false)
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : (
          null
        )}

      </div>

        {visibleGoods.map(item => (
          <ul key={item}>
            <li data-cy="Good">{item}</li>
          </ul>
        ))}
      </div>
  );
};
