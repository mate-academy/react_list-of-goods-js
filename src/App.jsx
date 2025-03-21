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
  const initialGoods = [...goodsFromServer];
  const [goods, setGoods] = useState(initialGoods);
  const [sortField, setSortField] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const getSortedGoods = (items, field, reverse) => {
    const sortedGoods = [...items];

    if (field === 'alphabet') {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (field === 'length') {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (reverse) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const sortAlphabetically = () => {
    const sortedGoods = getSortedGoods(goods, 'alphabet', isReversed);

    setGoods(sortedGoods);
    setSortField('alphabet');
  };

  const sortByLength = () => {
    const sortedGoods = getSortedGoods(goods, 'length', isReversed);

    setGoods(sortedGoods);
    setSortField('length');
  };

  const reverseGoods = () => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setGoods(initialGoods);
    setSortField(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === 'alphabet' ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button type="button" className="button is-danger" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
