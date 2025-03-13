import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import clsx from 'classnames';

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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';
const REVERSE_LIST = 'reverse';

export const App = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [activeButton, setActiveButton] = useState(null);

  const sortAlphabetically = () => {
    setGoods([...goods].sort());
    setActiveButton(SORT_BY_ALPHABET);
  };

  const sortByLength = () => {
    setGoods([...goods].sort((a, b) => a.length - b.length));
    setActiveButton(SORT_BY_LENGTH);
  };

  const reverseList = () => {
    if (activeButton === REVERSE_LIST) {
      setGoods([...goods].reverse());
      setActiveButton(null);
    } else {
      setGoods([...goods].reverse());
      setActiveButton(REVERSE_LIST);
    }
  };

  const resetList = () => {
    setGoods([...goodsFromServer]);
    setActiveButton(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortAlphabetically}
          type="button"
          className={clsx('button is-info', {
            'is-light': activeButton !== SORT_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={clsx('button is-success', {
            'is-light': activeButton !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={reverseList}
          type="button"
          className={clsx('button is-warning', {
            'is-light': activeButton !== REVERSE_LIST,
          })}
        >
          Reverse
        </button>

        {activeButton && (
          <button
            onClick={resetList}
            type="button"
            className="button is-danger is-light"
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
