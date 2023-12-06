import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

const SORT_BY_ALPHABET = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';

const goodsFromServer = [
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

const getPreparedGoods = (goods, { sortField, isReversed }) => {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods = preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
};

const Button = ({ onClick, className, children }) => (
  <button
    type="button"
    className={cn(`button is-info ${className}`)}
    onClick={onClick}
  >
    {children}
  </button>
);

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField, isReversed,
  });

  const handleSort = (sortType) => {
    setSortField(sortType === sortField ? '' : sortType);
  };

  const resetSorting = () => {
    if (sortField || isReversed) {
      setSortField('');
      setIsReversed(false);
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          className={sortField !== SORT_BY_ALPHABET ? 'is-light' : ''}
          onClick={() => handleSort(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </Button>

        <Button
          className={sortField !== SORT_BY_LENGTH ? 'is-light' : ''}
          onClick={() => handleSort(SORT_BY_LENGTH)}
        >
          Sort by length
        </Button>

        <Button
          className={!isReversed ? 'is-light' : ''}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </Button>

        {(sortField || isReversed) && (
          <Button
            className="is-danger is-light"
            onClick={resetSorting}
          >
            Reset
          </Button>
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
