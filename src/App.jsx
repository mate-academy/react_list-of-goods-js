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
  const [orderApplied, setOrderApplied] = useState('');
  const [reverseLight, setReverseLight] = useState(false);

  const toggleReverse = () => {
    setReverseLight(!reverseLight);
    goods.reverse();
  };

  let resetButton;

  if (orderApplied || reverseLight) {
    resetButton = (
      <button
        onClick={() => {
          setGoods([...goodsFromServer]);
          setOrderApplied('');
          setReverseLight(false);
        }}
        type="button"
        className="button is-danger is-light"
      >
        Reset
      </button>
    );
  }

  function setOrder(order) {
    let goodsList = [...goodsFromServer];

    switch (order) {
      case 'alphabetically':
        goodsList = goodsList.sort((a, b) => a.localeCompare(b));
        break;

      case 'length':
        goodsList = goodsList.sort((a, b) => a.length - b.length);
        break;

      default:
        break;
    }

    if (reverseLight) {
      goodsList = goodsList.reverse();
    }

    return goodsList;
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setGoods(setOrder('alphabetically'));
            setOrderApplied('alphabetically');
          }}
          type="button"
          className={`button is-info ${orderApplied === 'alphabetically' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setGoods(setOrder('length'));
            setOrderApplied('length');
          }}
          type="button"
          className={`button is-success ${orderApplied === 'length' ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            toggleReverse();
            setOrder();
          }}
          type="button"
          className={`button is-warning ${reverseLight ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {resetButton}
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
