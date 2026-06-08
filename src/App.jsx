import 'bulma/css/bulma.css';
import cn from 'clsx';
import './App.scss';
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

const SORT_PARAM_ALPHABET = 'alphabet';
const SORT_PARAM_LENGTH = 'length';

function prepareList(list, sortParam, isReverse) {
  const preparedList = [...list];

  switch (sortParam) {
    case SORT_PARAM_ALPHABET:
      preparedList.sort((a, b) => a.localeCompare(b));
      break;

    case SORT_PARAM_LENGTH:
      preparedList.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReverse) {
    preparedList.reverse();
  }

  return preparedList;
}

export const App = () => {
  const [sortParam, setSortParam] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const visibleGoods = prepareList(goodsFromServer, sortParam, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortParam !== SORT_PARAM_ALPHABET,
          })}
          onClick={() => setSortParam(SORT_PARAM_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortParam !== SORT_PARAM_LENGTH,
          })}
          onClick={() => setSortParam(SORT_PARAM_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(sortParam || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortParam('');
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(g => (
          <li data-cy="Good" key={g}>
            {g}
          </li>
        ))}
      </ul>
    </div>
  );
};
