import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
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
  const [sortBy, setSortBy] = useState(null);
  const [reverseSort, setReverseSort] = useState(false);
  const [goods, setGoods] = useState([...goodsFromServer]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortBy('alphabetically');
            setGoods(goods.sort((a, b) => a.localeCompare(b)));
          }}
          type="button"
          className={classNames('button is-info', {
            'is-light': sortBy !== 'alphabetically',
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortBy('length');
            setGoods(goods.sort((a, b) => a.length - b.length));
          }}
          type="button"
          className={classNames('button is-success', {
            'is-light': sortBy !== 'length',
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            if (reverseSort === false) {
              setReverseSort(true);
            } else {
              setReverseSort(false);
            }

            setGoods(goods.reverse());
          }}
          type="button"
          className={classNames('button is-warning', {
            'is-light': reverseSort !== true,
          })}
        >
          Reverse
        </button>

        {(sortBy || reverseSort) && (
          <button
            onClick={() => {
              setSortBy(null);
              setReverseSort(false);
              setGoods([...goodsFromServer]);
            }}
            type="button"
            className="button is-danger is-light"
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
