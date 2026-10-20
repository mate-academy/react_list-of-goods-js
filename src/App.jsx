import 'bulma/css/bulma.css';
import classNames from 'classnames';
import { useState } from 'react';

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

export const App = () => {
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const goods = [...goodsFromServer];

  if (sortType === 'alphabetically') {
    goods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortType === 'length') {
    goods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    goods.reverse();
  }

  const isResetVisible = goods.some(
    (good, index) => good !== goodsFromServer[index],
  );

  const reset = () => {
    setSortType(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== 'alphabetically',
          })}
          onClick={() => setSortType('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== 'length',
          })}
          onClick={() => setSortType('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(currentIsReversed => !currentIsReversed)}
        >
          Reverse
        </button>

        {isResetVisible && (
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
