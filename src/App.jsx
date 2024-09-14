import { useState } from 'react';
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

const getSortedGoods = (goods, sortType, reversed) => {
  const sortedGoods = [...goods];

  sortedGoods.sort((a, b) => {
    switch (sortType) {
      case 'alphabetically':
        return a.localeCompare(b);
      case 'length':
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (reversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [reversed, setReversed] = useState(false);
  const [sortValue, setActiveButton] = useState('');

  const sortGoods = type => {
    setActiveButton(type);
  };

  const toggleReverse = () => {
    setReversed(!reversed);
  };

  const resetGoods = () => {
    setReversed(false);
    setActiveButton('');
  };

  const sortedGoods = getSortedGoods(goodsFromServer, sortValue, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortValue !== 'alphabetically',
          })}
          onClick={() => {
            sortGoods('alphabetically');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortValue !== 'length',
          })}
          onClick={() => {
            sortGoods('length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {(sortValue || reversed) && (
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
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
