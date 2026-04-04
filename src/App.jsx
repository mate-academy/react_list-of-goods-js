import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

const SORT_BY_ALPHABETIC = 'alphabetic';
const SORT_BY_LENGTH = 'length';
const initialGoods = [
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

function sortGoods(goodsList, sortType) {
  const newGoods = [...goodsList];

  switch (sortType) {
    case SORT_BY_ALPHABETIC:
      return newGoods.sort((a, b) => a.localeCompare(b));

    case SORT_BY_LENGTH:
      return newGoods.sort((a, b) => a.length - b.length);

    default:
      return newGoods;
  }
}

export const App = () => {
  const [goods, setGoods] = useState(initialGoods);
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  let visibleGoods = sortGoods(goods, sortType);

  if (isReversed) {
    visibleGoods = [...visibleGoods].reverse();
  }

  function setSortOfGooods(type) {
    setSortType(type);
    setGoods(sortGoods(initialGoods, type));
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SORT_BY_ALPHABETIC,
          })}
          onClick={() => setSortOfGooods(SORT_BY_ALPHABETIC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortOfGooods(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setGoods(initialGoods);
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
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
