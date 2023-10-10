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

const SORT_ALPHABETICAL_TYPE = 'alpha';
const SORT_LENGTH_TYPE = 'length';
// const REVERSED = 'reverse';

function getPreparedGoods(goods, { sortType, reversed }) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SORT_ALPHABETICAL_TYPE:
          return good1.localeCompare(good2);

        case SORT_LENGTH_TYPE:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [reversed, setReverse] = useState(false);
  const displayGoods
    = getPreparedGoods(goodsFromServer, { sortType, reversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortType !== SORT_ALPHABETICAL_TYPE })}
          onClick={() => setSortType(SORT_ALPHABETICAL_TYPE)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortType !== SORT_LENGTH_TYPE })}
          onClick={() => setSortType(SORT_LENGTH_TYPE)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': !reversed })}
          onClick={() => setReverse(!reversed)}
        >
          Reverse
        </button>
        { (reversed || sortType)
        && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setReverse(null);
            setSortType('');
          }}
        >
          Reset
        </button>
        )
}
      </div>

      <ul>
        {displayGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}

      </ul>
    </div>
  );
};
