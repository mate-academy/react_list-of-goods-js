import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { GoodList } from './components/GoodList';

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

const SORT_FIELD_ALPHABET = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, sortField, isReverse) {
  const copyGoods = [...goods];

  if (sortField) {
    copyGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    copyGoods.reverse();
  }

  return copyGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, reverse);
  const activeBtn = 'button is-success';
  const notActiveBtn = 'button is-success is-light';

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`${sortField !== SORT_FIELD_ALPHABET ? notActiveBtn : activeBtn}`}
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`${sortField !== SORT_FIELD_LENGTH ? notActiveBtn : activeBtn}`}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`${!reverse ? notActiveBtn : activeBtn}`}
          onClick={() => {
            if (!reverse) {
              setReverse(true);
            } else {
              setReverse(false);
            }
          }}
        >
          Reverse
        </button>

        {(sortField !== '' || reverse) && (
          <button
            type="button"
            className={notActiveBtn}
            onClick={() => {
              setSortField('');
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}

      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
