import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

export function getReorderedGoods(
  goods,
  { sortType, isReversed },
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((f1, f2) => {
    switch (sortType) {
      case 'alphabet':
        return f1.localeCompare(f2);
      case 'length':
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
  const [sortType, setSortType] = useState('none');
  const [isReversed, setIsReversed] = useState(false);
  const goods = getReorderedGoods(goodsFromServer, { sortType, isReversed });
  const nonInitialState = sortType !== 'none' || isReversed;

  const reset = () => {
    setSortType('none');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== 'alphabet',
          })}
          onClick={() => setSortType('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== 'length',
          })}
          onClick={() => setSortType('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': isReversed === false,
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
          onClick={reset}
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
