import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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
  const [isSortAlphabeticallyActive, setIsSortAlphabeticallyActive]
  = useState(false);
  const [isSortByLengthActive, setIsSortByLengthActive] = useState(false);
  const [isReverseActive, setIsReverseActive] = useState(false);

  const sortAlphabetically = () => {
    const sortedGoods = [...visibleGoods].sort();
    const newVisibleGoods = isReverseActive
      ? sortedGoods.reverse()
      : sortedGoods;

    setVisibleGoods(newVisibleGoods);
    setIsSortAlphabeticallyActive(true);
    setIsSortByLengthActive(false);
  };

  const sortByLength = () => {
    const sortedGoods = [...visibleGoods].sort(
      (good1, good2) => good2.length - good1.length,
    );

    const newVisibleGoods = isReverseActive
      ? [...sortedGoods].reverse()
      : sortedGoods;

    setVisibleGoods(newVisibleGoods);
    setIsSortAlphabeticallyActive(false);
    setIsSortByLengthActive(true);
  };

  const reverseGoods = () => {
    setIsReverseActive(!isReverseActive);

    const newVisibleGoods = [...visibleGoods].reverse();

    setVisibleGoods(newVisibleGoods);
  };

  const resetGoods = () => {
    setVisibleGoods(goodsFromServer);
    setIsSortAlphabeticallyActive(false);
    setIsSortByLengthActive(false);
    setIsReverseActive(false);
  };

  const shouldRenderResetButton
  = isSortAlphabeticallyActive || isSortByLengthActive || isReverseActive;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': !isSortAlphabeticallyActive,
          })}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': !isSortByLengthActive,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReverseActive,
          })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {shouldRenderResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
