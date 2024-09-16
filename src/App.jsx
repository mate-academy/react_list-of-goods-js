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
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortGoods = type => {
    const sortedGoods = [...goodsFromServer];

    if (type === 'alphabetically') {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (type === 'length') {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    setGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
    setSortType(type);
  };

  const reverseGoods = () => {
    setGoods([...goods].reverse());
    setIsReversed(prev => !prev);
  };

  const resetGoods = () => {
    setGoods([...goodsFromServer]);
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabetically' ? '' : 'is-light'}`}
          onClick={() => sortGoods('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={() => sortGoods('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {goods.toString() !== goodsFromServer.toString() && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
