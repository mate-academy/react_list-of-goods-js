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

const SORT_FIELD = {
  ALPHABET: 'alphabet',
  LENGTH: 'length',
};

const getPreparedGoods = (goods, { sortField, isReverse }) => {
  const sortedGoods = [...goods].sort((good1, good2) => {
    switch (sortField) {
      case SORT_FIELD.ALPHABET:
        return good1.localeCompare(good2);
      case SORT_FIELD.LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReverse) {
    return sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const goods = getPreparedGoods(goodsFromServer, { sortField, isReverse });

  const handleReset = () => {
    setSortField('');
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SORT_FIELD.ALPHABET && 'is-light'}`}
          onClick={() => setSortField(SORT_FIELD.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SORT_FIELD.LENGTH && 'is-light'}`}
          onClick={() => setSortField(SORT_FIELD.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReverse && 'is-light'}`}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(sortField || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
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
