import 'bulma/css/bulma.css';
import './App.scss';
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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

function getPreperedGoods(goods, { sortField, reverse }) {
  const preperedGoods = goods.map((good, i) => (
    {
      name: good,
      length: good.length,
      id: i + 1,
    }
  ));

  if (sortField) {
    preperedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return good1[sortField].localeCompare(good2[sortField]);

        case SORT_FIELD_LENGTH:
          return good1[sortField] - good2[sortField];

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    return [...preperedGoods].reverse();
  }

  return preperedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);

  const localeGoods = getPreperedGoods(
    goodsFromServer, { sortField, reverse },
  );

  const handleClickReset = () => {
    setSortField('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_NAME)}
          type="button"
          className={`button is-info ${sortField !== SORT_FIELD_NAME ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={`button is-success ${sortField !== SORT_FIELD_LENGTH ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(!reverse)}
          type="button"
          className={`button is-warning ${!reverse ? 'is-light' : ''}`}
        >
          Reverse
        </button>

        {(sortField || reverse)
          && (
            <button
              onClick={handleClickReset}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {localeGoods.map(good => (
          <li key={good.id} data-cy="Good">{good.name}</li>
        ))}
      </ul>
    </div>
  );
};
