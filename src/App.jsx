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

function renderGoods(goods) {
  return goods.map(good => (
    <li data-cy="Good" key={good}>
      {good}
    </li>
  ));
}

export const App = () => {
  const [sortedBy, setSortedBy] = useState({
    alphabetically: false,
    length: false,
    revers: false,
  });
  const { alphabetically, length, revers } = sortedBy;
  const goods = [...goodsFromServer];

  if (alphabetically) {
    goods.sort();
  }

  if (length) {
    goods.sort((a, b) => a.length - b.length);
  }

  if (revers) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${!alphabetically ? 'is-light' : ''}`}
          onClick={() => {
            setSortedBy({ alphabetically: true, length: false, revers });
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${!sortedBy.length ? 'is-light' : ''}`}
          onClick={() => {
            setSortedBy({ alphabetically: false, length: true, revers });
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!sortedBy.revers ? 'is-light' : ''}`}
          onClick={() => {
            setSortedBy({ alphabetically, length, revers: !revers });
          }}
        >
          Reverse
        </button>
        {(alphabetically || length || revers) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortedBy({
                alphabetically: false,
                length: false,
                revers: false,
              });
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>{renderGoods(goods)}</ul>
    </div>
  );
};
