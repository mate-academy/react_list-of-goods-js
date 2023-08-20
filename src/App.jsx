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

const SORT_FIELD_BY_ALPHABETTICALY = 'alphabet';
const SORT_FIELD_BY_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_BY_ALPHABETTICALY:
          return good1.localeCompare(good2);

        case SORT_FIELD_BY_LENGTH:
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
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const toSortGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_BY_ALPHABETTICALY)}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SORT_FIELD_BY_ALPHABETTICALY })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_BY_LENGTH)}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SORT_FIELD_BY_LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(state => !state)}
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        { (isReversed || !!sortField)
          && (
            <button
              onClick={() => handleReset()}
              type="button"
              className={cn('button is-danger is-light')}
            >
              Reset
            </button>
          )}

      </div>

      <ul>
        {toSortGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
