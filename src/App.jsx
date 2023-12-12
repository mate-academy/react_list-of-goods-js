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

const SORT_FIELD_ABC = 'abc';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goodFromServer, { sortField, directionOrder }) {
  const preparedGoods = [...goodFromServer];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ABC:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1[sortField] - good2[sortField];

        default:
          return 0;
      }
    });
  }

  if (directionOrder === 'desc') {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setsortField] = useState('');
  const [directionOrder, setDirectionOrder] = useState('asc');

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, directionOrder },
  );

  const reverseOrder = () => {
    setDirectionOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setsortField(SORT_FIELD_ABC)}
          type="button"
          className="button is-info is-light"
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setsortField(SORT_FIELD_LENGTH)}
          type="button"
          className="button is-success is-light"
        >
          Sort by length
        </button>

        <button
          onClick={reverseOrder}
          type="button"
          className="button is-warning is-light"
        >
          Reverse
        </button>

        <button
          onClick={() => setsortField('')}
          type="button"
          className="button is-danger is-light"
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
