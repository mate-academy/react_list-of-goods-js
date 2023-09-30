import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';
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

const SORT_ALPHABET = 'a-to-z';
const SORT_LENGTH = 'length';

const prepareGoods = (goods, sortType, isReverse) => {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((item1, item2) => {
      switch (sortType) {
        case SORT_ALPHABET:
          return item1.localeCompare(item2);
        case SORT_LENGTH:
          return item1.length - item2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const preparedGoods = prepareGoods(goodsFromServer, sortType, isReverse);

  const reset = () => {
    setSortType('');
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SORT_ALPHABET,
          })}
          onClick={() => setSortType(SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SORT_LENGTH,
          })}
          onClick={() => setSortType(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {
          sortType !== '' || isReverse !== false
            ? (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={reset}
              >
                Reset
              </button>
            )
            : null
        }
      </div>

      <ul>
        {
          preparedGoods.map(item => <li data-cy="Good" key={item}>{item}</li>)
        }
      </ul>
    </div>
  );
};
