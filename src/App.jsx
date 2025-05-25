import 'bulma/css/bulma.css';
import classNames from 'classnames';
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

export const App = () => {
  const [sortType, setSortType] = useState('none');
  const [isReversed, setIsReversed] = useState(false);
  const [goods, setGoods] = useState(goodsFromServer);

  const getSortedGoods = (type, reverse) => {
    let sorted = [...goodsFromServer];

    if (type === 'alphabet') {
      sorted.sort((a, b) => a.localeCompare(b));
    } else if (type === 'length') {
      sorted.sort((a, b) => a.length - b.length);
    }

    return reverse ? sorted.reverse() : sorted;
  };

  const sortByAlphabet = () => {
    const newType = 'alphabet';
    setSortType(newType);
    setGoods(getSortedGoods(newType, isReversed));
  };

  const sortByLength = () => {
    const newType = 'length';
    setSortType(newType);
    setGoods(getSortedGoods(newType, isReversed));
  };

  const reverseOrder = () => {
    const newReverse = !isReversed;
    setIsReversed(newReverse);
    setGoods(getSortedGoods(sortType, newReverse));
  };

  const reset = () => {
    setSortType('none');
    setIsReversed(false);
    setGoods(goodsFromServer);
  };

  const isModified =
    sortType !== 'none' ||
    isReversed ||
    goods.join(',') !== goodsFromServer.join(',');

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByAlphabet}
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== 'alphabet',
          })}
        >
          Sort alphabetically
        </button>
        <button
          onClick={sortByLength}
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== 'length',
          })}
        >
          Sort by length
        </button>
        <button
          onClick={reverseOrder}
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {isModified && (
          <button onClick={reset} type="button" className="button is-danger">
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
