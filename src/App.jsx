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
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [activeButton, setActiveButton] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const funcSortAlphabetically = () => {
    const sortedGoods = [...goods].sort();

    setGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
    setActiveButton('alphabetically');
  };

  const funcSortByLength = () => {
    const sortedGoods = [...goods].sort((a, b) => {
      if (a.length === b.length) {
        return goodsFromServer.indexOf(a) - goodsFromServer.indexOf(b);
      }

      return a.length - b.length;
    });

    setGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
    setActiveButton('length');
  };

  const funcReverse = () => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
  };

  const funcReset = () => {
    setGoods([...goodsFromServer]);
    setActiveButton('');
    setIsReversed(false);
  };

  const isOnStart = JSON.stringify(goodsFromServer) === JSON.stringify(goods);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeButton === 'alphabetically' ? '' : 'is-light'}`}
          onClick={funcSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeButton === 'length' ? '' : 'is-light'}`}
          onClick={funcSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={funcReverse}
        >
          Reverse
        </button>

        {!isOnStart && (
          <button
            type="button"
            className="button is-danger"
            onClick={funcReset}
          >
            Reset
          </button>
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
