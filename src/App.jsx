import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

const SORT_BY_NAME = 'name';
const SORT_BY_LENGTH = 'length';

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

const sortGoods = (goods, sortParam, reverseQuery) => {
  const goodsToSort = [...goods];

  if (sortParam) {
    goodsToSort.sort((item1, item2) => {
      switch (sortParam) {
        case SORT_BY_NAME:
          return item1.localeCompare(item2);
        case SORT_BY_LENGTH:
          return item1.length - item2.length;
        default:
          return 0;
      }
    });
  }

  if (reverseQuery) {
    goodsToSort.reverse();
  }

  return goodsToSort;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);

  const goodsToShow = sortGoods(goodsFromServer, sortField, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_BY_NAME)}
          className={`button is-info ${sortField === SORT_BY_NAME ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_BY_LENGTH)}
          className={`button is-success ${sortField === SORT_BY_LENGTH ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReverse(!reverse)}
          className={`button is-warning ${reverse ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {sortField || reverse ? (
          <button
            type="button"
            onClick={() => {
              setReverse(false);
              setSortField('');
            }}
            className="button is-danger"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {goodsToShow.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
