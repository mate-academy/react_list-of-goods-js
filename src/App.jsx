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

function sortedByValue(goods, sortedValue, isReversed) {
  let sortedGoods = [...goods];

  switch (sortedValue) {
    case 'name':
      sortedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case 'length':
      sortedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortedValue, setSortedValue] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visible = sortedByValue(goodsFromServer, sortedValue, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', { 'is-light': sortedValue !== 'name' })}
          onClick={() => {
            setSortedValue('name');
            setIsReversed(false);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', { 'is-light': sortedValue !== 'length' })}
          onClick={() => {
            setSortedValue('length');
            setIsReversed(false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {sortedValue !== '' && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortedValue('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visible.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
