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

const SORT_FIELD_BY_NAME = 'name';
const SORT_FIELD_BY_LENGTH = 'length';

function getSortedGoods(goods, sortField, isReversed) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_BY_LENGTH:
          return good1.length - good2.length;
        case SORT_FIELD_BY_NAME:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getSortedGoods(goodsFromServer, sortField, isReversed);

  const resetStates = () => {
    setSortField('');
    setIsReversed(false);
  };

  const reverseState = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_BY_NAME)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_BY_NAME,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_BY_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={reverseState}
          type="button"
          className={cn('button is-warning', {
            'is-light': isReversed !== true,
          })}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            onClick={resetStates}
            type="button"
            className="button is-danger is-light"
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
