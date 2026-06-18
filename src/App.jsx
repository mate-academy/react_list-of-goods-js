import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, sortField, isReverse) {
  let preparedGoods = [...goods];

  if (isReverse) {
    preparedGoods = preparedGoods.reverse();
  }

  if (sortField === SORT_FIELD_ALPHABET) {
    preparedGoods = preparedGoods.toSorted((good1, good2) => {
      return good1.localeCompare(good2);
    });

    return isReverse === false ? preparedGoods : preparedGoods.reverse();
  }

  if (sortField === SORT_FIELD_LENGTH) {
    return preparedGoods.sort((good1, good2) => {
      return isReverse === false
        ? good1.length - good2.length
        : good2.length - good1.length;
    });
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SORT_FIELD_ALPHABET ? 'is-light' : ''}`}
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SORT_FIELD_LENGTH ? 'is-light' : ''}`}
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReverse !== true ? 'is-light' : ''}`}
          onClick={() => {
            setIsReverse(!isReverse);
          }}
        >
          Reverse
        </button>

        {(isReverse || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
