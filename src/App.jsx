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

const SORT_ALPHABETICALLY = 'alphabet';
const SORT_BY_LENGTH = 'good length';

function getPreparedGoods(goods, { sortCase, isReversed }) {
  const preparedGoods = [...goods];

  if (sortCase) {
    preparedGoods.sort((good1, good2) => {
      switch (sortCase) {
        case SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return isReversed ? preparedGoods.reverse() : preparedGoods;
}

export const App = () => {
  const [sortCase, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const sortedGoods
    = getPreparedGoods(goodsFromServer, { sortCase, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => (setSortField(SORT_ALPHABETICALLY))}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortCase !== SORT_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => (setSortField(SORT_BY_LENGTH))}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortCase !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortCase || isReversed) && (
          <button
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
