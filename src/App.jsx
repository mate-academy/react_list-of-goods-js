import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { GoodList } from './GoodList/index';

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
  const [sortedState, setSortedState] = useState(0);
  const [reverseList, setReverseList] = useState(false);
  const [changedGoods, setChangedGoods] = useState(goodsFromServer);

  const handleAlphaSort = () => {
    if (sortedState !== 1) {
      setSortedState(1);

      if (reverseList) {
        setChangedGoods(
          [...changedGoods].sort((a, b) => a.localeCompare(b)).reverse(),
        );
      } else {
        setChangedGoods([...changedGoods].sort((a, b) => a.localeCompare(b)));
      }
    }
  };

  const handleLengthSort = () => {
    if (sortedState !== 2) {
      setSortedState(2);

      if (reverseList) {
        setChangedGoods([...changedGoods].sort((a, b) => b.length - a.length));
      } else {
        setChangedGoods([...changedGoods].sort((a, b) => a.length - b.length));
      }
    }
  };

  const handleReverse = () => {
    setReverseList(!reverseList);
    setChangedGoods([...changedGoods].reverse());
  };

  const handleReset = () => {
    setChangedGoods(goodsFromServer);
    setSortedState(0);
    setReverseList(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortedState === 1 ? '' : 'is-light'}`}
          onClick={handleAlphaSort}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${sortedState === 2 ? '' : 'is-light'}`}
          onClick={handleLengthSort}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${reverseList ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>
        {(sortedState !== 0 || reverseList) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>
      <GoodList goodsFromServer={changedGoods} />
    </div>
  );
};
