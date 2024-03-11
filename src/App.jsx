import uuid from 'react-uuid';
import cn from 'classnames';
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

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortedBy, setSortedBy] = useState('');
  const [isAscending, setIsAscending] = useState(true);

  const sortAlphabetically = () => {
    const newOrder = isAscending ? 'asc' : 'desc';
    const sortedGoods = [...visibleGoods].sort(
      (a, b) =>
        a.localeCompare(b, 'en', { sensitivity: 'base' }) *
        (newOrder === 'asc' ? 1 : -1),
    );

    setVisibleGoods(sortedGoods);
    setSortedBy('is-info');
    setIsAscending(!isAscending);
  };

  const sortByLength = () => {
    const newOrder = isAscending ? 'asc' : 'desc';
    const sortedGoods = [...visibleGoods].sort(
      (a, b) => (a.length - b.length) * (newOrder === 'asc' ? 1 : -1),
    );

    setVisibleGoods(sortedGoods);
    setSortedBy('is-success');
    setIsAscending(!isAscending);
  };

  const reverse = () => {
    setVisibleGoods([...visibleGoods].reverse());
    setSortedBy('is-warning');
  };

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setSortedBy('');
  };

  const isSorted = visibleGoods.toString() !== goodsFromServer.toString();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortAlphabetically}
          type="button"
          className={cn('button is-info', {
            'is-light': sortedBy !== 'is-info',
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={cn('button is-success', {
            'is-light': sortedBy !== 'is-success',
          })}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={cn('button is-warning', {
            'is-light': sortedBy !== 'is-warning',
          })}
        >
          Reverse
        </button>
        {isSorted ? (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={uuid()} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
