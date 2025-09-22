import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react'; // Importing React library

// Array of goods received from a hypothetical server
export const goodsFromServer = [
  // List of various food items
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

// Componente principal App
export const App = () => {
  // Corrigido: Adicionado setGoods para permitir a atualização do estado
  const [goods, setGoods] = useState(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        {/* Adicionado o evento onClick para cada botão */}
        <button
          type="button"
          className="button is-info is-light"
          onClick={() => {
            const sortedGoods = [...goods].sort((a, b) => a.localeCompare(b));

            setGoods(sortedGoods);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={() => {
            const sortedGoods = [...goods].sort((a, b) => a.length - b.length);

            setGoods(sortedGoods);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={() => {
            const reversedGoods = [...goods].reverse();

            setGoods(reversedGoods);
          }}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => setGoods(goodsFromServer)}
        >
          Reset
        </button>
      </div>

      {/* Corrigido: Usando .map() para renderizar cada item em sua própria <li> */}
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
