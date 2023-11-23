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
  Alphabet: 'alphabetical',
  Length: 'length',
  defaultSort: '',
};

function getSortedList(goods, { sortOrder, isReversed }) {
  const preparedGoods = [...goods];

  switch (sortOrder) {
    case sortMethod.Length:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;

    case sortMethod.Alphabet:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;

    default:
      break;
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortOrder, setSortOrder] = useState(sortMethod.defaultSort);
  const [isReversed, setIsReversed] = useState(false);
  const sortGoodsList = getSortedList(goodsFromServer, {
    sortOrder, isReversed,
  });

  const handleToggleReverse = () => setIsReversed(prevValue => !prevValue);
  const shouldShowResetButton = isReversed || sortOrder;

  const handleReset = () => {
    setIsReversed(false);
    setSortOrder(sortMethod.defaultSort);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortOrder !== sortMethod.Alphabet,
          })}
          onClick={() => (
            setSortOrder(sortMethod.Alphabet)
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortOrder !== sortMethod.Length,
          })}
          onClick={() => (
            setSortOrder(sortMethod.Length)
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

        {(shouldShowResetButton) && (
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
