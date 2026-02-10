import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

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

const sortByABC = 'abc';
const sortByLength = 'length';

export const App = () => {
  const visibleGoods = [...goodsFromServer];
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  if (sortField === sortByABC) {
    visibleGoods.sort((good1, good2) => {
      return good1.localeCompare(good2);
    });
  } else if (sortField === sortByLength) {
    visibleGoods.sort((good1, good2) => {
      return good1.length - good2.length;
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(sortByABC)}
          className={cn('button is-info', {
            'is-light': sortField !== sortByABC,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(sortByLength)}
          className={cn('button is-success', {
            'is-light': sortField !== sortByLength,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': isReversed === false,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className={cn('button is-danger')}
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
