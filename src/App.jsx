import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';
import GoodList from './GoodList';
import { getPreparedGoods } from './utils/helpers';
import { SORT_FIELD } from './utils/constants';

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

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortField, reversed },
  );
  const isResetButtonVisible = sortField || reversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SORT_FIELD.ALPHABET })}
          onClick={() => setSortField(SORT_FIELD.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SORT_FIELD.LENGTH })}
          onClick={() => setSortField(SORT_FIELD.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': !reversed })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
