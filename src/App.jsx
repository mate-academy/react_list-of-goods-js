import { useState } from 'react';

import 'bulma/css/bulma.css';
import './App.scss';

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

const SORT_BY_ALPHAB = 'alphabetically';
const SORT_BY_LENGTH = 'length';

export const App = () => {
  const initialGoods = [...goodsFromServer];
  const [goods, setGoods] = useState(initialGoods);
  const [sortField, setSordField] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const getSortedGoods = (field, reverse) => {
    const sortedGoods = [...initialGoods];

    if (field === SORT_BY_ALPHAB) {
      sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
    }

    if (field === SORT_BY_LENGTH) {
      sortedGoods.sort((good1, good2) => good1.length - good2.length);
    }

    if (reverse) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const sortAlphabetically = () => {
    const sortedGoods = getSortedGoods(SORT_BY_ALPHAB, isReversed);

    setGoods(sortedGoods);
    setSordField(SORT_BY_ALPHAB);
  };

  const sortByLength = () => {
    const sortedGoods = getSortedGoods(SORT_BY_LENGTH, isReversed);

    setGoods(sortedGoods);
    setSordField(SORT_BY_LENGTH);
  };

  const reverseGoods = () => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setGoods(initialGoods);
    setSordField(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortAlphabetically}
          type="button"
          className={`button is-info ${sortField === SORT_BY_ALPHAB ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={`button is-success ${sortField === SORT_BY_LENGTH ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={reverseGoods}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button onClick={reset} type="button" className="button is-danger">
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
