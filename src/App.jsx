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

const SORT_PARAM_ALPHABET = 'alphabet';
const SORT_PARAM_LENGTH = 'length';

function getPreparedGood(goods, { sortParam, isReversed }) {
  const preparedGoods = [...goods];

  if (sortParam) {
    preparedGoods.sort((goodA, goodB) => {
      switch (sortParam) {
        case SORT_PARAM_ALPHABET:
          return goodA.localeCompare(goodB);
        case SORT_PARAM_LENGTH:
          return goodA.length - goodB.length;
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
  const [sortParam, setSortParam] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGood(
    goodsFromServer,
    {
      sortParam,
      isReversed,
    },
  );
  const reset = () => {
    setSortParam('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortParam(SORT_PARAM_ALPHABET)}
          className={cn('button', 'is-info', {
            'is-light': sortParam !== SORT_PARAM_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortParam(SORT_PARAM_LENGTH)}
          className={cn('button', 'is-success', {
            'is-light': sortParam !== SORT_PARAM_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(!isReversed)}
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortParam || isReversed) && (
          <button
            type="button"
            onClick={reset}
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
