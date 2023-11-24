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
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortBy, setSortBy] = useState(null);
  const [reverseActive, setReverseActive] = useState(true);

  const sortAlphabetically = () => {
    setVisibleGoods([...visibleGoods].sort());
    setSortBy('alphabet');
  };

  const sortByLength = () => {
    setVisibleGoods(
      [...visibleGoods].sort((good1, good2) => good1.length - good2.length),
    );
    setSortBy('length');
  };

  const reverse = () => {
    if (sortBy) {
      setVisibleGoods([...visibleGoods].reverse());
      setReverseActive(!reverseActive);
    } else {
      setVisibleGoods([...visibleGoods].reverse());
      setReverseActive(!reverseActive);
    }
  };

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setSortBy(null);
    setReverseActive(true);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== 'alphabet',
          })}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== 'length',
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': reverseActive,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {sortBy !== null || !reverseActive ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
