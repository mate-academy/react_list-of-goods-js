/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-syntax */
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

const SORT_KEYS = {
  alphabet: 'alphabet',
  length: 'length',
};

export const App = () => {
  const [sortBy, setSortBy] = useState(''); // lenght, alphabet
  const [reverse, setReverse] = useState(1);
  const [resetActive, setResetActive] = useState(false);

  const resetButtons = () => {
    document.querySelectorAll('.button').forEach(button => {
      button.classList.add('is-light');
    });
  };

  const sortedGoods = [...goodsFromServer].sort((goodA, goodB) => {
    if (sortBy === 'alphabet') {
      return goodA.localeCompare(goodB);
    }

    if (sortBy === 'length') {
      return goodA.length - goodB.length;
    }

    return 0;
  });

  const reverseGoods = reverse < 0 ? [...sortedGoods].reverse() : sortedGoods;
  const buttonChangeClass = key => {
    for (const button of document.querySelectorAll('.button')) {
      if (button.dataset.sort === key) {
        button.classList.remove('is-light');
      } else if (button.dataset.sort) {
        button.classList.add('is-light');
      }
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          data-sort={SORT_KEYS.alphabet}
          className="button is-info is-light"
          onClick={() => {
            buttonChangeClass(SORT_KEYS.alphabet);
            setResetActive(true);
            setSortBy(SORT_KEYS.alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          data-sort={SORT_KEYS.length}
          className="button is-success is-light"
          onClick={() => {
            buttonChangeClass(SORT_KEYS.length);
            setResetActive(true);
            setSortBy(SORT_KEYS.length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={e => {
            e.target.classList.toggle('is-light');
            setReverse(reverse * -1);
            if (reverse === 1) {
              setResetActive(true);
            } else {
              setResetActive(false);
            }
          }}
        >
          Reverse
        </button>

        {resetActive && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy('');
              setReverse(1);
              setResetActive(false);
              resetButtons();
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {reverseGoods.map(good => {
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
