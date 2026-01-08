import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

const SORT_FIELD_ALPHABETICAL = 'alphabetical';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_REVERSE = 'reverse';

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

function getPreparedGoods(goods, sortField, reverseField) {
  const preparedGoods = [...goods];
  const isReverse = reverseField === SORT_FIELD_REVERSE;

  if (sortField === SORT_FIELD_ALPHABETICAL) {
    preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
  } else if (sortField === SORT_FIELD_LENGTH) {
    preparedGoods.sort((good1, good2) => {
      const result = good1.length - good2.length;

      if (result === 0) {
        return good1.localeCompare(good2);
      }

      return result;
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState('');
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    reverseField,
  );

  const reset = () => {
    setSortField('');
    setReverseField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETICAL,
          })}
          onClick={() => setSortField(SORT_FIELD_ALPHABETICAL)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': reverseField !== SORT_FIELD_REVERSE,
          })}
          onClick={() => {
            setReverseField(reverseField === '' ? SORT_FIELD_REVERSE : '');
          }}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
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
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
