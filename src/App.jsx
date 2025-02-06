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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, reverseField }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverseField,
  });

  const resetGoods = () => {
    setSortField('');
    setReverseField(false);
  };

  const handleSort = field => setSortField(field);
  const handleReverse = () => setReverseField(state => !state);

  const isInitialOrder = visibleGoods.every(
    (good, index) => good === goodsFromServer[index],
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSort(SORT_FIELD_NAME)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_NAME,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => handleSort(SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverseField,
          })}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button
            onClick={resetGoods}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.length
          ? visibleGoods.map(good => (
              <li data-cy="Good" key={good}>
                {good}
              </li>
              // eslint-disable-next-line indent
            ))
          : null}
      </ul>
    </div>
  );
};
