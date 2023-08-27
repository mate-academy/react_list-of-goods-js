/* eslint-disable no-console */
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

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
const REVERSE_FIELD = false;

function getPreparedGoods(goods, { sortField, reverseField }) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort(
      (goods1, goods2) => {
        switch (sortField) {
          case SORT_FIELD_NAME:
            return goods1.localeCompare(goods2);

          case SORT_FIELD_LENGTH:
            return goods1.length - goods2.length;
          default:
            return 0;
        }
      },
    );
  }

  if (reverseField) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(REVERSE_FIELD);

  const visibleGoods = getPreparedGoods(goodsFromServer,
    { sortField, reverseField });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SORT_FIELD_NAME })}
          onClick={() => setSortField(SORT_FIELD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': reverseField === REVERSE_FIELD })}
          onClick={() => setReverseField(!reverseField)}
        >
          Reverse
        </button>
        {(sortField || reverseField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReverseField(false);
            }}
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
