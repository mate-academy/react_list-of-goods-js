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

const SORTED_BY_ALPHABET = 'alphabet';
const SORTED_BY_LENGTH = 'length';

function getPreparedGoods(goods, sortGood, isReversed) {
  const preparedGoods = [...goods];

  if (sortGood) {
    preparedGoods.sort((good1, good2) => {
      let result;

      switch (sortGood) {
        case SORTED_BY_ALPHABET:
          result = good1.localeCompare(good2);
          break;

        case SORTED_BY_LENGTH:
          result = good1.length - good2.length;
          break;

        default:
          result = 0;
          break;
      }

      return result;
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortGood, setSortGood] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const preparatedGoods = getPreparedGoods(
    goodsFromServer,
    sortGood,
    isReversed,
  );

  const isInitialOrder = !sortGood && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortGood(SORTED_BY_ALPHABET);
          }}
          type="button"
          className={cn('button is-info', {
            'is-light': sortGood !== SORTED_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortGood(SORTED_BY_LENGTH);
          }}
          type="button"
          className={cn('button is-success', {
            'is-light': sortGood !== SORTED_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed(prev => !prev);
          }}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button
            onClick={() => {
              setSortGood('');
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparatedGoods.map(good => (
          <li>{good}</li>
        ))}
      </ul>
    </div>
  );
};
