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

const SORT_BY_ALPHABETICALLY = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [active, setActive] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortByAlphabetically = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    if (isReversed) {
      sorted.reverse();
    }

    setGoods(sorted);
    setActive(SORT_BY_ALPHABETICALLY);
  };

  const sortByLength = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);

    if (isReversed) {
      sorted.reverse();
    }

    setGoods(sorted);
    setActive(SORT_BY_LENGTH);
  };

  const reverseBtn = () => {
    setGoods(goods.toReversed());
    setIsReversed(!isReversed);
  };

  const resetBtn = () => {
    setActive('');
    setGoods(goodsFromServer);
    setIsReversed(false);
  };

  const isOriginalOrder = () =>
    goods.length === goodsFromServer.length &&
    goods.every((item, i) => item === goodsFromServer[i]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': active !== SORT_BY_ALPHABETICALLY,
          })}
          onClick={() => sortByAlphabetically()}
        >
          {SORT_BY_ALPHABETICALLY}
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': active !== SORT_BY_LENGTH,
          })}
          onClick={() => sortByLength()}
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

        {!isOriginalOrder() && (
          <button
            type="button"
            className={cn('button', 'is-danger', 'is-light')}
            onClick={() => resetBtn()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
