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

const SORT_BY_ALPHABET = 'alphabetically';
const SORT_BY_LENGTH = 'length';

const sortGoods = (goods, sortType, reverse) => {
  let sortedGoods = [...goods];

  switch (sortType) {
    case SORT_BY_ALPHABET:
      sortedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SORT_BY_LENGTH:
      sortedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      sortedGoods = goods;
  }

  if (reverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [sortReverse, setSortReverse] = useState(false);

  const getButtonClass = value => {
    return sortType === value ? '' : 'is-light';
  };

  const reset = () => {
    setSortType('');
    setSortReverse(false);
  };

  const reverse = status => {
    setSortReverse(!status);
  };

  const goods = sortGoods([...goodsFromServer], sortType, sortReverse);

  return (
    <div className="section content" id="main">
      <div className="buttons">
        <button
          type="button"
          onClick={() => {
            setSortType(SORT_BY_ALPHABET);
          }}
          className={`button is-info ${getButtonClass(SORT_BY_ALPHABET)}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortType(SORT_BY_LENGTH)}
          className={`button is-success ${getButtonClass(SORT_BY_LENGTH)}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => {
            reverse(sortReverse);
          }}
          className={`button is-warning ${sortReverse ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortType || sortReverse) && (
          <button
            type="button"
            onClick={() => reset()}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
