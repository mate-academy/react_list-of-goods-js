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

const getPreparedGoods = (sortMethod, isReverse) => {
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
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const handleResetButtonClick = () => {
    setSortField('');
    setIsReversed(false);
  };

  const sort = sortField || isReversed;

  const sortedGoods = getPreparedGoods(sort, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(ALPHABET)}
          type="button"
          className={cn('button is-info', {
            'is-light': sort !== ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(LENGHT)}
          type="button"
          className={cn('button is-success', {
            'is-light': sort !== LENGHT,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button is-warning ', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {sort && (
          <button
            onClick={handleResetButtonClick}
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
