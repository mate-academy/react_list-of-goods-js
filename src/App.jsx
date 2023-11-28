import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

const SORT_BY_NAME = 'name';
const SORT_BY_LENGTH = 'lenght';

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

function getGoods(goods, sortType, isReversed) {
  const goodsToReturn = [...goods];

  switch (sortType) {
    case SORT_BY_LENGTH:
      goodsToReturn.sort((a, b) => a.length - b.length);
      break;
    case SORT_BY_NAME:
      goodsToReturn.sort((a, b) => a.localeCompare(b));
      break;
    default:
  }

  if (isReversed) {
    goodsToReturn.reverse();
  }

  return goodsToReturn;
}

export const App = () => {
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);
  const goodsList = getGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn('button',
              'is-info',
              { 'is-light': sortType !== SORT_BY_NAME })
          }
          onClick={() => setSortType(SORT_BY_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn('button',
              'is-success',
              { 'is-light': sortType !== SORT_BY_LENGTH })
          }
          onClick={() => setSortType(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn('button',
              'is-warning',
              { 'is-light': !isReversed })
          }
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortType || isReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortType(null);
                setIsReversed(false);
              }}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {goodsList.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
