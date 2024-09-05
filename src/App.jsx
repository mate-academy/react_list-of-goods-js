import 'bulma/css/bulma.css';
import cn from 'classnames';
import { useState } from 'react';
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

let clickResetButton = false;
let updatedGoods = goodsFromServer;

export const App = () => {
  const [currentButton, setButton] = useState('');

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setButton('byAlphabet');
            updatedGoods = goodsFromServer.sort((a, b) => a.localeCompare(b));
          }}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': currentButton !== 'byAlphabet',
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': currentButton !== 'byLength',
          })}
          onClick={() => {
            setButton('byLength');
            updatedGoods = goodsFromServer.sort((a, b) => a.length - b.length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': currentButton !== 'byReversed',
          })}
          onClick={() => {
            setButton('byReversed');
            updatedGoods = goodsFromServer.sort((a, b) => b.localeCompare(a));
          }}
        >
          Reverse
        </button>

        {!clickResetButton && (
          <button
            type="button"
            style={{
              display: !currentButton ? 'none' : 'block',
            }}
            className="button is-danger is-light"
            onClick={() => {
              clickResetButton = true;
              setButton('reset');
              updatedGoods = goodsFromServer;
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {updatedGoods.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
