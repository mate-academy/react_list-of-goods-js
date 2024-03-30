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
  const [sortedGoods, setSortedGoods] = useState(goodsFromServer);
  const [currentSort, setCurrentSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const applySort = (goods, order) => {
    if (order === 'alphabetically') {
      return goods.sort();
    }

    if (order === 'length') {
      return goods.sort((a, b) => a.length - b.length);
    }

    return goods;
  };

  const handleSort = order => {
    let newSortedGoods = applySort([...sortedGoods], order);

    if (isReversed) {
      newSortedGoods = newSortedGoods.reverse();
    }

    setSortedGoods(newSortedGoods);
    setCurrentSort(order);
    setIsReversed(false);
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
    setSortedGoods([...sortedGoods].reverse());
  };

  const handleReset = () => {
    setSortedGoods(goodsFromServer);
    setCurrentSort('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSort('alphabetically')}
          type="button"
          className={`button is-info ${currentSort === 'alphabetically' && !isReversed ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => handleSort('length')}
          type="button"
          className={`button is-success ${currentSort === 'length' && !isReversed ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(currentSort || isReversed) && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
