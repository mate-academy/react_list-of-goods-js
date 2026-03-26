import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { GoodsList } from './Components/GoodsList';

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';
const REVERSE = 'reverse';
let classField = '';

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

function getPreparedGoods(order, preparedGoods = [...goodsFromServer]) {
  switch (order) {
    case SORT_BY_ALPHABET:
      preparedGoods.sort((el1, el2) => el1.localeCompare(el2));
      classField = SORT_BY_ALPHABET;
      break;

    case SORT_BY_LENGTH:
      preparedGoods.sort((el1, el2) => el1.length - el2.length);
      classField = SORT_BY_LENGTH;
      break;

    case REVERSE:
      preparedGoods.reverse();
      classField = REVERSE;
      break;

    default:
      return 0;
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button ${classField === SORT_BY_ALPHABET ? 'is-info' : ''} ${classField !== SORT_BY_ALPHABET ? 'is-light' : ''}`}
          onClick={() => {
            setSortField(getPreparedGoods(SORT_BY_ALPHABET));
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button ${classField === SORT_BY_LENGTH ? 'is-success' : ''} ${classField !== '' ? 'is-light' : ''}`}
          onClick={() => {
            setSortField(getPreparedGoods(SORT_BY_LENGTH));
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button ${classField === REVERSE ? 'is-warning' : ''} ${classField === '' ? '' : 'is-light'}`}
          onClick={() => {
            setSortField(() => [...sortField].reverse());
            classField = REVERSE;
          }}
        >
          Reverse
        </button>

        <button
          type="button"
          className={`button ${sortField !== '' ? 'is-danger' : ''} ${classField === '' ? '' : 'is-light'} ${classField !== '' ? 'is-light' : ''}`}
          onClick={() => {
            setSortField(goodsFromServer);
            classField = '';
          }}
        >
          Reset
        </button>
      </div>

      <ul>
        <GoodsList goods={sortField} />
      </ul>
    </div>
  );
};
