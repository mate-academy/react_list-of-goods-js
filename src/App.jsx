import { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';

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

const SORT_FIELD_ALPHABETICALLY = 'sort alphabetically';
const SORT_FIELD_BY_LENGTH = 'sort by length';

function getPreparedGoods(goods, sortField, isReversed) {
  const preparedGoods = goods.map((good, index) => ({
    name: good,
    id: index + 1,
  }));

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETICALLY:
          return good1.name.localeCompare(good2.name);

        case SORT_FIELD_BY_LENGTH:
          return good1.name.length - good2.name.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer, sortField, isReversed,
  );
  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  const isSorted = (sortField || isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => (setSortField(SORT_FIELD_ALPHABETICALLY))}
          className={
            cn(
              'button',
              'is-info',
              { 'is-light': sortField !== SORT_FIELD_ALPHABETICALLY },
            )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => (setSortField(SORT_FIELD_BY_LENGTH))}
          className={
            cn(
              'button',
              'is-success',
              { 'is-light': sortField !== SORT_FIELD_BY_LENGTH },
            )}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(prevValue => !prevValue)}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )
        }

      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
