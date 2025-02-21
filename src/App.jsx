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
  const [reversed, setReversed] = useState(false);
  const [isSortLength, setSortLength] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const sortByAbc = () => {
    setVisibleGoods(prevGoods =>
      [...prevGoods].sort((good1, good2) => {
        return !reversed
          ? good1.localeCompare(good2)
          : good2.localeCompare(good1);
      }),);
    setIsActive(true);
    setSortLength(false);
  };

  const sortByLength = () => {
    setVisibleGoods(prevGoods =>
      [...prevGoods].sort((good1, good2) => {
        return !reversed
          ? good1.length - good2.length
          : good2.length - good1.length;
      }),);
    setIsActive(false);
    setSortLength(true);
  };

  const toggleReverse = () => {
    setReversed(prev => !prev);
    setVisibleGoods(prevGoods => [...prevGoods].reverse());
  };

  const resetGoods = () => {
    setVisibleGoods(goodsFromServer);
    setIsActive(false);
    setReversed(false);
    setSortLength(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', { 'is-light': !isActive })}
          onClick={sortByAbc}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': !isSortLength,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', { 'is-light': !reversed })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {(reversed || isActive || isSortLength) && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
