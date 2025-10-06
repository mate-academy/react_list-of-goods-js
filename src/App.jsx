import 'bulma/css/bulma.css';
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
  const [sortType, setSortType] = useState('none');
  const [isReversed, setIsReversed] = useState(false);

  const handleSortAlphabetically = () => {
    const sortedGoods = [...goods].sort();

    setGoods(sortedGoods);
    setSortType('alphabetical');
    setIsReversed(false);
  };

  const handleSortByLength = () => {
    const sortedGoods = [...goods].sort((a, b) => a.length - b.length);

    setGoods(sortedGoods);
    setSortType('length');
    setIsReversed(false);
  };

  const handleReverse = () => {
    let reversedGoods = [...goods].reverse();

    if (isReversed) {
      if (sortType === 'alphabetical') {
        reversedGoods = [...goods].toSorted();
      } else if (sortType === 'length') {
        reversedGoods = [...goods].sort((a, b) => a.length - b.length);
      }
    }

    setGoods(reversedGoods);
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setGoods(goodsFromServer);
    setSortType('none');
    setIsReversed(false);
  };

  const goodsString = JSON.stringify(goods);
  const goodsFromServerString = JSON.stringify(goodsFromServer);
  const isResetVisible = goodsString !== goodsFromServerString;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabetical' ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
