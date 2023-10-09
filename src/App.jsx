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

const SORT_BY_NAME = 'name';
const SORT_BY_LENGTH = 'length';

function sortGoods(goods, sortHow, isReverse) {
  const preparedGoods = [...goods];

  if (sortHow) {
    preparedGoods.sort((good1, good2) => {
      switch (sortHow) {
        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        case SORT_BY_NAME:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortHow, setSortHow] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = sortGoods(goodsFromServer, sortHow, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': sortHow !== SORT_BY_NAME })}
          onClick={() => setSortHow(SORT_BY_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sortHow !== SORT_BY_LENGTH })}
          onClick={() => setSortHow(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning',
            { 'is-light': !isReverse })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(sortHow || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortHow('');
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods
          .map(good => <li data-cy="Good" key={good}>{good}</li>)}
      </ul>
    </div>
  );
};
