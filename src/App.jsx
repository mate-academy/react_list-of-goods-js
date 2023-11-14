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

const SORT_BY_ABC = 'abc';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, reversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_ABC:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1[sortField] - good2[sortField];

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortField, reversed },
  );

  const reset = () => {
    setSortField('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            `button is-info ${cn(sortField !== SORT_BY_ABC && 'is-light')}`
          }
          onClick={() => setSortField(SORT_BY_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            `button is-success ${cn(sortField !== SORT_BY_LENGTH && 'is-light')}`
          }
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            `button is-warning ${cn(!reversed && 'is-light')}`
          }
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={reset}
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))
        }
      </ul>
    </div>
  );
};
