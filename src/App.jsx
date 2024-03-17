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

const alphabet = 'alphabet';
const length = 'length';

function getListOfGoods(goods, { sortField, checkReverse }) {
  const listOfGoods = [...goods];

  if (sortField) {
    listOfGoods.sort((good1, good2) => {
      switch (sortField) {
        case alphabet:
          return good1.localeCompare(good2);

        case length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (checkReverse) {
    listOfGoods.reverse();
  }

  return listOfGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [checkReverse, setCheckReverse] = useState(false);
  const visibleGoods = getListOfGoods(goodsFromServer, {
    sortField,
    checkReverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(alphabet);
          }}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(length);
          }}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() =>
            checkReverse ? setCheckReverse(false) : setCheckReverse(true)
          }
          type="button"
          className={cn('button is-warning', {
            'is-light': checkReverse === false,
          })}
        >
          Reverse
        </button>

        {(sortField || checkReverse) && (
          <button
            onClick={() => {
              setSortField('');
              setCheckReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
