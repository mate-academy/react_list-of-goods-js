import 'bulma/css/bulma.css';
import { useState } from 'react';
import cn from 'classnames';
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

const SORT_ABC = 'abc';
const SORT_LEN = 'len';

const getPreparedGoods = (goods, sortType, isReversed) => {
  const preparedGoods = [...goods];

  preparedGoods.sort((a, b) => {
    switch (sortType) {
      case SORT_ABC:
        return a.localeCompare(b);
      case SORT_LEN:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortType !== SORT_ABC },
          )}
          onClick={() => setSortType(SORT_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortType !== SORT_LEN },
          )}
          onClick={() => setSortType(SORT_LEN)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setReversed(!isReversed)}
        >
          Reverse
        </button>

        {(isReversed || sortType) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReversed(false);
              setSortType('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(item => (
          <li
            data-cy="Good"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
