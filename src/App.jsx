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
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [sortType, setSortType] = useState('none');

  const handleAlphabetSort = () => {
    const sorted = [...goods].sort((a, b) => a.localeCompare(b));

    setGoods(sorted);
    setSortType('alphabet');
  };

  const handleLengthSort = () => {
    const sorted = [...goods].sort((a, b) => a.length - b.length);

    setGoods(sorted);
    setSortType('length');
  };

  const handleReverseSort = () => {
    const sorted = [...goods].reverse();

    setGoods(sorted);
    setSortType('reverse');
  };

  const handleResetList = () => {
    setGoods([...goodsFromServer]);
    setSortType('reset');
  };

  const isInitialOrder =
    JSON.stringify(goods) === JSON.stringify(goodsFromServer);

  let alphabetBtnClass = 'button is-info is-light';
  let lengthBtnClass = 'button is-success is-light';
  let reverseBtnClass = 'button is-warning is-light';
  let resetBtnClass = 'button is-danger is-light';

  if (sortType === 'alphabet') {
    alphabetBtnClass = 'button is-info';
  } else if (sortType === 'length') {
    lengthBtnClass = 'button is-success';
  } else if (sortType === 'reverse') {
    reverseBtnClass = 'button is-warning';
  } else if (sortType === 'reset') {
    resetBtnClass = 'button is-danger';
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={alphabetBtnClass}
          onClick={handleAlphabetSort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={lengthBtnClass}
          onClick={handleLengthSort}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reverseBtnClass}
          onClick={handleReverseSort}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button
            type="button"
            className={resetBtnClass}
            onClick={handleResetList}
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
