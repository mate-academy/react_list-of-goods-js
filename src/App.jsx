/* eslint-disable max-len */
/* eslint-disable no-console */
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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

export const App = () => {
  const [visibleGoods, setvisibleGoods] = useState(goodsFromServer);

  const [sortField, setsortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const sortAlphabet = () => {
    setvisibleGoods((current) => {
      const sorted = [...current].sort();

      if (isReverse) {
        sorted.reverse();
      }

      return sorted;
    });
    setsortField('Sort alphabetically');
  };

  const sortLenght = () => {
    setvisibleGoods((current) => {
      const sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);

      if (isReverse) {
        sorted.reverse();
      }

      return sorted;
    });
    setsortField('Sort by length');
  };

  const reset = () => {
    setvisibleGoods(goodsFromServer);
    setsortField('');
    setIsReverse(false);
  };

  const reverse = () => {
    setvisibleGoods(current => [...current].reverse());
    setIsReverse(!isReverse);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortAlphabet}
          type="button"
          className={cn({ 'is-light': sortField !== 'Sort alphabetically',
            'button is-info': true })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortLenght}
          type="button"
          className={cn({ 'is-light': sortField !== 'Sort by length',
            'button is-success': true })}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={cn({ 'is-light': !isReverse,
            'button is-warning': true })}
        >
          Reverse
        </button>

        {sortField || isReverse ? (
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
        {visibleGoods.map(visibleGood => (
          <li data-cy="Good" key={visibleGood}>{visibleGood}</li>
        ))}
      </ul>
    </div>
  );
};
