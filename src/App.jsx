import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

const SORT_ALPHABETICALLY = 'alphabet';
const SORT_BY_LENGTH = 'length';

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

function getPreparedGoods(goods, sortField, reverse) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

const SortButton = ({ label, active, onClick }) => (
  <button
    type="button"
    className={cn('button', {
      'is-info': label === 'Sort alphabetically',
      'is-success': label === 'Sort by length',
      'is-warning': label === 'Reverse',
      'is-light': !active,
    })}
    onClick={onClick}
  >
    {label}
  </button>
);

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);

  const resetGoods = () => {
    setSortField('');
    setReverse(false);
  };

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <SortButton
          label="Sort alphabetically"
          active={sortField === SORT_ALPHABETICALLY}
          onClick={() => setSortField(SORT_ALPHABETICALLY)}
        />
        <SortButton
          label="Sort by length"
          active={sortField === SORT_BY_LENGTH}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        />
        <SortButton
          label="Reverse"
          active={reverse}
          onClick={() => setReverse(!reverse)}
        />

        {sortField || reverse ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGoods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
