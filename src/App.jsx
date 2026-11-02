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

function Button({ children, type, onClick, active }) {
  return (
    <button
      type="button"
      className={`button ${type} ${active ? '' : 'is-light'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortOption, setSortOption] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const handleClick = event => {
    const newSortOption = event.currentTarget.textContent;

    if (newSortOption === 'Reset') {
      setSortOption('');
      setIsReversed(false);
      setGoods(goodsFromServer);

      return;
    }

    if (newSortOption === 'Reverse') {
      setIsReversed(current => !current);
      setGoods(currentGoods => [...currentGoods].reverse());

      return;
    }

    setSortOption(newSortOption);

    const sortedGoods = [...goodsFromServer].sort((a, b) => {
      switch (newSortOption) {
        case 'Sort alphabetically':
          return a.localeCompare(b);
        case 'Sort by length':
          return a.length - b.length;
        default:
          return 0;
      }
    });

    setGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
  };

  const isOriginalOrder =
    goods.length === goodsFromServer.length &&
    goods.every((good, index) => good === goodsFromServer[index]);

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          type="is-info"
          onClick={handleClick}
          active={sortOption === 'Sort alphabetically'}
        >
          Sort alphabetically
        </Button>
        <Button type="is-success" onClick={handleClick} active={isReversed}>
          Sort by length
        </Button>
        <Button
          type="is-warning"
          onClick={handleClick}
          active={sortOption === 'Reverse'}
        >
          Reverse
        </Button>
        {!isOriginalOrder && (
          <Button type="is-danger" onClick={handleClick}>
            Reset
          </Button>
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
