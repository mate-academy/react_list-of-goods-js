import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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

const BASIC_SORT = 'all';
const ALPHABET_SORT = 'alphabet';
const LENGTH_SORT = 'length';

const sortGoods = (goods, method, reversed) => {
  const goodsCopy = [...goods];

  switch (method) {
    case ALPHABET_SORT:
      goodsCopy.sort((a, b) => a.localeCompare(b));
      break;
    case LENGTH_SORT:
      goodsCopy.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (reversed) {
    goodsCopy.reverse();
  }

  return goodsCopy;
};

export const App = () => {
  const [filter, setFilter] = useState(BASIC_SORT);
  const [reversed, setReversed] = useState(false);
  const goods = sortGoods(goodsFromServer, filter, reversed);

  const handleReset = () => {
    setFilter(BASIC_SORT);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setFilter(ALPHABET_SORT)}
          type="button"
          className={classNames('button is-info', {
            'is-light': filter !== ALPHABET_SORT,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setFilter(LENGTH_SORT)}
          type="button"
          className={classNames('button is-success', {
            'is-light': filter !== LENGTH_SORT,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(prev => !prev)}
          type="button"
          className={classNames('button is-warning', { 'is-light': !reversed })}
        >
          Reverse
        </button>

        {(filter !== BASIC_SORT || reversed) && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
