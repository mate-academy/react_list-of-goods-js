import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

const initialGoods = [
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
  const [goods, setGoods] = useState(initialGoods);
  const [sortType, setSortType] = useState('');
  const [ascending, setAscending] = useState(true);
  const [originalOrderReversed, setOriginalOrderReversed] = useState(false);

  const handleSort = (type) => {
    let sortedGoods = [...goods];

    if (type === 'alphabetically') {
      sortedGoods = stableSort([...goods], (a, b) => a.localeCompare(b));
    } else if (type === 'length') {
      sortedGoods = stableSort(
        [...goods], (a, b) => a.length - b.length
        || goods.indexOf(a) - goods.indexOf(b),
      );
    }

    if (!ascending) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
    setSortType(type);
    setAscending(true);
    setOriginalOrderReversed(false);
  };

  const handleReverse = () => {
    if (sortType) {
      setGoods([...goods].reverse());
      setAscending(!ascending);
      setOriginalOrderReversed(false);
    } else {
      const reversedOriginalOrder = [...initialGoods].reverse();

      setGoods(reversedOriginalOrder);
      setOriginalOrderReversed(!originalOrderReversed);
    }
  };

  const handleReset = () => {
    setGoods(initialGoods);
    setSortType('');
    setAscending(true);
    setOriginalOrderReversed(false);
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
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={() => handleSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${originalOrderReversed || !sortType || !ascending ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        <button
          type="button"
          className={`button is-danger ${sortType || !ascending || originalOrderReversed ? '' : 'is-light'}`}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};

const stableSort = (array, compareFunction) => array
  .map((item, index) => ({ item, index }))
  .sort((a, b) => compareFunction(a.item, b.item) || a.index - b.index)
  .map(({ item }) => item);
