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

const SORT_BY_ALPHA = 'alpha';
const SORT_BY_LENGTH = 'length';
const REVERSE = 'reverse';

function gerPreparedGoods(goods, sortField, reverseField) {
  const preraredGoods = [...goods];

  if (sortField) {
    preraredGoods
      .sort((good1, good2) => {
        switch (sortField) {
          case SORT_BY_ALPHA:
            return good1.localeCompare(good2);

          case SORT_BY_LENGTH:
            return good1.length - good2.length;

          default:
            return 0;
        }
      });
  }

  if (reverseField) {
    preraredGoods.reverse();
  }

  return preraredGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(false);

  const visibleGoods = gerPreparedGoods(
    goodsFromServer, sortField, reverseField,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_BY_ALPHA)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_BY_ALPHA && sortField !== REVERSE,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_BY_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_BY_LENGTH && sortField !== REVERSE,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => (setReverseField(!reverseField))}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverseField,
          })}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            onClick={() => {
              setSortField('');
              setReverseField(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => <li key={good} data-cy="Good">{good}</li>)}
      </ul>
    </div>
  );
};
