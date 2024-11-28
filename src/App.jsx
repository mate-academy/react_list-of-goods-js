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

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case 'alphabetically':
        preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;
      case 'length':
        preparedGoods.sort((good1, good2) => good1.length - good2.length);
        break;
      default:
        break;
    }
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

  const handleSort = newSortField => {
    setSortField(newSortField);
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  const isActiveSort = field => sortField === field;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isActiveSort('alphabetically') ? '' : 'is-light'}`}
          onClick={() => handleSort('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isActiveSort('length') ? '' : 'is-light'}`}
          onClick={() => handleSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortField !== '' || isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {visibleGoods.map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
