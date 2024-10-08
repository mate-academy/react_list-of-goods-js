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
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortOrder, setSortOrder] = useState('');

  const sortByAlphabetically = () => {
    setVisibleGoods(
      [...visibleGoods].sort((good1, good2) => good1.localeCompare(good2)),
    );
    setSortOrder('alphabetical');
  };

  const sortByLength = () => {
    setVisibleGoods(
      [...visibleGoods].sort((good1, good2) => {
        const length1 = good1.replace(/[^a-zA-Z]/g, '').length;
        const length2 = good2.replace(/[^a-zA-Z]/g, '').length;

        return length1 - length2;
      }),
    );
    setSortOrder('length');
  };

  const reverseList = () => {
    setVisibleGoods([...visibleGoods].reverse());
    setSortOrder('reverse');
  };

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setSortOrder('');
  };

  const isInOriginalOrder = visibleGoods.join() === goodsFromServer.join();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortOrder === 'alphabetical' ? '' : 'is-light'
          }`}
          onClick={sortByAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortOrder === 'length' ? '' : 'is-light'
          }`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${
            sortOrder === 'reverse' ? '' : 'is-light'
          }`}
          onClick={reverseList}
        >
          Reverse
        </button>

        {!isInOriginalOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
