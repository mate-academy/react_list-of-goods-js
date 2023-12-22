import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { GoodList } from './Components/GoodList/GoodList';

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

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

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];
  const preparedForReverse = [...preparedGoods];
  const reversedGoods = preparedForReverse.reverse();

  if (!isReversed) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    reversedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return good2.localeCompare(good1);

        case SORT_FIELD_LENGTH:
          return good2.length - good1.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return reversedGoods;
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods
  = getPreparedGoods(goodsFromServer, { sortField, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        {sortField === SORT_FIELD_NAME
          ? (
            <button
              type="button"
              id="name"
              className="button is-info"
              onClick={() => setSortField(SORT_FIELD_NAME)}
            >
              Sort alphabetically
            </button>
          )
          : (
            <button
              type="button"
              id="name"
              className="button is-info is-light"
              onClick={() => setSortField(SORT_FIELD_NAME)}
            >
              Sort alphabetically
            </button>
          )}

        {sortField === SORT_FIELD_LENGTH
          ? (
            <button
              type="button"
              id="name"
              className="button is-success"
              onClick={() => setSortField(SORT_FIELD_LENGTH)}
            >
              Sort by length
            </button>
          )
          : (
            <button
              type="button"
              id="name"
              className="button is-success is-light"
              onClick={() => setSortField(SORT_FIELD_LENGTH)}
            >
              Sort by length
            </button>
          )}

        {isReversed
          ? (
            <button
              type="button"
              id="reverse"
              className="button is-warning"
              onClick={() => setIsReversed(!isReversed)}
            >
              Reverse
            </button>
          )
          : (
            <button
              type="button"
              id="reverse"
              className="button is-warning is-light"
              onClick={() => setIsReversed(!isReversed)}
            >
              Reverse
            </button>
          )}

        {(sortField !== '' || isReversed)
        && (
        <button
          type="button"
          id="reset"
          className="button is-danger is-light"
          onClick={() => {
            setSortField(''); setIsReversed(false);
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
