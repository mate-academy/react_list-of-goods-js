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

  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const handleSort = type => {
    const sortedGoods = [...goodsFromServer];

    if (type === 'alphabetically') {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (type === 'by length') {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
    setSortType(type);
  };

  const handleReverse = () => {
    setGoods(prevGoods => [...prevGoods].reverse());
    setIsReversed(prevIsReversed => !prevIsReversed);
  };

  const handleReset = () => {
    setGoods(goodsFromServer);
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabetically' ? '' : 'is-light'}`}
          onClick={() => handleSort('alphabetically')}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-info ${sortType === 'by length' ? '' : 'is-light'}`}
          onClick={() => handleSort('by length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
