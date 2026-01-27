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
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortAlphabetically = () => {
    setGoods([...goods].sort((a, b) => a.localeCompare(b)));
    setSortBy('alphabetically');
  };

  const sortByLength = () => {
    setGoods([...goods].sort((a, b) => a.length - b.length));

    setSortBy('length');
  };

  const toggleReverse = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setGoods(goodsFromServer);
    setSortBy('');
    setIsReversed(false);
  };

  const goodsToShow = [...goods];

  if (isReversed) {
    goodsToShow.reverse();
  }

  const isChanged =
    JSON.stringify(goodsToShow) !== JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => sortAlphabetically()}
          type="button"
          className={`button is-info ${sortBy === 'alphabetically' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => sortByLength()}
          type="button"
          className={`button is-success ${sortBy === 'length' ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => toggleReverse()}
          type="button"
          className={`button is-warning ${isReversed === true ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {isChanged === true && (
          <button
            onClick={() => reset()}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsToShow.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}

        {/* <li data-cy="Good">Carrot</li>

        <li data-cy="Good">Eggs</li>

        <li data-cy="Good">Ice cream</li>

        <li data-cy="Good">Apple</li>

        <li data-cy="Good">...</li> */}
      </ul>
    </div>
  );
};
