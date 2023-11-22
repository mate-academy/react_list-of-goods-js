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

const sortMethod = {
  ALPHABET: 'alphabetical',
  LENGTH: 'length',
};

function getSortedList(goods, { sortOrder, isReversed }) {
  const preparedGoods = [...goods];

  if (sortOrder === sortMethod.LENGTH) {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (sortOrder === sortMethod.ALPHABET) {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortOrder, setSortOrder] = useState('');
  const [isReversed, setIsReversed] = useState('');
  const sortGoodsList = getSortedList(goodsFromServer, {
    sortOrder, isReversed,
  });

  const handleToggleReverse = () => setIsReversed(prevValue => !prevValue);

  const handleReset = () => {
    setIsReversed(false);
    setSortOrder('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortOrder !== sortMethod.ALPHABET,
          })}
          onClick={() => (
            setSortOrder(sortMethod.ALPHABET)
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortOrder !== sortMethod.LENGTH,
          })}
          onClick={() => (
            setSortOrder(sortMethod.LENGTH)
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleToggleReverse}
        >
          Reverse
        </button>

        {(isReversed || sortOrder) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortGoodsList.map(goodsItem => (
          <li key={goodsItem} data-cy="Good">
            {goodsItem}
          </li>
        ))}
      </ul>
    </div>
  );
};
