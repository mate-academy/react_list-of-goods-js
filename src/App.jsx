import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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
  const [sortedGoods, setSortedGoods] = useState([...goodsFromServer]);
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortGoods = (goods, type) => {
    const sorted = [...goods];

    switch (type) {
      case 'alphabetical':
        sorted.sort((a, b) => a.localeCompare(b));
        break;
      case 'length':
        sorted.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }

    if (isReversed) {
      sorted.reverse();
    }

    return sorted;
  };

  const handleSort = type => {
    const newSortType = type || sortType;

    setSortType(newSortType);

    const sorted = sortGoods(goodsFromServer, newSortType);

    setSortedGoods(sorted);
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
    setSortedGoods(prevGoods => [...prevGoods].reverse());
  };

  const resetSort = () => {
    setSortType('');
    setIsReversed(false);
    setSortedGoods([...goodsFromServer]);
  };

  const buttonStyle = type => (sortType === type ? '' : 'is-light');

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', buttonStyle('alphabetical'))}
          onClick={() => handleSort('alphabetical')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', buttonStyle('length'))}
          onClick={() => handleSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetSort}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
