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

const SORT_FIELD_ABC = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, sortField, getReverse) {
  const preparedGoods = [...goods];

  if (sortField === SORT_FIELD_ABC) {
    preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
  } else if (sortField === SORT_FIELD_LENGTH) {
    preparedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (getReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [getReverse, setGetReverse] = useState(false);
  const [sortField, setSortField] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, getReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ABC,
          })}
          onClick={() => setSortField(SORT_FIELD_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !getReverse })}
          onClick={() =>
            getReverse ? setGetReverse(false) : setGetReverse(true)
          }
        >
          Reverse
        </button>

        {(sortField || getReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setGetReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
