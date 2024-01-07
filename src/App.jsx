import { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

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
  const [sortGoods, setSortGoods] = useState('');
  const [isReversed, setReversed] = useState(false);
  const reset = () => {
    if (isReversed) {
      setReversed(!isReversed);
    }

    setSortGoods('');
    setGoods(goodsFromServer);
  };

  const sortByAlphabetically = () => {
    setSortGoods('Sort alphabetically');
    if (isReversed) {
      setGoods([...goods].sort((a, b) => b.localeCompare(a)));

      return;
    }

    setGoods([...goods].sort((a, b) => a.localeCompare(b)));
  };

  const sortByLenght = () => {
    setSortGoods('Sort by length');
    if (isReversed) {
      setGoods([...goods].sort((a, b) => b.length - a.length));

      return;
    }
    setGoods([...goods].sort((a, b) => a.length - b.length));
  };

  const reverseGood = () => {
    setReversed(!isReversed);
    setGoods([...goods].reverse());
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortGoods !== 'Sort alphabetically' },
          )}
          onClick={sortByAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortGoods !== 'Sort by length' },
          )}
          onClick={sortByLenght}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={reverseGood}
        >
          Reverse
        </button>

        {(sortGoods.length > 0 || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
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