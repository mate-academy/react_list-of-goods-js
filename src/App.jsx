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

const SORT_TYPE_LENGTH = 'length';
const SORT_TYPE_ALPHABET = 'alphabet';

function getPreparedGoods(goods, { sortType, reversed }) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SORT_TYPE_LENGTH:
          return good1.length - good2.length;
        case SORT_TYPE_ALPHABET:
          return good1.localeCompare(good2);

        default:
          return good1;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState({ sortType: '', reversed: false });
  const visibleGoods = getPreparedGoods(goodsFromServer, sortType);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType.sortType === SORT_TYPE_ALPHABET ? '' : 'is-light'}`}
          onClick={() =>
            setSortType(prev => ({ ...prev, sortType: SORT_TYPE_ALPHABET }))
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType.sortType === SORT_TYPE_LENGTH ? '' : 'is-light'}`}
          onClick={() =>
            setSortType(prev => ({ ...prev, sortType: SORT_TYPE_LENGTH }))
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortType.reversed ? '' : 'is-light'}`}
          onClick={() =>
            setSortType(prev => ({ ...prev, reversed: !prev.reversed }))
          }
        >
          Reverse
        </button>

        {(sortType.sortType !== '' || sortType.reversed !== false) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() =>
              setSortType(() => ({ sortType: '', reversed: false }))
            }
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
