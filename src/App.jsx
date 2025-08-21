import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

function isInitialOrder(goods, goodsFromServer) {
  return goods.length === goodsFromServer.length && 
  goods.every((item, i) => item === goodsFromServer[i]);
}

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
    setGoods([...goods].sort());
  };

  const sortByLength = () => {
    setGoods([...goods].sort((a, b) => a.length - b.length));
  };

  const reverseGoods = () => {
    setGoods([...goods].slice().reverse());
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
  };

  return (
  <div className="section content">
    <div className="buttons">
      <button 
      type="button" 
      className="button is-info is-light"
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

      { !isInitialOrder(goods, goodsFromServer) && (
      <button 
      type="button" 
      className="button is-danger is-light"
      onClick={resetGoods}
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
}
