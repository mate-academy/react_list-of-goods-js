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
  const [sortOrder, setSortOrder] = useState('alphabetical'); // 'alphabetical' або 'length'
  const [isReversed, setIsReversed] = useState(false);

  const sortGoods = () => {
    const sorted = [...goodsFromServer];

    if (sortOrder === 'alphabetical') {
      sorted.sort((a, b) => a.localeCompare(b));
    } else if (sortOrder === 'length') {
      sorted.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sorted.reverse();
    }

    setSortedGoods(sorted);
  };

  const handleSortByAlphabet = () => {
    setSortOrder('alphabetical');
    setIsReversed(false);
    sortGoods();
  };

  const handleSortByLength = () => {
    setSortOrder('length');
    setIsReversed(false);
    sortGoods();
  };

  const handleReverseOrder = () => {
    setIsReversed(!isReversed);
    sortGoods();
  };

  const handleResetOrder = () => {
    setSortedGoods(goodsFromServer);
    setSortOrder('alphabetical');
    setIsReversed(false);
  };

  <div className="section content">
    <div className="buttons">
      <button
        type="button"
        className="button is-info is-light"
        onClick={handleSortByAlphabet}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className="button is-success is-light"
        onClick={handleSortByLength}
      >
        Sort by length
      </button>

      <button
        type="button"
        className="button is-warning is-light"
        onClick={handleReverseOrder}
      >
        Reverse
      </button>

      {sortedGoods.join() !== goodsFromServer.join() && (
        <button type="button" className="button" onClick={handleResetOrder}>
          Reset
        </button>
      )}
    </div>

    <ul>
      {sortedGoods.map(good => (
        <li key={good}>{good}</li>
      ))}
    </ul>
  </div>;
};
