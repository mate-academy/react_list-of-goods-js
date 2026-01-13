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

const SORT_FIELD_ASC = 'A';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, sortField, reverse) {
  let visibleGoods = [...goods];

  if (sortField) {
    visibleGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ASC:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    visibleGoods = visibleGoods.toReversed();
  }

  return visibleGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, reverse);

  const buttonResetVisibility =
    sortField || reverse ? (
      <button
        type="button"
        className="button is-danger is-light"
        onClick={() => {
          setSortField('');
          setReverse(false);
        }}
      >
        Reset
      </button>
    ) : null;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SORT_FIELD_ASC ? '' : 'is-light'}`}
          onClick={() => setSortField(SORT_FIELD_ASC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SORT_FIELD_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverse ? '' : 'is-light'}`}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {buttonResetVisibility}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
