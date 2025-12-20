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

  const sortAlphabetically = () => {
    setGoods([...goods].sort((a, b) => a.localeCompare(b)));
    setIsModified(true);
    setIsReversed(false);
  };

  const sortByLength = () => {
    setGoods([...goods].sort((a, b) => a.length - b.length));
    setIsModified(true);
    setIsReversed(false);
  };

  const reverseGoods = () => {
    setGoods([...goods].reverse());
    setIsModified(true);
    setIsReversed(!isReversed);
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
    setIsModified(false);
    setIsReversed(false);
  };


  return (
  <div className="section content">
    <div className="buttons">
      <button type="button" className="button is-info is-light" onClick={sortAlphabetically}>
        Sort alphabetically
      </button>

      <button type="button" className="button is-success is-light" onClick={sortByLength}>
        Sort by length
      </button>

      <button type="button" className= {`button is-warning ${isReversed ? 'is-warning' : 'is-light' }`} onClick={reverseGoods}>
        Reverse
      </button>

      { isModified && (
      <button type="button" className="button is-danger is-light" onClick={resetGoods}>
        Reset
      </button>
      )}
    </div>
  <div className = "goods-list">
    { goods.length === 0 && (
      <div data-cy="NoGoods" className="notification is-warning">
        No goods available
      </div>
    )}
    <ul>
      {goods.map((good) => (
        <li key={good} data-cy="Good">{good}</li>
      ))}
    </ul>
  </div>
</div>
  );
};
