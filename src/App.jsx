import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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

export const App = () => {
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const NOT_ACTIVE_CLASS = 'is-light';

  const getSortedGoods = () => {
    const sorted = [...goodsFromServer];

    if (sortType === 'alphabet') {
      sorted.sort();
    } else if (sortType === 'length') {
      sorted.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sorted.reverse();
    }

    return sorted;
  };

  const goods = getSortedGoods();

  const isOriginalOrder = () => {
    return sortType === null && !isReversed;
  };

  const handleSortAlphabet = () => {
    setSortType('alphabet');
  };

  const handleSortLength = () => {
    setSortType('length');
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const resetGoods = () => {
    setSortType(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            [NOT_ACTIVE_CLASS]: sortType !== 'alphabet',
          })}
          onClick={handleSortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            [NOT_ACTIVE_CLASS]: sortType !== 'length',
          })}
          onClick={handleSortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            [NOT_ACTIVE_CLASS]: !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isOriginalOrder() && (
          <button
            type="button"
            className={classNames('button', 'is-danger', NOT_ACTIVE_CLASS)}
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
