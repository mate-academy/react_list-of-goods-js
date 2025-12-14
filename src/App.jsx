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
  const [goods, setGoods] = useState(goodsFromServer);
  const [isActive, setIsActive] = useState(null);
  console.log(isActive)

  const sortByAlfb = () => {
    const sorted = [...goods].sort((good1, good2) =>
      good1.localeCompare(good2),
    );

    setGoods(sorted);
    setIsActive('alfb');
  };

  const sortByLength = () => {
    const sortedByLength = [...goods].sort(
      (good1, good2) => good1.length - good2.length,
    );

    setGoods(sortedByLength);
    setIsActive('length');
  };

  const sortByReverse = () => {
    const sortedByReverse = [...goods]
      .sort((a, b) => a.localeCompare(b))
      .reverse();

    setGoods(sortedByReverse);
    setIsActive('reverse');
  };

  const reset = () => {
    setGoods(goodsFromServer);
    setIsActive(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByAlfb}
          type="button"
          className={cn('button is-info', {
            'is-light': isActive !== 'alfb',
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={cn('button is-success', {
            'is-light': isActive !== 'length',
          })}
        >
          Sort by length
        </button>

        <button
          onClick={sortByReverse}
          type="button"
          className={cn('button is-warning', {
            'is-light': isActive !== 'reverse',
          })}
        >
          Reverse
        </button>

        {isActive !== null ? (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : (
          ''
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
