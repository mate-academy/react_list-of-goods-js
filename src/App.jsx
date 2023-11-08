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

function prepeareGoods(goods, sortName, reverse) {
  let prepearedGoods = [...goods];

  if (sortName) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortName) {
        case SORT_BY_NAME:
          return good1[SORT_BY_NAME].localeCompare(good2[SORT_BY_NAME]);

        case SORT_BY_LENGTH:
          return good1[SORT_BY_LENGTH] - good2[SORT_BY_LENGTH];

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
  const [isReversed, setIsReversed] = useState(false);
  const sortedGoodsList = prepeareGoods(
    goodsWithProperty,
    sortField,
    isReversed,
  );

  const ResetButton = () => (
    <button
      type="button"
      className="button is-danger is-light"
      onClick={() => {
        setSortField('');
        setIsReversed(false);
      }}
    >
      Reset
    </button>
  );

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
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => (setIsReversed(prevIsReversed => !prevIsReversed))}
        >
          Reverse
        </button>

        {(sortField || isReversed) && <ResetButton />}
      </div>

      <GoodsList goods={sortedGoodsList} />
    </div>
  );
};
