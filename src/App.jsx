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

const SORT_ALPHABETICALY = 'sort_alphabetically';
const SORT_LENGTH = 'sort_length';

function getPrepearedGoods(goods, sortParam, revers) {
  const prepearedGoods = [...goods];

  if (!sortParam) {
    return revers ? prepearedGoods.reverse() : prepearedGoods;
  }

  if (prepearedGoods) {
    if (sortParam === SORT_ALPHABETICALY) {
      if (revers) {
        return prepearedGoods
          .sort((good1, good2) => good1.localeCompare(good2))
          .reverse();
      }

      return prepearedGoods.sort((good1, good2) => good1.localeCompare(good2));
    }

    if (sortParam === SORT_LENGTH) {
      if (revers) {
        return prepearedGoods
          .sort((good1, good2) => good1.length - good2.length)
          .reverse();
      }

      return prepearedGoods.sort((good1, good2) => good1.length - good2.length);
    }
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortParam, setSortParam] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPrepearedGoods(
    goodsFromServer,
    sortParam,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortParam === SORT_ALPHABETICALY ? '' : 'is-light'}`}
          onClick={() => {
            setSortParam(SORT_ALPHABETICALY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortParam === SORT_LENGTH ? '' : 'is-light'}`}
          onClick={() => {
            setSortParam(SORT_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${isReversed === true ? '' : 'is-light'}`}
          onClick={() =>
            isReversed ? setIsReversed(false) : setIsReversed(true)
          }
        >
          Reverse
        </button>

        {sortParam !== '' || isReversed ? (
          <button
            type="button"
            className="button is-info is-light"
            onClick={() => {
              setSortParam('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
