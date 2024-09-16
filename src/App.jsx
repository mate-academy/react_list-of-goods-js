import 'bulma/css/bulma.css';
import cn from 'classnames';
import { useState } from 'react';
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
  const [sortedGoods, setSortedGoods] = useState(goodsFromServer);
  const [sortConfig, setSortConfig] = useState({
    type: null,
    reversed: false,
  });

  const handleSort = type => {
    const newSortedGoods = [...goodsFromServer];

    switch (type) {
      case 'byAlphabet':
        newSortedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case 'byLength':
        newSortedGoods.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }

    if (sortConfig.reversed) {
      newSortedGoods.reverse();
    }

    setSortedGoods(newSortedGoods);
    setSortConfig({ type, reversed: sortConfig.reversed });
  };

  const handleReverse = () => {
    setSortedGoods([...sortedGoods].reverse());
    setSortConfig(prevConfig => ({
      ...prevConfig,
      reversed: !prevConfig.reversed,
    }));
  };

  const handleReset = () => {
    setSortedGoods(goodsFromServer);
    setSortConfig({ type: null, reversed: false });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortConfig.type !== 'byAlphabet',
          })}
          onClick={() => handleSort('byAlphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortConfig.type !== 'byLength',
          })}
          onClick={() => handleSort('byLength')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !sortConfig.reversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {sortedGoods !== goodsFromServer &&
          JSON.stringify(sortedGoods) !== JSON.stringify(goodsFromServer) && (
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
        {sortedGoods.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
