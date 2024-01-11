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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_REVERSE = 'reverse';

function getPreparedGoods(goods, { sortField }, isReverse) {
  const preparedGoods = [...goods];

  if (sortField === SORT_FIELD_ALPHABET) {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortField === SORT_FIELD_LENGTH) {
    preparedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (sortField === SORT_FIELD_REVERSE) {
    preparedGoods.reverse();
  }

  if (isReverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const sortGoods = getPreparedGoods(goodsFromServer,
    { sortField }, isReverse);

  const toggleReverse = () => {
    setIsReverse(prevIsReverse => !prevIsReverse);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPHABET })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={toggleReverse}
          type="button"
          className={cn('button is-warning',
            { 'is-light': !isReverse })}
        >
          Reverse
        </button>

        {sortField || isReverse ? (
          <button
            onClick={() => {
              setSortField('');
              setIsReverse(false);
            }
            }
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )
          : ''}
      </div>
      <ul style={{ marginRight: '10px' }}>
        {sortGoods.map(good => <li data-cy="Good" key={good}>{good}</li>)}
      </ul>
    </div>
  );
};
