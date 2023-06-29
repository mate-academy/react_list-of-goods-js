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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

export function getReorderedGoods(
  goods,
  { sortType, isReversed },
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((f1, f2) => {
    switch (sortType) {
      case SORT_BY_ALPHABET:
        return f1.localeCompare(f2);
      case SORT_BY_LENGTH:
        return f1.length - f2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const goods = getReorderedGoods(goodsFromServer, { sortType, isReversed });
  const nonInitialState = sortType !== '' || isReversed;

  const onReset = () => {
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SORT_BY_ALPHABET,
          })}
          onClick={() => setSortType(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortType(SORT_BY_LENGTH)}
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

        {nonInitialState
        && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={onReset}
        >
          Reset
        </button>
        )}
      </div>

      <ul>
        {goods.map(good => <li data-cy="Good">{good}</li>)}
      </ul>
    </div>
  );
};
