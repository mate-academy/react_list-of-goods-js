import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
import { SORT_BY_FIELDS } from './utils/sortFields';
import { getVisibleGoods } from './utils/getVisibleGoods';

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
export const App = () => {
  const [sortType, setSortType] = useState(SORT_BY_FIELDS.none);
  const [isReversed, setIsReversed] = useState(false);

  const resetGoods = () => {
    setSortType(SORT_BY_FIELDS.none);
    setIsReversed(false);
  };

  const visibleGoods = getVisibleGoods(
    goodsFromServer,
    sortType,
    isReversed,
    SORT_BY_FIELDS,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SORT_BY_FIELDS.alphabetic)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SORT_BY_FIELDS.alphabetic,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SORT_BY_FIELDS.length)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SORT_BY_FIELDS.length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortType !== SORT_BY_FIELDS.none || isReversed) && (
          <button
            onClick={() => resetGoods()}
            type="button"
            className="button is-danger is-light"
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
