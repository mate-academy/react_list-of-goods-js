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

export const App = () => {
  const [currentButton, setButton] = useState('');
  const [sortedGoods, setSortedGoods] = useState(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setButton('byAlphabet');
            setSortedGoods(
              [...goodsFromServer].sort((a, b) => a.localeCompare(b)),
            );
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
            setSortedGoods(
              [...goodsFromServer].sort((a, b) => a.length - b.length),
            );
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
            setSortedGoods(
              [...goodsFromServer].sort((a, b) => b.localeCompare(a)),
            );
          }}
        >
          Reverse
        </button>

        {currentButton && (
          <button
            type="button"
            style={{
              display: sortedGoods === goodsFromServer ? 'none' : 'block',
            }}
            className="button is-danger is-light"
            onClick={() => {
              setButton('reset');
              setSortedGoods(goodsFromServer);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
