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

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sort, setSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const reset = () => {
    setGoods(goodsFromServer);
    setSort('');
    setIsReversed(false);
  };

  const sortAlphabetically = () => {
    setGoods([...goodsFromServer].sort((a, b) => a.localeCompare(b)));
    setSort('alphabetically');
    setIsReversed(false);
  };

  const sortByLength = () => {
    setGoods([...goodsFromServer].sort((a, b) => a.length - b.length));
    setSort('byLength');
    setIsReversed(false);
  };

  const reverse = () => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
  };

  const resetButtonVisible = sort !== '' || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sort !== 'alphabetically',
          })}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sort !== 'byLength',
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {resetButtonVisible && (
          <button type="button" className="button is-danger" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
