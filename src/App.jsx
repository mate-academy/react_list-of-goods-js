import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

const SORT_BY_NAME = 'name';
const SORT_BY_LENGTH = 'length';

const getVisibleGoods = (goods, sortOption, isReversed) => {
  let visibleGoods = goods;

  if (sortOption) {
    visibleGoods = [...visibleGoods].sort((good1, good2) => {
      switch (sortOption) {
        case SORT_BY_NAME:
          return good1.localeCompare(good2);
        case SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods = [...visibleGoods].reverse();
  }

  return visibleGoods;
};

export const App = () => {
  const [sortOptions, setSortOptions] = useState({
    option: '',
    reversed: false,
  });
  const visibleGoods = getVisibleGoods(
    goodsFromServer,
    sortOptions.option,
    sortOptions.reversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortOptions.option !== SORT_BY_NAME },
          )}
          onClick={() => setSortOptions({
            ...sortOptions,
            option: SORT_BY_NAME,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortOptions.option !== SORT_BY_LENGTH },
          )}
          onClick={() => setSortOptions({
            ...sortOptions,
            option: SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !sortOptions.reversed },
          )}
          onClick={() => setSortOptions({
            ...sortOptions,
            reversed: !sortOptions.reversed,
          })}
        >
          Reverse
        </button>

        {visibleGoods !== goodsFromServer
        && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortOptions({ option: '', reverse: false })}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
