import { useState } from 'react';

import 'bulma/css/bulma.css';
import './App.scss';

import { GoodList } from './GoodList';

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

const SORT_FIELD_ASC = 'asc';
const SORT_FIELD_LEN = 'length';

function getPreparedGood(goods, sortField) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ASC:
          return good1.localeCompare(good2);
        case SORT_FIELD_LEN:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  let visibleGoods = getPreparedGood(goodsFromServer, sortField);

  const resetGoods = () => {
    visibleGoods = getPreparedGood(goodsFromServer, '');
    setSortField('');
    setReversed(false);
  };

  const appliedSortBtn = field => {
    return sortField !== field ? 'is-light' : '';
  };

  const appliedReverseBtn = () => {
    return reversed ? '' : 'is-light';
  };

  const isModified = sortField !== '' || reversed;

  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${appliedSortBtn(SORT_FIELD_ASC)}`}
          onClick={() => setSortField(SORT_FIELD_ASC)}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LEN)}
          type="button"
          className={`button is-success ${appliedSortBtn(SORT_FIELD_LEN)}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={`button is-warning ${appliedReverseBtn()}`}
        >
          Reverse
        </button>

        {isModified && (
          <button
            onClick={resetGoods}
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
