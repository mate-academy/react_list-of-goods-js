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
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState('');

  // Функція для сортування товарів
  const sortGoods = criteria => {
    let sortedGoods = [...goodsFromServer];

    switch (criteria) {
      case 'alphabet':
        sortedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case 'length':
        sortedGoods.sort((a, b) => a.length - b.length);
        break;
      default:
        sortedGoods = [...goodsFromServer];
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
  };

  // Обробники для кнопок
  const handleSortAlphabetically = () => {
    setSortBy('alphabet');
    sortGoods('alphabet');
  };

  const handleSortByLength = () => {
    setSortBy('length');
    sortGoods('length');
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
    setGoods([...goods].reverse());
  };

  const handleReset = () => {
    setSortBy('');
    setIsReversed(false);
    setGoods([...goodsFromServer]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy === 'alphabet' ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy === 'length' ? '' : 'is-light'}`}
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

        {goods.join() !== goodsFromServer.join() && (
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
