import { useState } from 'react';
import cn from 'classnames';

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

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [isActive, setIsActive] = useState(true);

  const sortByAlphabet = () => {
    setVisibleGoods(
      [...visibleGoods].sort((good1, good2) => good1.localeCompare(good2)),
    );
  };

  const handleClick = () => {
    setIsActive(false);
    sortByAlphabet();
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', { 'is-light': isActive })}
          onClick={handleClick}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
