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

const SORT_FILED_ALPHABET = 'alphabet';
const SORT_FILED_LENGTH = 'length';

function getPreparedGoods(goods, { sortFiled, isReversed }) {
  const preparedGoods = [...goods];

  if (sortFiled) {
    preparedGoods.sort((goodA, goodB) => {
      switch (sortFiled) {
        case SORT_FILED_ALPHABET:
          return goodA.localeCompare(goodB);

        case SORT_FILED_LENGTH:
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
  const [sortFiled, setSortFiled] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortFiled, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortFiled !== SORT_FILED_ALPHABET },
          )}
          onClick={() => setSortFiled(SORT_FILED_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortFiled !== SORT_FILED_LENGTH },
          )}
          onClick={() => setSortFiled(SORT_FILED_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': isReversed === false },
          )}
          onClick={
            isReversed === false
              ? () => setIsReversed(true)
              : () => setIsReversed(false)
          }
        >
          Reverse
        </button>
        {(sortFiled || isReversed)
            && (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={() => {
                  setSortFiled('');
                  setIsReversed(false);
                }}
              >
                Reset
              </button>
            )
          }
      </div>

      <ul>
        {
          visibleGoods.map(good => (
            <li
              data-cy="Good"
              key={good}
            >
              {good}
            </li>
          ))
        }
      </ul>
    </div>
  );
};
