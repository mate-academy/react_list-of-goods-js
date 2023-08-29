import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './Components/GoodList/GoodList';
import { goodsFromServer } from './Components/GoodsFromServer';

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    let sortFunction;

    switch (sortField) {
      case SORT_FIELD_NAME:
        sortFunction = (good1, good2) => good1.localeCompare(good2);
        break;
      case SORT_FIELD_LENGTH:
        sortFunction = (good1, good2) => good1.length - good2.length;
        break;
      default:
        throw new Error(`Unknown sort field: ${sortField}`);
    }

    if (sortFunction) {
      preparedGoods.sort(sortFunction);
    }
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const hasSortFieldOrIsReversed = (sortField || isReversed);
  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortField, isReversed },
  );

  function reset() {
    setSortField('');
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_NAME)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_NAME,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {hasSortFieldOrIsReversed && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
