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
  const [activeSort, setActiveSort] = useState('');

  const sortByAlphabet = () => {
    setGoods(prevGoods => {
      const sorted = [...prevGoods].sort((a, b) => a.localeCompare(b));

      return isReversed ? sorted.reverse() : sorted;
    });
    setActiveSort('alphabetical');
  };

  const sortByLength = () => {
    const sortedGoods = [...goodsFromServer].sort(
      (a, b) => a.length - b.length,
    );

    setGoods(isReversed ? [...sortedGoods].reverse() : sortedGoods);
    setActiveSort('length');
  };

  const reversed = () => {
    setGoods(prevGoods => [...prevGoods].reverse());
    setIsReversed(prev => !prev);
  };

  const reset = () => {
    setGoods(goodsFromServer);
    setIsReversed(false);
    setActiveSort('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeSort === 'alphabetical' ? '' : 'is-light'}`}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeSort === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reversed}
        >
          Reverse
        </button>

        {(activeSort || isReversed) && (
          <button type="button" className="button is-danger" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
