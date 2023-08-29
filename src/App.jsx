import { useState } from 'react';
import { v4 as getRandomKey } from 'uuid';

import { changeColorIfPressed } from './utils/BulbaUtils';
import { SORT_BY_ALPHABHET, SORT_BY_LENGTH, SORT_BY_NONE } from './utils/vars';
import { getPreparedGoods } from './utils/goodsPrepared';

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

const updatedGoodsData = goodsFromServer
  .map(good => ({ id: getRandomKey(), name: good, length: good.length }));

export const App = () => {
  const [sortField, setSortField] = useState(SORT_BY_NONE);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(updatedGoodsData, {
    sortField,
    isReversed,
  });

  const resetGoods = () => {
    setSortField(SORT_BY_NONE);
    setIsReversed(false);
  };

  const isVisibleButton = sortField || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_BY_ALPHABHET)}
          type="button"
          className={
            changeColorIfPressed(SORT_BY_ALPHABHET !== sortField, 'is-info')
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_BY_LENGTH)}
          type="button"
          className={
            changeColorIfPressed(SORT_BY_LENGTH !== sortField, 'is-success')
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={
            changeColorIfPressed(!isReversed, 'is-warning')
          }
        >
          Reverse
        </button>

        {isVisibleButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(({ name, id }) => (
          <li
            data-cy="Good"
            key={id}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};
