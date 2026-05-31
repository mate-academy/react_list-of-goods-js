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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function sorting(goods, field, isReversed) {
  const prepareGoods = [...goods];

  switch (field) {
    case SORT_FIELD_ALPHABET:
      prepareGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SORT_FIELD_LENGTH:
      prepareGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [sortReverse, setsortReverse] = useState(false);

  const visibleGoods = sorting(goodsFromServer, sortField, sortReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            `button is-info ${sortField === SORT_FIELD_ALPHABET ? '' : 'is-light'}`,
          )}
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            `button is-success ${sortField === SORT_FIELD_LENGTH ? '' : 'is-light'}`,
          )}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !sortReverse })}
          onClick={() => setsortReverse(!sortReverse)}
        >
          Reverse
        </button>

        {(sortField || sortReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setsortReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
