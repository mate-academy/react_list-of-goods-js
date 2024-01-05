import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';
const REVERSE = 'reverse';

function getPreparedGoods(goods, { sortField, reverse }) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods
      .sort((good1, good2) => {
        switch (sortField) {
          case SORT_FIELD_ALPHABET:
            return good1.localeCompare(good2);

          case SORT_FIELD_LENGTH:
            return good1.length - good2.length;

          default:
            return 0;
        }
      });
  }

  if (reverse !== '') {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState('');
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, reverse },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPHABET },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={`button is-success ${cn({ 'is-light': sortField !== SORT_FIELD_LENGTH })}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => (reverse !== ''
            ? setReverse('')
            : setReverse(REVERSE))}
          type="button"
          className={`button is-warning ${cn({ 'is-light': reverse !== REVERSE })}`}
        >
          Reverse
        </button>

        {(sortField === '' && reverse === '') || (
          <button
            onClick={() => {
              setSortField('');
              setReverse('');
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
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
