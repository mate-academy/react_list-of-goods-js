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

const SORT_PARAMETER_ALPHABET = 'alphabet';
const SORT_PARAMETER_LENGTH = 'length';

const GoodList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li
        data-cy="Good"
        key={good}
      >
        {good}
      </li>
    ))}
  </ul>
);

function getPreparedGoods(goods, { sortParameter, isReversed }) {
  const preparedGoods = [...goods];

  if (sortParameter) {
    preparedGoods.sort((good1, good2) => {
      switch (sortParameter) {
        case SORT_PARAMETER_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_PARAMETER_LENGTH:
          return good1.length - good2.length;
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
  const [sortParameter, setSortParameter] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortParameter, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortParameter !== SORT_PARAMETER_ALPHABET,
          })}
          onClick={() => setSortParameter(SORT_PARAMETER_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortParameter !== SORT_PARAMETER_LENGTH,
          })}
          onClick={() => setSortParameter(SORT_PARAMETER_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortParameter || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortParameter('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}

      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
