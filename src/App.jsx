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
  const [sortField, setSortField] = useState(''); // 'alph', 'length', ''
  const [isReversed, setIsReversed] = useState(false);

  const sortByAlpha = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    setGoods(isReversed ? [...sorted].reverse() : sorted);
    setSortField('alph');
  };

  const sortByLen = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);

    setGoods(isReversed ? [...sorted].reverse() : sorted);
    setSortField('length');
  };

  const reverseGoods = () => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
    setSortField('');
    setIsReversed(false);
  };

  // показуємо Reset, якщо хоч один елемент відрізняється від початкового
  const isResetVisible = goods.some((item, i) => item !== goodsFromServer[i]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByAlpha}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== 'alph',
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLen}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== 'length',
          })}
        >
          Sort by length
        </button>

        <button
          onClick={reverseGoods}
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            onClick={resetGoods}
            type="button"
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
