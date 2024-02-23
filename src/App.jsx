import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
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

const SORT_BY_ALFA = 'sortByAlfa';
const SORT_BY_LENGTH = 'sortByLength';

function getSortGoods(goods, { sortField, isReversed }) {
  const sortGoods = [...goods];

  if (sortField) {
    sortGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_ALFA:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    sortGoods.reverse();
  }

  return sortGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGood = getSortGoods(goodsFromServer, { sortField, isReversed });

  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_BY_ALFA,
          })}
          onClick={() => setSortField(SORT_BY_ALFA)}
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
          className={cn('button is-warning', {
            'is-light': isReversed !== true,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(sortField !== '' || isReversed === true) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      {visibleGood.map(good => (
        <li data-cy="Good" key={good}>
          {good}
        </li>
      ))}
    </div>
  );
};
