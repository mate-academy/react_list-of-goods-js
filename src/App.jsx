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

const SORT_BY_LENGTH = 'sortByLength';
const SORT_ALPHABET = 'SortAlphabetically';

function sortBy(goods, sortField, isReverse) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((curent, next) => {
      switch (sortField) {
        case SORT_BY_LENGTH:
          return curent.length - next.length;
        case SORT_ALPHABET:
          return curent.localeCompare(next);
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, checkRev] = useState(false);
  const sortedGoods = sortBy(goodsFromServer, sortField, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button', 'is-info', { 'is-light': sortField !== SORT_ALPHABET },
          )}
          onClick={() => setSortField(SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SORT_BY_LENGTH },
          )}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button', 'is-warning', { 'is-light': !isReverse },
          )}
          onClick={() => checkRev(!isReverse)}
        >
          Reverse
        </button>
        {sortField || isReverse
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortField('');
                checkRev(false);
              }}
            >
              Reset
            </button>

          )
          : ''
        }
      </div>
      <ul>
        {sortedGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
