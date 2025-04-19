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

const SORT_BY_ALPHABETIC = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [active, setActive] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const getSortetGoods = (sortType, reversed) => {
    const sortedGoods = [...goodsFromServer];

    if (sortType === SORT_BY_ALPHABETIC) {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortType === SORT_BY_LENGTH) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (reversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const applySort = type => {
    setActive(type);
    setVisibleGoods(getSortetGoods(type, isReversed));
  };

  const reverseBtn = () => {
    const newReversed = !isReversed;

    setIsReversed(newReversed);
    setVisibleGoods(getSortetGoods(active, newReversed));
  };

  const resetBtn = () => {
    setActive('');
    setVisibleGoods(goodsFromServer);
    setIsReversed(false);
  };

  const originalGoods = () =>
    visibleGoods.length === goodsFromServer.length &&
    visibleGoods.every((item, i) => item === goodsFromServer[i]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': active !== SORT_BY_ALPHABETIC,
          })}
          onClick={() => applySort(SORT_BY_ALPHABETIC)}
        >
          {SORT_BY_ALPHABETIC}
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': active !== SORT_BY_LENGTH,
          })}
          onClick={() => applySort(SORT_BY_LENGTH)}
        >
          {SORT_BY_LENGTH}
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => reverseBtn()}
        >
          Reverse
        </button>

        {!originalGoods() && (
          <button
            type="button"
            className={cn('button', 'is-danger', {
              'is-light': active !== 'Reset',
            })}
            onClick={() => resetBtn()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
