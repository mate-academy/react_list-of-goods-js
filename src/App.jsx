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

const SORT_BY_NAME = 'name';
const SORT_BY_LENGTH = 'length';

const preparedGoods = (goods, { sortBy, reverseGoods }) => {
  let prepared = [...goods];

  if (sortBy) {
    prepared = prepared.sort((g1, g2) => {
      switch (sortBy) {
        case SORT_BY_LENGTH:
          return g1.length - g2.length;
        case SORT_BY_NAME:
          return g1.localeCompare(g2);
        default:
          return 0;
      }
    });
  }

  if (reverseGoods) {
    prepared.reverse();
  }

  return prepared;
};

export const App = () => {
  const [reverseGoods, setReverseGoods] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const buttonClasses = (field, type) => cn(`button ${type}`, { 'is-light': sortBy !== field });

  const goods = preparedGoods(goodsFromServer,
    {
      sortBy,
      reverseGoods,
    });

  const reset = () => {
    setSortBy('');
    setReverseGoods(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={buttonClasses(SORT_BY_NAME, 'is-info')}
          onClick={() => setSortBy(SORT_BY_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={buttonClasses(SORT_BY_LENGTH, 'is-success')}
          onClick={() => setSortBy(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reverseGoods })}
          onClick={() => setReverseGoods(!reverseGoods)}
        >
          Reverse
        </button>

        {(sortBy || reverseGoods)
        && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
