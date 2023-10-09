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

const sortAlphabet = 'Sort alphabetically';
const sortLength = 'Sort by length';

function reset(setSortField, setReverse) {
  setSortField('');
  setReverse(false);
}

function getReadyGoods(goods, { sortField, reverse }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case sortAlphabet:
          return good1.localeCompare(good2);

        case sortLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return reverse
    ? preparedGoods.reverse()
    : preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getReadyGoods(goodsFromServer, { sortField, reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': sortField !== sortAlphabet })}
          onClick={() => setSortField(sortAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sortField !== sortLength })}
          onClick={() => setSortField(sortLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning',
            { 'is-light': !reverse })}
          onClick={() => {
            setReverse(!reverse);
          }}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              reset(setSortField, setReverse);
            }}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>))
        }
      </ul>
    </div>
  );
};
