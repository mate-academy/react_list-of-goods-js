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
const SORT_LENGTH = 'length';

function getPreparedGood(goods, { sortField, isReversed }) {
  const prepeardeGoods = [...goods];

  if (sortField) {
    prepeardeGoods.sort((item1, item2) => {
      switch (sortField) {
        case SORT_ALPHABETICALLY:
          return item1.localeCompare(item2);
        case SORT_LENGTH:
          return item1.length - item2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    prepeardeGoods.reverse();
  }

  return prepeardeGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGood(goodsFromServer,
    { sortField, isReversed });

  const handleReverseClick = () => {
    setIsReversed(prev => !prev);
  };

  const handleResetClick = () => {
    setIsReversed(false);
    setSortField('');
  };

  const handleSortClick = () => {
    setSortField(SORT_ALPHABETICALLY);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            {
              'is-light': sortField !== SORT_ALPHABETICALLY,
            },
          )}
          onClick={handleSortClick}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            {
              'is-light': sortField !== SORT_LENGTH,
            },
          )}
          onClick={() => setSortField(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            {
              'is-light': !isReversed,
            },
          )}
          onClick={handleReverseClick}
        >
          Reverse
        </button>

        {(isReversed || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetClick}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(item => (
          <li key={item} data-cy="Good">{item}</li>
        ))}
      </ul>
    </div>
  );
};
