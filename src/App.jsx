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

const MODE_ALPHABETICALLY = 'alphabetically';
const MODE_LENGTH = 'length';
const MODE_RESET = 'reset';

function getPreparedGoods(goods, mode, reverse) {
  goods.sort((good1, good2) => {
    switch (mode) {
      case MODE_ALPHABETICALLY:
        return good1.localeCompare(good2);

      case MODE_LENGTH:
        return good1.length - good2.length;

      case MODE_RESET:
        return good1;

      default:
        return 0;
    }
  });

  if (reverse) {
    goods.reverse();
  }

  return goods;
}

export const App = () => {
  const [sortMode, setSortMode] = useState(MODE_RESET);
  const [listReverse, setListReverse] = useState(false);
  const goodsToRender = getPreparedGoods(
    [...goodsFromServer],
    sortMode,
    listReverse,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': !(sortMode === MODE_ALPHABETICALLY),
          })}
          onClick={() => setSortMode(MODE_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': !(sortMode === MODE_LENGTH),
          })}
          onClick={() => setSortMode(MODE_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !listReverse,
          })}
          onClick={() => setListReverse(!listReverse)}
        >
          Reverse
        </button>

        {(!(sortMode === MODE_RESET) || listReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortMode(MODE_RESET);
              setListReverse(false);
            }}
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
