import { useState } from 'react';
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
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const applyCurrentSort = (
    newSortType = sortType,
    newIsReversed = isReversed,
  ) => {
    let sortedGoods;

    if (newSortType === 'alphabetical') {
      sortedGoods = [...goodsFromServer].sort();
    } else if (newSortType === 'length') {
      sortedGoods = [...goodsFromServer].sort((a, b) => a.length - b.length);
    } else {
      sortedGoods = [...goodsFromServer];
    }

    if (newIsReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const sortAlphabetically = () => {
    const newGoods = applyCurrentSort('alphabetical', isReversed);

    setGoods(newGoods);
    setSortType('alphabetical');
  };

  const sortByLength = () => {
    const newGoods = applyCurrentSort('length', isReversed);

    setGoods(newGoods);
    setSortType('length');
  };

  const reverse = () => {
    const newIsReversed = !isReversed;
    const newGoods = applyCurrentSort(sortType, newIsReversed);

    setGoods(newGoods);
    setIsReversed(newIsReversed);
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
    setSortType(null);
    setIsReversed(false);
  };

  const isOriginalOrder = () => {
    return JSON.stringify(goods) === JSON.stringify(goodsFromServer);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabetical' ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {!isOriginalOrder() && (
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
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
