/* eslint-disable prettier/prettier */
/* eslint-disable max-len */

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

const SORT_TYPE_ALPHABETICALY = 'Alphabeticaly';
const SORT_TYPE_BY_LENGTH = 'By_length';

export const App = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false)

  const sortAlphabeticaly = () => {
    let sortedGoods = [...goodsFromServer].sort((good1, good2) => good1.localeCompare(good2));

    if(isReversed) {
      sortedGoods = sortedGoods.reverse();
    }

    setGoods(sortedGoods);
    setSortType(SORT_TYPE_ALPHABETICALY);
  };

  const sortByLength = () => {
    let sortedGoods = [...goodsFromServer].sort((good1, good2) => good1.length - good2.length);

    if(isReversed) {
      sortedGoods = sortedGoods.reverse();
    }

    setGoods(sortedGoods);
    setSortType(SORT_TYPE_BY_LENGTH);
  };

  const listReverse = () => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
  };

  const listReset = () => {
    setGoods([...goodsFromServer]);
    setSortType(null);
    setIsReversed(false);
  };

  const isNotChanged = goods.every((good, index) => good === goodsFromServer[index]);

  return (
    <div className='App'>
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={`button is-info ${sortType !== SORT_TYPE_ALPHABETICALY ? 'is-light' : ''}`}
            onClick={sortAlphabeticaly}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={`button is-success ${sortType !== SORT_TYPE_BY_LENGTH ? 'is-light' : ''}`}
            onClick={sortByLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={`button is-warning ${!isReversed  ? 'is-light' : ''}`}
            onClick={listReverse}
          >
            Reverse
          </button>

          {!isNotChanged && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={listReset}
            >
              Reset
            </button>
          )}

        </div>
        <ul>
          {goods.map(good => (
            <li key={good} data-cy="Good">{good}</li>
          ))}
        </ul>
      </div>
    </div>
  )

};
