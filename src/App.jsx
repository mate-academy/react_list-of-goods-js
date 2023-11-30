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

const ABC = 'ABC';
const WORD_LENGTH = 'length';

const changeGoodsOrder = (goods, sortBy, isReversed) => {
  const goodsCopy = [...goods];

  switch (sortBy) {
    case ABC:
      goodsCopy.sort((goodA, goodB) => goodA.localeCompare(goodB));

      break;

    case WORD_LENGTH:
      goodsCopy.sort((goodA, goodB) => goodA.length - goodB.length);

      break;

    default:
      break;
  }

  if (isReversed) {
    goodsCopy.reverse();
  }

  return goodsCopy;
};

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const goods = changeGoodsOrder(goodsFromServer, sortBy, isReversed);

  const handleResetOnClick = () => {
    setIsReversed(false);
    setSortBy('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            {
              'is-light': sortBy !== ABC,
            })}
          onClick={() => setSortBy(ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            {
              'is-light': sortBy !== WORD_LENGTH,
            })}
          onClick={() => setSortBy(WORD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            {
              'is-light': !isReversed,
            })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetOnClick}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
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
