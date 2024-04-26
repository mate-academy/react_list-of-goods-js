import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';
import { getPreparedGoods } from './utils/getPreparedGoods';

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

const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_DEFAULT = '';

export const App = () => {
  const [sortField, setSortField] = useState(SORT_FIELD_DEFAULT);
  const [reverseMethod, setReverseMethod] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    {
      sortField,
      reverseMethod,
    },
    SORT_FIELD_LENGTH,
    SORT_FIELD_ALPHABETICALLY,
  );

  const resetSort = () => {
    setSortField('');
    setReverseMethod(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETICALLY,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
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
          className={cn('button is-warning', {
            'is-light': !reverseMethod,
          })}
          onClick={() => {
            setReverseMethod(!reverseMethod);
          }}
        >
          Reverse
        </button>

        {(reverseMethod || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSort}
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
