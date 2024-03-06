import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

const goodsFromServer = [
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
const SORT_BY_LENGTH = 'byLength';

function getPreparedGoods(goods, options) {
  const { sortedField, isReversed } = options;
  let preparedGoods = [...goods];

  if (sortedField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortedField) {
        case SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods = [...preparedGoods].reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortedField, setSortedField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const handleSortBy = field => {
    setSortedField(prevSortField => (prevSortField === field ? '' : field));
  };

  const handleReset = () => {
    setSortedField('');
    setIsReversed(false);
  };

  const handleReverse = () => {
    setIsReversed(prevIsReversed => !prevIsReversed);
  };

  const isSortOrReverseActive = sortedField || isReversed;
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortedField,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortedField !== SORT_ALPHABETICALLY,
          })}
          onClick={() => handleSortBy(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortedField !== SORT_BY_LENGTH,
          })}
          onClick={() => handleSortBy(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isSortOrReverseActive && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
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
