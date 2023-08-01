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
  const [isAlphabetActive, setAlphabetActive] = useState(true);
  const [isLengthActive, setLengthActive] = useState(true);
  const [isReverseActive, setReverseActive] = useState(true);
  const [isSorted, setIsSorted] = useState(false);

  const sortByAlphabet = () => {
    setVisibleGoods(
      [...visibleGoods].sort((good1, good2) => good1.localeCompare(good2)),
    );
    setIsSorted(true);
    setAlphabetActive(false);
    setLengthActive(true);
    setReverseActive(true);
  };

  const sortByLength = () => {
    setVisibleGoods(
      [...visibleGoods].sort((good1, good2) => good1.length - good2.length),
    );
    setIsSorted(true);
    setLengthActive(false);
    setAlphabetActive(true);
    setReverseActive(true);
  };

  const reverseGoods = () => {
    setVisibleGoods([...visibleGoods].reverse());
    setIsSorted(true);
    setReverseActive(false);
  };

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setAlphabetActive(true);
    setLengthActive(true);
    setReverseActive(true);
    setIsSorted(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', { 'is-light': isAlphabetActive })}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', { 'is-light': isLengthActive })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': isReverseActive })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {isSorted && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={reset}
        >
          Reset
        </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
