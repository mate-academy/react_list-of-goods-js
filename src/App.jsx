import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const handleSort = (type) => {
    let sortedGoods;

    switch (type) {
      case 'alphabetically':
        sortedGoods = [...goods].sort();
        break;

      case 'length':
        sortedGoods = [...goods].sort((a, b) => {
          if (a.length === b.length) {
            return a.localeCompare(b);
          }
          return a.length - b.length;
        });
        break;

      default:
        sortedGoods = [...goodsFromServer];
        setSortType(null);
        setIsReversed(false);
        setGoods(sortedGoods);
        return;
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
    setSortType(type);
  };

  const handleReverse = () => {
    setGoods(current => [...current].reverse());
    setIsReversed(!isReversed);
  };

  const isModified = JSON.stringify(goods) !== JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== 'alphabetically',
          })}
          onClick={() => handleSort('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== 'length',
          })}
          onClick={() => handleSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleSort()}
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
