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

const SORTED_BY_LENGTH = 'length';
const SORTED_BY_ALPHABET = 'alphabet';

function preparedGoods(goods, action, isReverse) {
  const sortedGoods = [...goods];

  if (action) {
    switch (action) {
      case SORTED_BY_LENGTH:
        sortedGoods.sort((good1, good2) => good1.length - good2.length);
        break;

      case SORTED_BY_ALPHABET:
        sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;

      default:
        return 0;
    }
  }

  if (isReverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortAction, setSortAction] = useState('');
  const [isReverse, setReverse] = useState(false);
  const goods = preparedGoods(goodsFromServer, sortAction, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortAction === SORTED_BY_ALPHABET
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortAction(SORTED_BY_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortAction === SORTED_BY_LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => {
            setSortAction(SORTED_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReverse ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => (!isReverse ? setReverse(true) : setReverse(false))}
        >
          Reverse
        </button>

        {(sortAction || isReverse) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortAction('');
              setReverse(false);
            }}
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
