import React, { useState } from 'react';
import 'bulma/css/bulma.css';

const originalGoods = [
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

function App() {
  const [goods, setGoods] = useState([...originalGoods]);
  const [activeSort, setActiveSort] = useState(null);

  const sortAlphabetically = () => {
    setGoods([...goods].sort());
    setActiveSort('alphabetically');
  };

  const sortByLength = () => {
    setGoods([...goods].sort((a, b) => a.length - b.length));
    setActiveSort('by-length');
  };

  const reverseOrder = () => {
    setGoods([...goods].reverse());
    setActiveSort('reverse');
  };

  const resetOrder = () => {
    setGoods([...originalGoods]);
    setActiveSort(null);
  };

  return (
    <div className="container mt-5">
      <div className="buttons">
        <button
          type="button"
          data-cy="sort-alphabetically"
          className={`button ${activeSort === 'alphabetically' ? 'is-primary' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          data-cy="sort-by-length"
          className={`button ${activeSort === 'by-length' ? 'is-primary' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          data-cy="reverse"
          className={`button ${activeSort === 'reverse' ? 'is-primary' : 'is-light'}`}
          onClick={reverseOrder}
        >
          Reverse
        </button>

        {activeSort && (
          <button
            type="button"
            data-cy="reset"
            className="button is-danger"
            onClick={resetOrder}
          >
            Reset
          </button>
        )}
      </div>

      <table className="table mt-4 is-fullwidth">
        <tbody>
          {goods.map(item => (
            <tr key={item}>
              <td>{item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
