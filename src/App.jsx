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

const sortMode = {
  alphabetically: 'alphabetically',
  length: 'length',
  reset: 'reset',
};

function getPreparedGoods(goods, mode, reverse) {
  const goodsToSort = [...goods];

  goodsToSort.sort((good1, good2) => {
    switch (mode) {
      case sortMode.alphabetically:
        return good1.localeCompare(good2);

      case sortMode.length:
        return good1.length - good2.length;

      default:
        return good1;
    }
  });

  if (reverse) {
    goodsToSort.reverse();
  }

  return goodsToSort;
}

export const App = () => {
  const [actualSortMode, setActualSortMode] = useState(sortMode.reset);
  const [listReverse, setListReverse] = useState(false);
  const goodsToRender = getPreparedGoods(
    goodsFromServer,
    actualSortMode,
    listReverse,
  );

  const setRevers = () => {
    setActualSortMode(sortMode.reset);
    setListReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': !(actualSortMode === sortMode.alphabetically),
          })}
          onClick={() => setActualSortMode(sortMode.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': !(actualSortMode === sortMode.length),
          })}
          onClick={() => setActualSortMode(sortMode.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !listReverse,
          })}
          onClick={() => setListReverse(currrent => !currrent)}
        >
          Reverse
        </button>

        {(!(actualSortMode === sortMode.reset) || listReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={setRevers}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsToRender.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
