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
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [isReversed, setIsReversed] = useState(false);
  const [activeButton, setActiveButton] = useState('');

  const handleSortAlphabetically = () => {
    const sortedGoods = [...goods].sort();

    setGoods(sortedGoods);
    setActiveButton('alphabetically');
    setIsReversed(false);
  };

  const handleSortByLength = () => {
    const sortedGoods = [...goods].sort((a, b) => a.length - b.length);

    setGoods(sortedGoods);
    setActiveButton('length');
    setIsReversed(false);
  };

  const handleReverse = () => {
    let reversedGoods;

    if (activeButton === 'alphabetically') {
      reversedGoods = [...goods].reverse();
    } else if (activeButton === 'length') {
      reversedGoods = [...goods].reverse();
    } else {
      reversedGoods = [...goods].reverse();
    }

    setGoods(reversedGoods);
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    setActiveButton('');
    setIsReversed(false);
  };

  const isResetVisible = goods.join() !== goodsFromServer.join();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeButton === 'alphabetically' ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeButton === 'length' ? '' : 'is-light'}`}
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
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
