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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function sortedGoodsBy(goods, sortField, isReversed) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return good1.name.localeCompare(good2.name);

        case SORT_FIELD_LENGTH:
          return good1.name.length - good2.name.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const goodsWithId = goodsFromServer.map((item, index) => ({
    id: index + 1,
    name: item,
  }));

  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const filteredAndSortedGoods = sortedGoodsBy(
    goodsWithId,
    sortField,
    isReversed,
  );

  const resetSort = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info', {
              'is-light': sortField !== SORT_FIELD_ALPHABET,
            },
          )}
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success', {
              'is-light': sortField !== SORT_FIELD_LENGTH,
            },
          )}
          onClick={() => {
            setSortField((SORT_FIELD_LENGTH));
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning', {
              'is-light': !isReversed,
            },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSort}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {[...filteredAndSortedGoods].map(({ id, name }) => (
          <li
            key={id}
            data-cy="Good"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};
