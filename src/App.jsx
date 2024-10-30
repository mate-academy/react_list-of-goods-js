import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

import {
  SORT_BY_CHAR,
  SORT_BY_LENGTH,
  SORT_BY_DEFAULT,
} from './utils/constants';
import GoodsList from './components/GoodsList/GoodsList';
import sortGoods from './utils/sort/sortGoods';
import goodsFromServer from './db/goods.json';

export const App = () => {
  const [sortType, setSortType] = useState(SORT_BY_DEFAULT);
  const [isReverse, setReverse] = useState(false);

  const goods = sortGoods(goodsFromServer, sortType, isReverse);

  const handleReset = () => {
    setSortType('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SORT_BY_CHAR,
          })}
          onClick={() => setSortType(SORT_BY_CHAR)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortType(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => {
            setReverse(!isReverse);
          }}
        >
          Reverse
        </button>

        {(sortType.length || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={goods} />
    </div>
  );
};
