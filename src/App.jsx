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

const SORTED_BY_ALPH = 'alphabet';
const SORTED_BY_LENG = 'length';

function getPreparedGoods(goods, { sortField, reverse }) {
  const compators = {
    [SORTED_BY_ALPH]: (a, b) => a.localeCompare(b),
    [SORTED_BY_LENG]: (a, b) => a.length - b.length,
  };

  const comparator = compators[sortField] || (() => 0);

  const preparedGoods = [...goods].sort(comparator);

  return reverse ? preparedGoods.reverse() : preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');

  const [reverse, setReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SORTED_BY_ALPH ? 'is-light' : ''}`}
          onClick={() => setSortField(SORTED_BY_ALPH)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${sortField !== SORTED_BY_LENG ? 'is-light' : ''}`}
          onClick={() => setSortField(SORTED_BY_LENG)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${!reverse ? 'is-light' : ''}`}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>
        {(reverse || sortField !== '') && (
          <button
            type="button"
            className={`button is-danger ${sortField === 'reset' ? '' : 'is-light'}`}
            onClick={() => {
              setSortField('');
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
