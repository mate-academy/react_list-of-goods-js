import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import clsx from 'clsx';

export const goodsFromServer = [
  { id: 1, name: 'Dumplings' },
  { id: 2, name: 'Carrot' },
  { id: 3, name: 'Eggs' },
  { id: 4, name: 'Ice cream' },
  { id: 5, name: 'Apple' },
  { id: 6, name: 'Bread' },
  { id: 7, name: 'Fish' },
  { id: 8, name: 'Honey' },
  { id: 9, name: 'Jam' },
  { id: 10, name: 'Garlic' },
];

const ORIGINAL_SORT = 'original';
const ALPHABETICAL_SORT = 'alphabetical';
const SORT_BY_LENGTH = 'length';

function processGoods(goods, sortType, isReversed) {
  let preparedGoods = [...goods];

  switch (sortType) {
    case ALPHABETICAL_SORT:
      preparedGoods.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case SORT_BY_LENGTH:
      preparedGoods.sort((a, b) => a.name.length - b.name.length);
      break;

    default:
      preparedGoods = [...goods];
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState('original');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = processGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={clsx('button', 'is-info', {
            'is-light': sortType !== ALPHABETICAL_SORT,
          })}
          onClick={() => setSortType(ALPHABETICAL_SORT)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={clsx('button', 'is-success', {
            'is-light': sortType !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortType(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={clsx('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortType !== ORIGINAL_SORT || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(ORIGINAL_SORT);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          // eslint-disable-next-line react/no-array-index-key
          <li data-cy="Good" key={good.id}>
            {good.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
