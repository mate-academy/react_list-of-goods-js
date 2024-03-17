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

const ALPHABET = 'alphabet';
const LENGHT = 'lenght';

const preparedGoods = (sortMethod, isReverse) => {
  const products = [...goodsFromServer];

  products.sort((a, b) => {
    switch (sortMethod) {
      case ALPHABET:
        return a.localeCompare(b);
      case LENGHT:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReverse) {
    products.reverse();
  }

  return products;
};

export const App = () => {
  const [sort, setSort] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const reset = () => {
    setSort('');
    setIsReverse(false);
  };

  const sortField = sort || isReverse;

  const sortedGoods = preparedGoods(sort, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSort(ALPHABET)}
          type="button"
          className={cn('button is-info', {
            'is-light': sort !== ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSort(LENGHT)}
          type="button"
          className={cn('button is-success', {
            'is-light': sort !== LENGHT,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReverse(!isReverse)}
          type="button"
          className={cn('button is-warning ', {
            'is-light': !isReverse,
          })}
        >
          Reverse
        </button>

        {sortField && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
