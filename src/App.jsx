import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
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

const SORT_GOODS_NAME = 'name';
const SORT_GOODS_LENGTH = 'length';
const GOODS_REVERSE = 'reverse';

function getSortedGoods(goods, sortMethod, query) {
  const preparedGoods = [...goods];

  if (sortMethod) {
    preparedGoods.sort((good1, good2) => {
      switch (sortMethod) {
        case SORT_GOODS_NAME:
          return good1.localeCompare(good2);

        case SORT_GOODS_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (query !== '') {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState('');
  const visibleGoods = getSortedGoods(goodsFromServer, sortField, reverseField);

  const reset = () => {
    setSortField('');
    setReverseField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_GOODS_NAME,
          })}
          onClick={() => setSortField(SORT_GOODS_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_GOODS_LENGTH,
          })}
          onClick={() => setSortField(SORT_GOODS_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reverseField !== GOODS_REVERSE,
          })}
          onClick={() => {
            if (reverseField === GOODS_REVERSE) {
              setReverseField('');
            } else {
              setReverseField(GOODS_REVERSE);
            }
          }}
        >
          Reversed
        </button>

        {(sortField || reverseField) && (
          <button
            type="button"
            className={cn('button', 'is-danger', {
              'is-light': sortField !== '' || reverseField !== '',
            })}
            onClick={reset}
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
