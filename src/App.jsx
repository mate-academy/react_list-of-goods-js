import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { GoodList } from './components/GoodsList/GoodsList';

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

const SORT_FIELD_ALPHABET = 'byAlphabet';
const SORT_FIELD_LENGTH = 'byLength';

function preparedGoodsFromServer(goods, sortField, reverse) {
  const preperedGoods = [...goods];

  if (sortField) {
    preperedGoods.sort((good1, good2) => {
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

  if (reverse) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

const buttonClass = (type, sortField, sortBy) => (
  `button ${type} ${sortField !== sortBy ? 'is-light' : ''}`
);

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setReverse] = useState(false);

  const forVisibleReset = sortField.length > 0 || isReverse === true;

  const visibleGoods = preparedGoodsFromServer(
    goodsFromServer,
    sortField,
    isReverse,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={buttonClass('is-info', sortField, SORT_FIELD_ALPHABET)}
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={buttonClass('is-success', sortField, SORT_FIELD_LENGTH)}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={buttonClass('is-warning', isReverse, true)}
          onClick={() => setReverse(!isReverse)}
        >
          Reverse
        </button>

        {forVisibleReset && (
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
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
