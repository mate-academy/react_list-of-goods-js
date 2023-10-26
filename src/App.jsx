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
    switch (sortBy) {
      case 'alphabet':
        newArrGoods.sort((a, b) => a.localeCompare(b));
        break;
      case 'length':
        newArrGoods.sort((a, b) => a.length - b.length);

        break;
      default:
        break;
    }
  }

  if (sortRevers) {
    newArrGoods.reverse();
  }

  return newArrGoods;
}

export const App = () => {
  const [sortBy, serSortBy] = useState('');
  const [sortRevers, setSortRevers] = useState(false);

  const newSorted = sortGoods(goodsFromServer, { sortBy, sortRevers });

  const reset = () => {
    serSortBy();
    setSortRevers(false);
  };

  const clickOnReverse = () => {
    setSortRevers(!sortRevers);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => serSortBy('alphabet')}
          type="button"
          className={classNames('button', 'is-info', {
            [SORT_GOODS_IS_LIGHT]: sortBy !== 'alphabet',
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => serSortBy('length')}
          type="button"
          className={classNames('button', 'is-success', {
            [SORT_GOODS_IS_LIGHT]: sortBy !== 'length',
          })}
        >
          Sort by length
        </button>

        <button
          onClick={clickOnReverse}
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
