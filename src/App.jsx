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

const SORT_BY_ALPHABETICALLY = 'name';
const SORT_BY_LENGTH = 'length';

function getPreparedgoods(goods, sortField, revers) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case 'length':
          return good1.length - good2.length;
        case 'name':
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (revers) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [revers, setRevers] = useState(false);
  const visibleGoods = getPreparedgoods(goodsFromServer, sortField, revers);

  const reset = () => {
    setSortField('');
    setRevers(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_BY_ALPHABETICALLY,
          })}
          onClick={() => setSortField(SORT_BY_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': revers !== true,
          })}
          onClick={() => setRevers(!revers)}
        >
          Reverse
        </button>

        {(sortField || revers) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
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
