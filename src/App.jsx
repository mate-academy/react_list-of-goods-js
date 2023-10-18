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

  const sortAlphabetically = () => {
    const sortedGoods
      = [...goods].sort((a, b) => a[0].localeCompare(b[0],
        'en', { sensitivity: 'base' }));

    setGoods(sortedGoods);
    console.log('Alphabet sort');
  };

  const sortByLength = () => {
    const sortedGoods = [...goods].sort((a, b) => a.length - b.length);

    setGoods(sortedGoods);
    console.log('Length sort');
  };

  const reverseGoods = () => {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    console.log('Reverse sort');
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
    console.log('Reset sort');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortAlphabetically ? 'is-light' : ''}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={reverseGoods}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={resetGoods}
        >
          Reset
        </button>
      </div>

      <ul>
        {goodsFromServer.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
