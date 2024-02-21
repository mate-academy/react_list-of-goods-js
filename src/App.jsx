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

const ALPHABETICALLY_SORT_FIELD = 'alphabetically';
const LENGTH_SORT_FIELD = 'length';
const REVERSE_SORT_FIELD = 'reverse';

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  switch (sortField) {
    case ALPHABETICALLY_SORT_FIELD:
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case LENGTH_SORT_FIELD:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const preparedGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== ALPHABETICALLY_SORT_FIELD,
          })}
          onClick={() => setSortField(ALPHABETICALLY_SORT_FIELD)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== LENGTH_SORT_FIELD,
          })}
          onClick={() => setSortField(LENGTH_SORT_FIELD)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={() => {
            setSortField(REVERSE_SORT_FIELD && !isReversed);
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {sortField && (
          <button
            type="button"
            className="button is-danger is-light"
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
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
