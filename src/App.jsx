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

const SORT_BY = {
  alphabetically: 'ALPHABETICALLY',
  length: 'LENGTH',
};

function getPreparedGoods(goods, sortBy, isReversed) {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SORT_BY.alphabetically:
          return good1.localeCompare(good2);
        case SORT_BY.length:
          return good1.length - good2.length;
        default:
          return 1;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const preparedGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    isReversed,
  );

  const showResetButton = sortField || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-danger', {
            'is-light': sortField !== SORT_BY.alphabetically,
          })}
          onClick={() => setSortField(SORT_BY.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-danger', {
            'is-light': sortField !== SORT_BY.length,
          })}
          onClick={() => setSortField(SORT_BY.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-danger', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            type="button"
            className={cn('button is-danger is-light')}
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
