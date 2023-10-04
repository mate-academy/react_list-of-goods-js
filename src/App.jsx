import React, { useState } from 'react';
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

export const App = () => {
  const [currentOrder, setCurrentOrder] = useState([...goodsFromServer]);
  const [isReversed, setIsReversed] = useState(false);
  const [sortField, setSortField] = useState('');

  const handleSortAlphabetically = () => {
    let sortedGoods = [...currentOrder].sort();

    if (isReversed) {
      sortedGoods = sortedGoods.reverse();
      setIsReversed(false);
    }

    setCurrentOrder(sortedGoods);
    setSortField('alphabetical');
  };

  const handleSortByLength = () => {
    let sortedGoods = [...currentOrder].sort((a, b) => a.length - b.length);

    if (isReversed) {
      sortedGoods = sortedGoods.reverse();
      setIsReversed(false);
    }

    setCurrentOrder(sortedGoods);
    setSortField('length');
  };

  const handleReverse = () => {
    const reversedGoods = [...currentOrder].reverse();

    setCurrentOrder(reversedGoods);
    setIsReversed(!isReversed);
    setSortField('reverse');
  };

  const handleReset = () => {
    if (sortField === 'alphabetical' || sortField === 'length') {
      setCurrentOrder([...goodsFromServer]);
      setIsReversed(false);
      setSortField('');
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === 'alphabetical' ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === 'length' ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortField === 'reverse' ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          {isReversed ? 'Reverse' : 'Undo Reverse'}
        </button>

        {sortField !== '' && (
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
        {currentOrder.map(good => (
          <li key={good.id} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
