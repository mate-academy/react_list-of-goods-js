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
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState(0);
  const [isReseted, setIsReseted] = useState(true);
  const [isReversed, setIsReversed] = useState(false);

  const sortByAlphabet = () => {
    const sortAlphabet = [...goods].sort((a, b) => a.localeCompare(b));

    setGoods(isReversed ? sortAlphabet.reverse() : sortAlphabet);
    setSortType('alphabet');
    setIsReseted(false);
  };

  const sortByLength = () => {
    const sortLength = [...goods].sort((good1, good2) => {
      if (good1.length === good2.length) {
        return good1.localeCompare(good2);
      }

      return good1.length - good2.length;
    });

    setGoods(isReversed ? sortLength.reverse() : sortLength);
    setSortType('length');
    setIsReseted(false);
  };

  const reverseSort = () => {
    setGoods([...goods].reverse());
    setIsReseted(isReversed);
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setGoods(goodsFromServer);
    setSortType('');
    setIsReseted(true);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== 'alphabet',
          })}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== 'length',
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed, //
          })}
          onClick={reverseSort}
        >
          Reverse
        </button>
        {!isReseted && (
          <button
            type="button"
            className={cn('button', 'is-danger')}
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
