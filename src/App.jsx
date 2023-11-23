import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';
import cn from 'classnames';

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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_BY_LENGTH = 'by length';

function getPreparedGoods(goods, { sortField, reverse }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_FIELD_BY_LENGTH:
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

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const readyGoods
  = getPreparedGoods(goodsFromServer, { sortField, reverse: isReversed });

  const handleSortAlphabetically
  = () => setSortField(SORT_FIELD_ALPHABETICALLY);

  const handleSortByLength = () => setSortField(SORT_FIELD_BY_LENGTH);
  const handleReverse = () => setIsReversed(!isReversed);
  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  const isResetNeeded = (sortField || isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn(
              'button',
              'is-info',
              { 'is-light': sortField !== SORT_FIELD_ALPHABETICALLY },
            )}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-success',
              { 'is-light': sortField !== SORT_FIELD_BY_LENGTH },
            )}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-warning',
              { 'is-light': isReversed === false },
            )}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isResetNeeded && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )
}
      </div>

      <ul>
        {readyGoods.map(good => (
          <li data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
