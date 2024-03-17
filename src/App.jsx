import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
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

function getListOfGoods(goods, { sortField, checkReverse }) {
  let listOfGoods = [...goods];

  if (sortField) {
    listOfGoods.sort((good1, good2) => {
      switch (sortField) {
        case 'alphabet':
          return good1.localeCompare(good2);
        case 'length':
          return good1.length - good2.length;
        
        default:
          return 0;
      }
    });
  }

  if (checkReverse) {
    listOfGoods.reverse()
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
            setSortField('alphabet');
          }}
          type="button"
          className={`button is-info ${sortField === 'alphabet' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField('length');
          }}
          type="button"
          className={`button is-success ${sortField === 'length' ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            checkReverse ? setCheckReverse(false) : setCheckReverse(true);
          }}
          type="button"
          className={`button is-warning ${checkReverse ? '' : 'is-light'}`}
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
        {visibleGoods.map(product => (
          <li data-cy="Good" key={product}>
            {product}
          </li>
        ))}
      </ul>
    </div>
  );
};
