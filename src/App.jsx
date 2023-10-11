import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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

const Good = ({ good }) => (
  <li data-cy="Good">
    {good}
  </li>
);

const getPreparedGoods = (goods, sortedBy, isReversed) => {
  let preparedGoods = [...goods];

  if (sortedBy) {
    preparedGoods.sort((goodA, goodB) => {
      switch (sortedBy) {
        case SORT_BY_NAME:
          return goodA.localeCompare(goodB);

        case SORT_BY_LENGTH:
          return goodA.length - goodB.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const reset = () => {
    setSortBy('');
    setIsReversed(false);
  };

  const goods = getPreparedGoods(goodsFromServer, sortBy, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SORT_BY_NAME,
          })
          }
          onClick={() => setSortBy(SORT_BY_NAME)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SORT_BY_LENGTH,
          })
          }
          onClick={() => setSortBy(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })
          }
          onClick={() => setIsReversed(prevState => !prevState)}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => <Good good={good} key={good} />)}
      </ul>
    </div>
  );
};
