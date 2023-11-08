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

const SORT_BY_ALPABETICALLY = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';
const SORT_REVERSE = 'Reverse';
const RESET = 'Reset';

function getSortedGoods(goods, { sortField, isReversed }) {
  const sortedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_BY_ALPABETICALLY:
        sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;

      case SORT_BY_LENGTH:
        sortedGoods.sort((good1, good2) => good1.length - good2.length);
        break;

      default:
        return sortedGoods;
    }
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getSortedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', { 'is-light':
            sortField !== SORT_BY_ALPABETICALLY })}
          onClick={() => setSortField(SORT_BY_ALPABETICALLY)}
        >
          {SORT_BY_ALPABETICALLY}
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', { 'is-light':
            sortField !== SORT_BY_LENGTH })}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          {SORT_BY_LENGTH}
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light':
            !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          {SORT_REVERSE}
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className={cn('button', 'is-danger', { 'is-light':
              sortField !== RESET })}
            onClick={reset}
          >
            {RESET}
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
