import { useState } from 'react';
import cn from 'classnames';
import { GoodList } from './components/GoodList/GoodList';
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

const SORT_BY = {
  default: 'default',
  alphabetically: 'alphabetically',
  length: 'length',
};

const getPreperedGoods = (goods, sort, isReversed) => {
  const preparedGoods = [...goods];

  switch (sort) {
    case SORT_BY.alphabetically:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SORT_BY.length:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortBy, setSortBy] = useState(SORT_BY.default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreperedGoods(goodsFromServer, sortBy, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SORT_BY.alphabetically,
          })}
          onClick={() => setSortBy(SORT_BY.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SORT_BY.length,
          })}
          onClick={() => setSortBy(SORT_BY.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prevIsReversed => !prevIsReversed)}
        >
          Reverse
        </button>

        {(sortBy !== SORT_BY.default || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SORT_BY.default);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <GoodList goods={visibleGoods} />
    </div>
  );
};
