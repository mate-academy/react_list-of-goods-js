import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

import { useState } from 'react';
import { GoodsList } from './components/GoodsList/GoodsList';
import { preparedGoodsFn } from './services/preparetedGoodFn';
import { reverseGood } from './services/reverseGood';
import {
  goodsFromServer, SORT_FIELD_ALPHABET, SORT_FIELD_LENGTH,
} from './variables/variables';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const visibleGoods
    = preparedGoodsFn(goodsFromServer, sortField, reversed);

  const reset = () => {
    setSortField('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          type="button"
          className={`button is-success ${cn({ 'is-light': sortField !== SORT_FIELD_ALPHABET })}`}
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
          onClick={() => setReversed(reverseGood(reversed))}
          type="button"
          className={`button is-success ${cn({ 'is-light': !reversed })}`}
        >
          Reverse
        </button>

        {sortField !== '' || reversed ? (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : (
          null
        )}
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
