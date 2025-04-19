import { useState } from 'react';
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
  const [goods, setGoods] = useState(goodsFromServer);
  const [order, setOrder] = useState('default');
  const sortAlphabetically = () => {
    setGoods([...goods].sort());
    setOrder('alphabetically');
  };

  const sortByLength = () => {
    setGoods([...goods].sort((lado1, lado2) => lado1.length - lado2.length));
    setOrder('length');
  };

  const reverseX = () => {
    setGoods([...goods].reverse());
    setOrder('reverse');
  };

  const resetX = () => {
    setGoods([...goodsFromServer]);
    setOrder('default');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${order === 'alphabetical' ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${order === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${order === 'reverse' ? '' : 'is-light'}`}
          onClick={reverseX}
        >
          Reverse
        </button>

        {order !== 'default' && (
          <button type="button" className="button is-danger" onClick={resetX}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
