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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

const getPreparedGoods = (condition, isReversed) => {
  const preparedGoods = [...goodsFromServer];

  if (condition) {
    preparedGoods.sort((a, b) => {
      switch (condition) {
        case SORT_FIELD_ALPHABET:
          return a.localeCompare(b);

        case SORT_FIELD_LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const goods = getPreparedGoods(sortField, isReversed);

  const reset = () => {
    setIsReversed(false);
    setSortField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPHABET },
          )}
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH },
          )}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={reset}
            >
              Reset
            </button>
          )
        }
      </div>

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
    </div>
  );
};
