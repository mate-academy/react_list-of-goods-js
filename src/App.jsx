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

const IS_SORT_BY_ALPHABET = 'alphabet';
const IS_SORT_BY_LENGTH = 'length';

const getGoods = (goods, sortType, isReversed) => {
  const visibleGoods = [...goods];

  switch (sortType) {
    case IS_SORT_BY_ALPHABET:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;
    case IS_SORT_BY_LENGTH:
      visibleGoods.sort((good1, good2) => {
        if (good1.length === good2.length) {
          return good1.localeCompare(good2);
        }

        return good1.length - good2.length;
      });
      break;
    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
};

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const resetState = () => {
    setSortType('');
    setIsReversed(false);
  };

  const visibleGoods = getGoods(goodsFromServer, sortType, isReversed);

  const shouldReset = sortType || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== IS_SORT_BY_ALPHABET,
          })}
          onClick={() => {
            setSortType(IS_SORT_BY_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== IS_SORT_BY_LENGTH,
          })}
          onClick={() => {
            setSortType(IS_SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>
        {shouldReset && (
          <button
            type="button"
            className={cn('button', 'is-danger')}
            onClick={resetState}
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
