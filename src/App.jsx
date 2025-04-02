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
  const [originalGoods] = useState(goodsFromServer);
  const [lastSortedGoods, setLastSortedGoods] = useState(goods);
  const [isReversed, setIsReversed] = useState(false);
  const [activeButton, setActiveButton] = useState('');

  const handleSortAlphabetically = () => {
    const sortedGoods = [...goods].sort((a, b) => a.localeCompare(b));

    setGoods(sortedGoods);
    setLastSortedGoods([...sortedGoods]);
    setIsReversed(false);
    setActiveButton('alphabetical');
  };

  const handleSortByLength = () => {
    const sortedGoods = [...goods].sort((a, b) => a.length - b.length);

    setGoods(sortedGoods);
    setLastSortedGoods([...sortedGoods]);
    setIsReversed(false);
    setActiveButton('length');
  };

  const handleReverseOrder = () => {
    const reversedGoods = isReversed
      ? [...lastSortedGoods]
      : [...goods].reverse();

    setGoods(reversedGoods);
    setIsReversed(!isReversed);
    setActiveButton('reverse');
  };

  const handleResetOrder = () => {
    setGoods(originalGoods);
    setLastSortedGoods(originalGoods);
    setIsReversed(false);
    setActiveButton('');
  };

  const isResetVisible =
    JSON.stringify(goods) !== JSON.stringify(originalGoods);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeButton === 'alphabetical' ? '' : 'is-light'}`}
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
          className={`button is-warning ${activeButton === 'reverse' ? '' : 'is-light'}`}
          onClick={handleReverseOrder}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleResetOrder}
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
