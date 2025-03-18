import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';
import cn from 'classnames';
import { DataList } from './DataList';

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

const SORT_TYPE = {
  alphabet: 'alphabet',
  length: 'length',
  none: '',
};

function getFilteredGoods(goods, sortBy, reverse) {
  const sorted = [...goods].sort((itm1, itm2) => {
    switch (sortBy) {
      case SORT_TYPE.alphabet:
        return itm1.localeCompare(itm2);
      case SORT_TYPE.length:
        return itm1.length - itm2.length;
      default:
        return 0;
    }
  });

  if (reverse) {
    return sorted.reverse();
  }

  return sorted;
}

export const App = () => {
  const [reversed, setReversed] = useState(false);
  const [sortBy, setSortBy] = useState(SORT_TYPE.none);

  const goodsToRender = getFilteredGoods(goodsFromServer, sortBy, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            sortBy !== SORT_TYPE.alphabet && 'is-light',
          )}
          onClick={() => setSortBy(SORT_TYPE.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            sortBy !== SORT_TYPE.length && 'is-light',
          )}
          onClick={() => setSortBy(SORT_TYPE.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', !reversed && 'is-light')}
          onClick={() => setReversed(rev => !rev)}
        >
          Reverse
        </button>

        {(reversed || sortBy) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReversed(false);
              setSortBy(SORT_TYPE.none);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <DataList goods={goodsToRender} />
    </div>
  );
};
