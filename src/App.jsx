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

const ALPHABET_SORT = 'alphabet';
const STR_LENGTH_SORT = 'length';

const getPreparedGoods = (goods, { sort, reverse }) => {
  const preparedGoods = [...goods];

  if (sort) {
    preparedGoods.sort((good1, good2) => {
      switch (sort) {
        case ALPHABET_SORT:
          return good1.localeCompare(good2);
        case STR_LENGTH_SORT:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sort, setSort] = useState('');
  const [reverse, setReverse] = useState(false);
  const [classActive, setClassActive] = useState('');

  const preparedGoods = getPreparedGoods(goodsFromServer, { sort, reverse });

  const resetFilters = () => {
    setSort('');
    setReverse(false);
    setClassActive('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSort(ALPHABET_SORT);
            setClassActive(ALPHABET_SORT);
          }}
          type="button"
          className={`button is-info ${classActive === ALPHABET_SORT ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSort(STR_LENGTH_SORT);
            setClassActive(STR_LENGTH_SORT);
          }}
          type="button"
          className={`button is-success ${classActive === STR_LENGTH_SORT ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setSort(sort);
            setReverse(!reverse);
          }}
          type="button"
          className={`button is-warning ${reverse ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sort || reverse) && (
          <button
            onClick={() => resetFilters()}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
