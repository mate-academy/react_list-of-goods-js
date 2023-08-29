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

const SORT_BY_ALPHAB = 'name';
const SORT_BY_LENGTH = 'length';

function getSortedGoods(goodsArr, sortField) {
  if (sortField !== '') {
    goodsArr.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_ALPHAB: {
          return good1.localeCompare(good2);
        }

        case SORT_BY_LENGTH: {
          return good1.length - good2.length;
        }

        default: {
          return goodsArr;
        }
      }
    });
  }

  return goodsArr;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const isHideResetBtn = sortField || isReversed;

  const resetFields = () => {
    setSortField('');
    setIsReversed(false);
  };

  const goods = getSortedGoods([...goodsFromServer], sortField);

  if (isReversed) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_BY_ALPHAB)}
          className={cn(
            'button is-info', { 'is-light': sortField !== SORT_BY_ALPHAB },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_BY_LENGTH)}
          className={cn(
            'button is-success', { 'is-light': sortField !== SORT_BY_LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(!isReversed)}
          className={cn(
            'button is-warning', { 'is-light': !isReversed },
          )}
        >
          Reverse
        </button>

        {isHideResetBtn && (
          <button
            type="button"
            onClick={() => resetFields()}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
