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

const SORT_ALPHABETICALY = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';

const sortedGoods = (goods, isReversed, sortType) => {
  const goodsToUse = [...goods];

  switch (sortType) {
    case SORT_ALPHABETICALY:
      goodsToUse.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SORT_BY_LENGTH:
      goodsToUse.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    goodsToUse.reverse();
  }

  return goodsToUse;
};

function reset(setSortType, setIsReversed) {
  setSortType('');
  setIsReversed(false);
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = sortedGoods(goodsFromServer, isReversed, sortType);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortType(SORT_ALPHABETICALY);
          }}
          type="button"
          className={
            sortType === SORT_ALPHABETICALY
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortType(SORT_BY_LENGTH);
          }}
          type="button"
          className={
            sortType === SORT_BY_LENGTH
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed(!isReversed);
          }}
          type="button"
          className={isReversed ? 'button is-info' : 'button is-info is-light'}
        >
          Reverse
        </button>

        {visibleGoods.some(
          (good, index) => good !== goodsFromServer[index],
        ) && (
          <button
            onClick={() => reset(setSortType, setIsReversed)}
            type="button"
            className="button is-danger is-light"
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
