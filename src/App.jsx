import 'bulma/css/bulma.css';
import './App.scss';

import cn from 'classnames';
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

const GoodsList = ({ arrOfGoods }) => (
  <ul>
    {arrOfGoods.map(good => (
      <li
        data-cy="Good"
        key={good}
      >
        {good}
      </li>
    ))}
  </ul>
);

const SORT_FIELD_ALPHBT = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function getVisibleGoods(sortType, isReversed) {
  const visibleGoods = [...goodsFromServer];

  switch (sortType) {
    case SORT_FIELD_ALPHBT:
      visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SORT_FIELD_LENGTH:
      visibleGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const reset = () => {
    setSortType('');
    setIsReversed(false);
  };

  const isResetShown = sortType || isReversed;
  const visibleGoods = getVisibleGoods(sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortType !== SORT_FIELD_ALPHBT },
          )}
          onClick={() => setSortType(SORT_FIELD_ALPHBT)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortType !== SORT_FIELD_LENGTH },
          )}
          onClick={() => setSortType(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isResetShown && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList arrOfGoods={visibleGoods} />
    </div>
  );
};
