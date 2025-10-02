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
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [isModified, setIsModified] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const sortByAlphabet = () => {
    setVisibleGoods([...goodsFromServer].sort((a, b) => a.localeCompare(b)));
    setIsModified(true);
    setActiveButton('alphabet');
  };

  const sortByLength = () => {
    setVisibleGoods([...goodsFromServer].sort((a, b) => a.length - b.length));
    setIsModified(true);
    setActiveButton('length');
  };

  const getByReverse = () => {
    setVisibleGoods([...visibleGoods].reverse());
    setIsModified(true);
    setActiveButton('reverse');
  };

  const getByReset = () => {
    setVisibleGoods(goodsFromServer);
    setIsModified(false);
    setActiveButton(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeButton === 'alphabet' ? '' : 'is-light'}`}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${activeButton === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${activeButton === 'reverse' ? '' : 'is-light'}`}
          onClick={getByReverse}
        >
          Reverse
        </button>
        {isModified && (
          <button
            type="button"
            className={`button is-danger ${activeButton === 'reset' ? '' : 'is-light'}`}
            onClick={getByReset}
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
