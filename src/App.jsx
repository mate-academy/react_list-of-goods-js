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

const getGoods = (goods, sortType, isReversed, isReseted) => {
  let visibleGoods = [...goods];

  if (isReseted) {
    return visibleGoods;
  }

  if (sortType === IS_SORT_BY_ALPHABET) {
    visibleGoods = visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === IS_SORT_BY_LENGTH) {
    visibleGoods = visibleGoods.sort((good1, good2) => {
      if (good1.length === good2.length) {
        return good1.localeCompare(good2);
      }

      return good1.length - good2.length;
    });
  }

  if (isReversed) {
    visibleGoods = visibleGoods.reverse();
  }

  return visibleGoods;
};

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [isReseted, setIsReseted] = useState(true);

  const visibleGoods = getGoods(
    goodsFromServer,
    sortType,
    isReversed,
    isReseted,
  );

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
            setIsReseted(false);
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
            setIsReseted(false);
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
            setIsReseted(isReversed && sortType === '');
          }}
        >
          Reverse
        </button>
        {(!isReseted || sortType !== '' || isReversed) && (
          <button
            type="button"
            className={cn('button', 'is-danger')}
            onClick={() => {
              setSortType('');
              setIsReversed(false);
              setIsReseted(true);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
