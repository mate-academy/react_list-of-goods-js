import cn from 'classnames';
import { useState } from 'react';
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

const Good = ({ good }) => <li data-cy="Good">{good}</li>;

const SORTED_BY_ABC = 'abc';
const SORTED_BY_LENGTH = 'length';
const SORTED_REVERSE = 'reverse';

const sortByCondition = (array, sortField) => {
  const newArray = [...array];

  if (sortField === SORTED_BY_ABC) {
    return newArray.sort((a, b) => a.localeCompare(b));
  }

  if (sortField === SORTED_BY_LENGTH) {
    return newArray.sort((a, b) => a.length - b.length);
  }

  return newArray;
};

export const App = () => {
  const [action, setAction] = useState('');
  const [direction, setDirection] = useState('');

  const sortedGoods = sortByCondition(goodsFromServer, action);

  const displayedGoods =
    direction === SORTED_REVERSE ? [...sortedGoods].reverse() : sortedGoods;

  const isResetVisible =
    displayedGoods.length !== goodsFromServer.length ||
    displayedGoods.some((v, i) => v !== goodsFromServer[i]);

  const changeDirection = () => {
    setDirection(prev => (prev === '' ? SORTED_REVERSE : ''));
  };

  const handleReset = () => {
    setAction('');
    setDirection('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': action !== SORTED_BY_ABC,
          })}
          onClick={() => setAction(SORTED_BY_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': action !== SORTED_BY_LENGTH,
          })}
          onClick={() => setAction(SORTED_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': direction === '' })}
          onClick={changeDirection}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className={cn('button is-danger', {
              'is-light': !isResetVisible,
            })}
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {displayedGoods.map(good => (
          <Good key={good} good={good} />
        ))}
      </ul>
    </div>
  );
};
