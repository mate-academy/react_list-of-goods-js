/* eslint-disable prettier/prettier */
import { useState } from 'react';
import cn from 'classnames';

import { GoodList } from './goodList';
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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, sortField) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    })
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  let visibleGoods = getPreparedGoods(goodsFromServer, sortField);

  if (reversed) {
    visibleGoods = [...visibleGoods].reverse();
  }

  const sortByName = () => setSortField(SORT_FIELD_NAME);
  const sortByLength = () => setSortField(SORT_FIELD_LENGTH);
  const toggleReverse = () => setReversed(!reversed);
  const resetOrder = () => {
    setSortField('');
    setReversed(false);
  }

  const isInitialOrder =
    goodsFromServer.length === visibleGoods.length &&
    goodsFromServer.every((g, i) => g === visibleGoods[i]);


  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SORT_FIELD_NAME },
          )}
          onClick={sortByName}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': reversed === false },
          )}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetOrder}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
