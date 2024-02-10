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
const SORT_FIELD_BY_LENGTH = 'byLength';
const SORT_FIELD_ALPHABETICALLY = 'alphabetically';

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_BY_LENGTH:
          return isReversed
            ? good1.length - good2.length : good2.length - good1.length;
        case SORT_FIELD_ALPHABETICALLY:
          return isReversed
            ? good2.localeCompare(good1) : good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, { sortField });

  const handleReverseClick = () => {
    setIsReversed(!isReversed);
  };

  return (

    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
          className={cn('button', 'is-info',
            sortField === SORT_FIELD_ALPHABETICALLY
              ? null : 'is-light')}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_BY_LENGTH)}
          type="button"
          className={cn('button', 'is-info',
            sortField === SORT_FIELD_BY_LENGTH ? null : 'is-light')}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverseClick}
          className={cn('button', 'is-warning', isReversed ? null : 'is-light')}
        >
          Reverse
        </button>

        {sortField !== '' && (
        <button
          type="button"
          onClick={() => setSortField('')}
          className="button is-danger is-light"
        >
          Reset
        </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
