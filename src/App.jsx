import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

const SORT_OPTION_ALPHABETICALLY = 'alphabetically';
const SORT_OPTION_LENGTH = 'length';

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

function getPreparedGoods(goods, { sortField, reversed = false }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_OPTION_ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SORT_OPTION_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortOption, setSortOption] = useState('');
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField: sortOption,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortOption === SORT_OPTION_ALPHABETICALLY,
          })}
          onClick={() => setSortOption(SORT_OPTION_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortOption === SORT_OPTION_LENGTH,
          })}
          onClick={() => setSortOption(SORT_OPTION_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': reversed === true,
          })}
          onClick={() => setReversed(prev => !prev)}
        >
          Reverse
        </button>

        {sortOption !== '' && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortOption('')}
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
