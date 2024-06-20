import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

const SORT_BY_ALPHABET = 'alphabetically';
const SORT_BY_LENGTH = 'length';

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

function prepareSort(goodsList, { sortField, isReversed }) {
  const goods = [...goodsList];

  if (sortField === SORT_BY_ALPHABET) {
    goods.sort((good1, good2) => good1.localeCompare(good2));
  } else if (sortField === SORT_BY_LENGTH) {
    goods.sort((good1, good2) => {
      if (good1.length === good2.length) {
        return good1.localeCompare(good2);
      }

      return good1.length - good2.length;
    });
  }

  if (isReversed) {
    goods.reverse();
  }

  return goods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [goods, setGoods] = useState(goodsFromServer);

  const reset = () => {
    setSortField('');
    setIsReversed(false);
    setGoods(goodsFromServer);
  };

  const handleSort = field => {
    const sortedGoods = prepareSort(goodsFromServer, {
      sortField: field,
      isReversed,
    });

    setGoods(sortedGoods);
    setSortField(field);
  };

  const handleReverse = () => {
    setGoods(prevGoods => {
      const reversedGoods = [...prevGoods].reverse();

      setIsReversed(!isReversed);

      return reversedGoods;
    });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSort(SORT_BY_ALPHABET)}
          type="button"
          className={`button is-info ${sortField === SORT_BY_ALPHABET ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => handleSort(SORT_BY_LENGTH)}
          type="button"
          className={`button is-success ${sortField === SORT_BY_LENGTH ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
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
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
