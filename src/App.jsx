import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

const SORT_TYPE_ALPHABETICALLY = 'alphabetically';
const SORT_TYPE_LENGTH = 'length';

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

function getSortedGoods(goods, sortType, isReversed) {
  const result = [...goods];

  if (sortType === SORT_TYPE_ALPHABETICALLY) {
    result.sort((a, b) => a.localeCompare(b));
  } else if (sortType === SORT_TYPE_LENGTH) {
    result.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    result.reverse();
  }

  return result;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false); // Окремий стейт для реверсу

  const sortedGoods = getSortedGoods(goodsFromServer, sortType, isReversed);

  const isChanged = sortType !== '' || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-link', {
            'is-light': sortType !== SORT_TYPE_ALPHABETICALLY,
          })}
          onClick={() => setSortType(SORT_TYPE_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SORT_TYPE_LENGTH,
          })}
          onClick={() => setSortType(SORT_TYPE_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(el => (
          <li key={el} data-cy="Good">
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};
