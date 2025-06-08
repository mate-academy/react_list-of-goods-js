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

export const App = () => {
  const ABC = 'abc';
  const LENGTH = 'length';

  const [sortedGoods, setSortedGoods] = useState([...goodsFromServer]);
  const [wayOfSorting, setWayOfSorting] = useState('');
  const [reversed, setReversed] = useState(false);

  const getPreparedGoods = (goods, { sort, reversing }) => {
    const preparedGoods = [...goods];

    if (sort) {
      preparedGoods.sort((good1, good2) => {
        switch (sort) {
          case ABC:
            return good1.localeCompare(good2);
          case LENGTH:
            return good1.length - good2.length;
          default:
            return 0;
        }
      });
    }

    if (reversing) {
      return preparedGoods.reverse();
    }

    return preparedGoods;
  };

  function sortABC() {
    setWayOfSorting(ABC);
  }

  function sortLength() {
    setWayOfSorting(LENGTH);
  }

  function reverse() {
    setReversed(!reversed);
  }

  function reset() {
    setWayOfSorting('');
    setReversed(false);
    setSortedGoods([...goodsFromServer]);
  }

  const currentGoods = getPreparedGoods(sortedGoods, {
    sort: wayOfSorting,
    reversing: reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', { 'is-light': wayOfSorting !== ABC })}
          onClick={sortABC}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': wayOfSorting !== LENGTH,
          })}
          onClick={sortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {wayOfSorting || reversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {currentGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
