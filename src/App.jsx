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
  const [sortField, setSortField] = useState('');
  const [isReversing, setReversing] = useState(false);
  const reset = () => {
    if (isReversing) {
      setReversing(!isReversing);
    }

    setSortField('');
    setGoods(goodsFromServer);
  };

  const sortByAlphabetically = () => {
    setSortField('Sort alphabetically');
    if (isReversing) {
      setGoods([...goods].sort((a, b) => b.localeCompare(a)));

      return;
    }

    setGoods([...goods].sort((a, b) => a.localeCompare(b)));
  };

  const sortByLenght = () => {
    setSortField('Sort by length');
    if (isReversing) {
      setGoods([...goods].sort((a, b) => b.length - a.length));

      return;
    }

    setGoods([...goods].sort((a, b) => a.length - b.length));
  };

  const reverseGood = () => {
    setReversing(!isReversing);
    setGoods([...goods].reverse());
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortField !== 'Sort alphabetically' },
          )}
          onClick={sortByAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortField !== 'Sort by length' },
          )}
          onClick={sortByLenght}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversing },
          )}
          onClick={reverseGood}
        >
          Reverse
        </button>

        {(sortField.length > 0 || isReversing) && (
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
        {goods.map(item => (
          <li data-cy="Good" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
