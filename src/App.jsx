import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  { id: 1, name: 'Dumplings' },
  { id: 2, name: 'Carrot' },
  { id: 3, name: 'Eggs' },
  { id: 4, name: 'Ice cream' },
  { id: 5, name: 'Apple' },
  { id: 6, name: 'Bread' },
  { id: 7, name: 'Fish' },
  { id: 8, name: 'Honey' },
  { id: 9, name: 'Jam' },
  { id: 10, name: 'Garlic' },
];

export const App = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [isReversed, setIsReversed] = useState(false);
  const [currentSort, setCurrentSort] = useState(null);

  const handleSortAlphabetically = () => {
    const sortedGoods = [...goods].sort((a, b) => {
      return isReversed
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name);
    });

    setGoods(sortedGoods);
    setCurrentSort('alphabetically');
  };

  const handleSortByLength = () => {
    const sortedGoods = [...goods].sort((a, b) => {
      return isReversed
        ? b.name.length - a.name.length
        : a.name.length - b.name.length;
    });

    setGoods(sortedGoods);
    setCurrentSort('length');
  };

  const handleReverse = () => {
    setGoods(prevGoods => [...prevGoods].reverse());
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    setCurrentSort(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${currentSort === 'alphabetically' ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${currentSort === 'length' ? '' : 'is-light'}`}
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

        {JSON.stringify(goods) !== JSON.stringify(goodsFromServer) && (
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
          <li key={good.id} data-cy="Good">
            {good.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
