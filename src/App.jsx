import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

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

const SORT_ALPHABETICALLY = 'alphabetically';
const SORT_BY_LENGTH = 'length';

function getPrepearedGoods(goods, sortField, isReversed) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((goodA, goodB) => {
      switch (sortField) {
        case SORT_ALPHABETICALLY:
          return goodA.localeCompare(goodB);

        case SORT_BY_LENGTH:
          return goodA.length - goodB.length;

        default:
          return 0;
      }
    });
  }

  return isReversed ? prepearedGoods.reverse() : prepearedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPrepearedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${cn(sortType === SORT_ALPHABETICALLY ? undefined : 'is-light')}`}
          onClick={() => setSortType(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${cn(sortType === SORT_BY_LENGTH ? undefined : 'is-light')}`}
          onClick={() => setSortType(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${cn(isReversed ? undefined : 'is-light')}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
