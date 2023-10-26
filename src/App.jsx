import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
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

const SORT_GOODS_IS_LIGHT = 'is-light';

function sortGoods(arrGoods, { sortBy, sortRevers }) {
  const newArrGoods = [...arrGoods];

  if (sortBy) {
    newArrGoods.sort((a, b) => {
      switch (sortBy) {
        case 'alphabet':
          return a.localeCompare(b);
        case 'length':
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (sortRevers) {
    newArrGoods.reverse();
  }

  return newArrGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [sortRevers, setSortRevers] = useState(false);

  const newSorted = sortGoods(goodsFromServer, { sortBy, sortRevers });

  const reset = () => {
    setSortBy('');
    setSortRevers(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortBy('alphabet')}
          type="button"
          className={classNames('button', 'is-info', {
            [SORT_GOODS_IS_LIGHT]: sortBy !== 'alphabet',
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortBy('length')}
          type="button"
          className={classNames('button', 'is-success', {
            [SORT_GOODS_IS_LIGHT]: sortBy !== 'length',
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setSortRevers(curr => !curr)}
          type="button"
          className={classNames('button', 'is-warning', {
            [SORT_GOODS_IS_LIGHT]: !sortRevers,
          })}
        >
          Reverse
        </button>

        {(sortBy || sortRevers) && (
        <button
          onClick={reset}
          type="button"
          className={`button is-danger ${SORT_GOODS_IS_LIGHT}`}
        >
          Reset
        </button>
        )}
      </div>

      <ul>
        {newSorted.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
