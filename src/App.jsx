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
  const [isModified, setIsModified] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState('');

  const sortAlphabetically = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    setGoods(isReversed ? sorted.reverse() : sorted);
    setIsModified(true);
    setSortType('alphabetically');
  };

  const sortByLength = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);

    setGoods(isReversed ? sorted.reverse() : sorted);
    setIsModified(true);
    setSortType('length');
  };

  const reverseGoods = () => {
    const reversed = [...goods].reverse();

    setGoods(reversed);
    const newIsReversed = !isReversed;

    setIsReversed(newIsReversed);

    // Check if we're back to original order
    const isBackToOriginal = reversed.every(
      (item, index) => item === goodsFromServer[index],
    );

    setIsModified(!isBackToOriginal || sortType !== '');
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
    setIsModified(false);
    setIsReversed(false);
    setSortType('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabetically' ? '' : 'is-light'}`}
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
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>
      <div className="goods-list">
        {goods.length === 0 && (
          <div data-cy="NoGoods" className="notification is-warning">
            No goods available
          </div>
        )}
        <ul>
          {goods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
