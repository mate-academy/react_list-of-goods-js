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

const SORT_BY_ALPHABETICALLY = 'sortByAlphabet';
const SORT_BY_LENGTH = 'sortByLength';

function setSortedGoods(goods, { sortField, isReverse }) {
  const sortedGoods = [...goods];

  if (sortField) {
    sortedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    return sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const goods = setSortedGoods(goodsFromServer, { sortField, isReverse });

  const reset = () => {
    setIsReverse(false);
    setSortField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_BY_ALPHABETICALLY,
          })}
          onClick={() => setSortField(SORT_BY_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReverse })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(sortField || isReverse) && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={reset}
        >
          Reset
        </button>
        )}

        <ul>
          {goods.map(good => (
            <li data-cy="Good">{good}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
