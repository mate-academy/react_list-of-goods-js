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

export const App = () => {
  const [sortOrder, setSortOrder] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  function resetSorting() {
    setSortOrder('');
    setIsReversed(false);
  }

  function sortByType(type) {
    const orders = [...goodsFromServer];

    switch (type) {
      case 'alphabetically': {
        orders.sort();
        break;
      }

      case 'length': {
        orders.sort((a, b) => a.length - b.length);
        break;
      }

      default:
        break;
    }

    if (isReversed) {
      orders.reverse();
    }

    return orders;
  }

  const goods = sortByType(sortOrder);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortOrder !== 'alphabetically' && 'is-light'}`}
          onClick={() => setSortOrder('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortOrder !== 'length' && 'is-light'}`}
          onClick={() => setSortOrder('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortOrder || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSorting}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(order => (
          <li data-cy="Good" key={order}>
            {order}
          </li>
        ))}
      </ul>
    </div>
  );
};
