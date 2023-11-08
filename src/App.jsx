import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './components/GoodsList';

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

const goodsWithProperty = goodsFromServer.map((good, i) => ({
  id: i + 1,
  name: good,
  length: good.length,
}));

const SORT_BY_NAME = 'name';
const SORT_BY_LENGTH = 'length';
const REVERSE = 'reverse';

function prepeareGoods(goods, sortName, reverse) {
  let prepearedGoods = [...goods];

  if (sortName) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortName) {
        case SORT_BY_NAME:
          return good1.name.localeCompare(good2.name);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    prepearedGoods = prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState('');
  const sortedGoodsList = prepeareGoods(goodsWithProperty, sortField, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_BY_NAME,
          })}
          onClick={() => setSortField(SORT_BY_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': !reverse,
          })}
          onClick={() => (reverse ? setReverse('') : setReverse(REVERSE))}
        >
          Reverse
        </button>

        <button
          type="button"
          className={cn('button', 'is-danger', 'is-light', {
            'is-hidden': !sortField && !reverse,
          })}
          onClick={() => {
            setSortField('');
            setReverse('');
          }}
        >
          Reset
        </button>
      </div>

      <GoodsList goods={sortedGoodsList} />
    </div>
  );
};
