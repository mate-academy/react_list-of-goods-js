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

const ALPHABETICALLY = 'alphabet';
const LENGTH = 'length';

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case ALPHABETICALLY:
          return good1.localeCompare(good2);

        case LENGTH:
          return good1.length - good2.length;

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
  const [isReversed, setIsReversed] = useState(false);
  const [sortField, setSortField] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(ALPHABETICALLY)}
          type="button"
          className={`button is-info ${sortField === 'alphabet' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(LENGTH)}
          type="button"
          className={`button is-success ${sortField === 'length' ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(prev => !prev)}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
