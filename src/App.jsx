import 'bulma/css/bulma.css';
import './App.scss';
import { useMemo, useState } from 'react';

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
const SORT_TYPE = {
  NONE: 'none',
  ALPHABETICALLY: 'alphabetically',
  BY_LENGTH: 'byLength',
};

const compareAlphabetically = (firstGood, secondGood) =>
  firstGood.localeCompare(secondGood);

const compareByLength = (firstGood, secondGood) =>
  firstGood.length - secondGood.length;

export const App = () => {
  const [sortType, setSortType] = useState(SORT_TYPE.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = useMemo(() => {
    const goods = [...goodsFromServer];

    if (sortType === SORT_TYPE.ALPHABETICALLY) {
      goods.sort(compareAlphabetically);
    }

    if (sortType === SORT_TYPE.BY_LENGTH) {
      goods.sort(compareByLength);
    }

    if (isReversed) {
      goods.reverse();
    }

    return goods;
  }, [sortType, isReversed]);

  const isInitialOrder = visibleGoods.every(
    (good, index) => good === goodsFromServer[index],
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SORT_TYPE.ALPHABETICALLY ? '' : 'is-light'}`}
          onClick={() => setSortType(SORT_TYPE.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SORT_TYPE.BY_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortType(SORT_TYPE.BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(currentIsReversed => !currentIsReversed)}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SORT_TYPE.NONE);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
