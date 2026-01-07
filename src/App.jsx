import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

const SORT_ALPHABETICALLY = 'alphabetically';
const SORT_BY_LENGTH = 'length';

const filtersWithReset = [SORT_ALPHABETICALLY, SORT_BY_LENGTH];

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

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((item1, item2) => {
      switch (sortField) {
        case SORT_ALPHABETICALLY:
          return item1.localeCompare(item2);
        case SORT_BY_LENGTH:
          return item1.length - item2.length;
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
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const resetAll = () => {
    setSortField('');
    setIsReversed(false);
  };

  const showResetButton = filtersWithReset.includes(sortField) || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_ALPHABETICALLY)}
          type="button"
          className={
            sortField === SORT_ALPHABETICALLY
              ? 'button is-success'
              : 'button is-success is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_BY_LENGTH)}
          type="button"
          className={
            sortField === SORT_BY_LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(prev => !prev)}
          className={
            isReversed ? 'button is-warning' : 'button is-warning is-light'
          }
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            onClick={resetAll}
            type="button"
            className="button is-success is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
