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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

const sorted = (goods, sortBy, isReverse) => {
  let prepearedGoods = [...goods];

  if (sortBy) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    prepearedGoods = prepearedGoods.reverse();
  }

  return prepearedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [goodsReverse, setGoodsReverse] = useState(false);
  const visibleGoods = sorted(goodsFromServer, sortField, goodsReverse);

  const handleReset = () => {
    setSortField('');
    setGoodsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_BY_ALPHABET)}
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': sortField !== SORT_BY_ALPHABET })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_BY_LENGTH)}
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sortField !== SORT_BY_LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setGoodsReverse(!goodsReverse)}
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !goodsReverse })}
        >
          Reverse
        </button>

        {(sortField || goodsReverse) && (
          <button
            onClick={() => handleReset()}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
