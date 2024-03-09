import { useState } from 'react';
import cn from 'classnames';

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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';
const REVERSE = 'reverse';

function getPrepearedGoods(goods, { sortfield, reverse }) {
  let prepearedGoods = [...goods];

  if (sortfield) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortfield) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse === REVERSE) {
    prepearedGoods = prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortfield, setSortfield] = useState('');
  const [reverse, setReverse] = useState('');
  const visiblegoods = getPrepearedGoods(goodsFromServer, {
    sortfield,
    reverse,
  });
  const setreverseButton = () =>
    reverse === REVERSE ? setReverse('') : setReverse(REVERSE);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortfield !== SORT_FIELD_ALPHABET,
          })}
          onClick={() => {
            setSortfield(SORT_FIELD_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortfield !== SORT_FIELD_LENGTH,
          })}
          onClick={() => {
            setSortfield(SORT_FIELD_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reverse !== REVERSE,
          })}
          onClick={setreverseButton}
        >
          Reverse
        </button>

        {(sortfield || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortfield('');
              setReverse('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visiblegoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
