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

  const initialGoods = [...goodsFromServer];
  const [goods, setGoods] = useState(initialGoods);
  const [activeSort, setActiveSort] = useState('');

  const handleSortAlphabetically = () => {
    setGoods([...goods].sort((a, b) => a.localeCompare(b)));
    setActiveSort('alphabet');
  };

  const handleSortByLength = () => {
    setGoods([...goods].sort((a, b) => a.length - b.length));
    setActiveSort('length');
  };

  const handleReverse = () => {
    setGoods([...goods].reverse());
    setActiveSort('reverse');
  };

  const handleReset = () => {
    setGoods(initialGoods);
    setActiveSort('');
  };

  const isInitialOrder = goods.join(',') === initialGoods.join(',');


  return (

    <div className="section content">
      <div className="buttons">
        <button type="button" className={`button ${activeSort === 'alphabet' ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button type="button" className={`button ${activeSort === 'length' ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button type="button" className={`button ${activeSort === 'reverse' ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button
            type="button"
            className="button is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}

      </div>


      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>

    </div>


  )

};
