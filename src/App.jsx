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

const SORT_ALPHABETICALLY = 'Sort alphabetically';
const SORT_LENGTH = 'Sort by length';

function getPreparedGoods(goods, { sortField }) {
  const preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_ALPHABETICALLY:

        return preparedGoods
          .sort((good1, good2) => good1.localeCompare(good2));

      case SORT_LENGTH:

        return preparedGoods
          .sort((good1, good2) => good1.length - good2.length);

      default:
        return preparedGoods;
    }
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [sortReverse, setSortReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, { sortField });

  if (sortReverse) {
    visibleGoods.reverse();
  }

  const resetFields = () => {
    setSortField('');
    setSortReverse(false);
  };

  const checkChange = () => (
    visibleGoods.toString() !== goodsFromServer.toString()
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_ALPHABETICALLY,
          })}
          onClick={() => setSortField(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_LENGTH,
          })}
          onClick={() => setSortField(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !sortReverse,
          })}
          onClick={() => setSortReverse(!sortReverse)}
        >
          Reverse
        </button>

        {
          checkChange() && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => resetFields()}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        { visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
