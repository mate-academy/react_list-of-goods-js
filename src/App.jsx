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

function sortGoods(goods, { sortField, isSorted }) {
  const localGoods = [...goods];

  if (sortField) {
    localGoods.sort((good1, good2) => {
      switch (sortField) {
        default:
          return 0;

        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;
      }
    });
  }

  if (isSorted) {
    localGoods.reverse();
  }

  return localGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isSorted, setSorted] = useState(false);

  const showGoods = sortGoods(
    goodsFromServer,
    { sortField, isSorted },
  );

  const reset = () => {
    setSortField('');
    setSorted(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            ['button', 'is-info'],
            { 'is-light': sortField !== SORT_FIELD_NAME },
          )}
          onClick={() => setSortField(SORT_FIELD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            ['button', 'is-success'],
            { 'is-light': sortField !== SORT_FIELD_LENGTH },
          )}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            ['button', 'is-warning'],
            {
              'is-light': !isSorted,
            },
          )}
          onClick={() => setSorted(!isSorted)}
        >
          Reverse
        </button>

        {(sortField || isSorted) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {showGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
