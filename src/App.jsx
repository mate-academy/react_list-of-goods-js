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
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState('');

  const handleSortAlphabetically = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    if (isReversed) {
      sorted.reverse();
    }

    setGoods(sorted);
    setSortType('alpha');
  };

  const handleSortLen = () => {
    const sorted = [...goodsFromServer].sort((a, b) => {
      const lengthDiff = a.length - b.length;

      return lengthDiff !== 0 ? lengthDiff : a.localeCompare(b);
    });

    if (isReversed) {
      sorted.reverse();
    }

    setGoods(sorted);
    setSortType('len');
  };

  const handleReverse = () => {
    const newIsReversed = !isReversed;

    setIsReversed(newIsReversed);

    let sorted = [];

    if (sortType === 'alpha') {
      sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));
    } else if (sortType === 'len') {
      sorted = [...goodsFromServer].sort((a, b) => {
        const lengthDiff = a.length - b.length;

        return lengthDiff !== 0 ? lengthDiff : a.localeCompare(b);
      });
    } else {
      sorted = [...goodsFromServer];
    }

    if (newIsReversed) {
      sorted.reverse();
    }

    setGoods(sorted);
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    setIsReversed(false);
    setSortType('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== 'alpha',
          })}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== 'len',
          })}
          onClick={handleSortLen}
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

        {JSON.stringify(goods) !== JSON.stringify(goodsFromServer) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
