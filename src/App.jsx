import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
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

const SORT_BY_ALPH = 'alphabetical';
const SORT_BY_LENGTH = 'length';

function sortGoods(goods, { sortCriteria, reversed }) {
  const goodsForSort = [...goods];

  if (sortCriteria) {
    goodsForSort.sort((firstGood, secondGood) => {
      switch (sortCriteria) {
        case SORT_BY_ALPH:
          return firstGood.localeCompare(secondGood);
        case SORT_BY_LENGTH:
          return firstGood.length - secondGood.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    goodsForSort.reverse();
  }

  return goodsForSort;
}

export const App = () => {
  const [sortCriteria, setSortCriteria] = useState('');
  const [reversed, setReversed] = useState(false);
  const goods = sortGoods(goodsFromServer, { sortCriteria, reversed });

  const reset = () => {
    setSortCriteria('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortCriteria !== SORT_BY_ALPH,
          })}
          onClick={() => setSortCriteria(SORT_BY_ALPH)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortCriteria !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortCriteria(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortCriteria || reversed) && (
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
        {goods.map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
