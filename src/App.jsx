import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
const LENGTH = 'length';

const preparedGoods = [...goodsFromServer];

const sortGoods = (order, isReversed) => {
  let sortedGoods;

  switch (order) {
    case ALPHABET:
      sortedGoods = [...preparedGoods].sort((a, b) => a.localeCompare(b));
      break;
    case LENGTH:
      sortedGoods = [...preparedGoods].sort((a, b) => a.length - b.length);
      break;
    default:
      sortedGoods = [...preparedGoods];
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [goods, setGoods] = useState(preparedGoods);
  const [isReversed, setIsReversed] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);

  const handleSort = order => {
    const sortedGoods = sortGoods(order, isReversed);

    setGoods(sortedGoods);
    setSortOrder(order);
  };

  const reverseGoods = () => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
  };

  const resetGoods = () => {
    setGoods(preparedGoods);
    setSortOrder(null);
    setIsReversed(false);
  };

  const isResetVisible = sortOrder || isReversed;
  const visibleGoods = goods;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortOrder !== ALPHABET,
          })}
          onClick={() => handleSort(ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortOrder !== LENGTH,
          })}
          onClick={() => handleSort(LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
