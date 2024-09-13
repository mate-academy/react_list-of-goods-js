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

const getSortedGoods = (goods, sortType, reversed) => {
  const sortedGoods = [...goods];

  sortedGoods.sort((a, b) => {
    switch (sortType) {
      case 'alphabetically':
        return a.localeCompare(b);
      case 'length':
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (reversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [originalGoods] = useState([...goodsFromServer]);
  const [reversed, setReversed] = useState(false);
  const [activeButton, setActiveButton] = useState('');

  const sortGoods = type => {
    const sortedGoods = getSortedGoods(originalGoods, type, reversed);

    setGoods(sortedGoods);
    setActiveButton(type);
  };

  const toggleReverse = () => {
    const sortedGoods = getSortedGoods(goods, activeButton, !reversed);

    setGoods(sortedGoods);
    setReversed(!reversed);
  };

  const resetGoods = () => {
    setGoods(originalGoods);
    setReversed(false);
    setActiveButton('');
  };

  const showResetButton = goods.join() !== originalGoods.join();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeButton === 'alphabetically' ? '' : 'is-light'}`}
          onClick={() => {
            sortGoods('alphabetically');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeButton === 'length' ? '' : 'is-light'}`}
          onClick={() => {
            sortGoods('length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
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
