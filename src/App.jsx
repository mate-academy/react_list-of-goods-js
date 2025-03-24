import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import clsx from 'clsx';

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

const ORIGINAL_SORT = 'original';
const ALPHABETICAL_SORT = 'alphabetical';
const SORT_BY_LENGTH = 'length';

function prepareGoods(goods, sortType, isReversed) {
  let preparedGoods = [...goods];

  switch (sortType) {
    case ALPHABETICAL_SORT:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SORT_BY_LENGTH:
      preparedGoods.sort((a, b) => a.length - b.length);
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

  const visibleGoods = prepareGoods(goodsFromServer, sortType, isReversed);

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
        {visibleGoods.map((good, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li data-cy="Good" key={index}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
