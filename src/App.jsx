/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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

const Good = ({ good }) => <li data-cy="Good">{good}</li>;

export const App = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [activeSorting, setActiveSorting] = useState('');

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': !activeSorting.includes('name'),
          })}
          onClick={() => {
            setGoods([...goods].sort((a, b) => a.localeCompare(b)));
            setActiveSorting([...activeSorting, 'name']);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': !activeSorting.includes('length'),
          })}
          onClick={() => {
            setGoods([...goods].sort((a, b) => a.length - b.length));
            setActiveSorting([...activeSorting, 'length']);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !activeSorting.includes('reverse'),
          })}
          onClick={() => {
            setGoods(goods.reverse());
            setActiveSorting([...activeSorting, 'reverse']);
          }}
        >
          Reverse
        </button>

        {activeSorting && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setGoods(goodsFromServer);
              setActiveSorting('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => <Good good={good} />)}
      </ul>
    </div>
  );
};
