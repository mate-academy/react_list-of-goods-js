import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './components/GoodList/GoodList';

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

const SORT_FIELD_ALPH = 'alphabet';
const SORT_FIELD_LENGTH = 'length';
const REVERSE_GOODS = 'reverse';

function getPreparedGoods(goods, { sortField, reverse }) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPH:
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
  const visibleGoods = getPreparedGoods(goodsFromServer,
    { sortField, reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPH)}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPH })}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={() => (reverse !== ''
            ? setReverse('')
            : setReverse(REVERSE_GOODS))}
          type="button"
          className={`button is-warning ${cn({ 'is-light': reverse !== REVERSE_GOODS })}`}
        >
          Reverse
        </button>

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
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
