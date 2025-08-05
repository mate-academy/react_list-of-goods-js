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

const SORT_ALPHABET = 'alphabet';
const SORT_LENGTH = 'length';

function getPreparedGoods(goods, sortField, reverseField) {
  const sortedGoods = [...goods];

  if (sortField) {
    sortedGoods.sort((item1, item2) => {
      switch (sortField) {
        case SORT_ALPHABET:
          return item1.localeCompare(item2);
        case SORT_LENGTH:
          return item1.length - item2.length;
        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(false);

  const goods = getPreparedGoods(goodsFromServer, sortField, reverseField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SORT_ALPHABET
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortField(SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SORT_LENGTH
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortField(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            reverseField === true ? 'button is-info' : 'button is-info is-light'
          }
          onClick={() =>
            !reverseField ? setReverseField(true) : setReverseField(false)
          }
        >
          Reverse
        </button>

        {sortField || reverseField ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReverseField(false);
            }}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
