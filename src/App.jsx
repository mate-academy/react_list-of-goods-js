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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

const getVisbleGoods = (goods, sortOption, isReversed) => {
  let visibleGoods = goods;

  if (sortOption) {
    visibleGoods = [...visibleGoods].sort((good1, good2) => {
      switch (sortOption) {
        case SORT_FIELD_LENGTH:
          return good1[sortOption] - good2[sortOption];

        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);
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
  const [sortOption, setSortOption] = useState({
    option: '',
    reversed: false,
  });

  const visibleGoods = getVisbleGoods(
    goodsFromServer,
    sortOption.option,
    sortOption.reversed,

  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortOption.option !== SORT_FIELD_NAME },
          )}
          onClick={() => setSortOption({
            ...sortOption,
            option: SORT_FIELD_NAME,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortOption.option !== SORT_FIELD_LENGTH },
          )}
          onClick={() => setSortOption({
            ...sortOption,
            option: SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !sortOption.reversed },
          )}
          onClick={() => setSortOption({
            ...sortOption,
            reversed: !sortOption.reversed,
          })}
        >
          Reverse
        </button>
        {visibleGoods !== goodsFromServer && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortOption({
              option: '',
              reversed: false,
            })}
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
