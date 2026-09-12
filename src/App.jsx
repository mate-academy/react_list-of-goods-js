import 'bulma/css/bulma.css';
import cn from 'classnames';
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

export const App = () => {
  const [sortParam, setSortParam] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = [...goodsFromServer];

  if (sortParam === 'length') {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  if (sortParam === 'alphabetically') {
    sortedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  const isModified = sortParam !== '' || isReversed;

  function sortGoodsBy(param) {
    setSortParam(param);
  }

  function reverseGoods() {
    setIsReversed(current => !current);
  }

  function handleReset() {
    setSortParam('');
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => sortGoodsBy('alphabetically')}
          type="button"
          className={cn('button is-info', {
            'is-light': sortParam !== 'alphabetically',
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => sortGoodsBy('length')}
          type="button"
          className={cn('button is-success', {
            'is-light': sortParam !== 'length',
          })}
        >
          Sort by length
        </button>

        <button
          onClick={reverseGoods}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {isModified && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
