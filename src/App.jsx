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

const SORT_METOD_NAME = 'name';
const SORT_METOD_LENGTH = 'length';

function getPreparedGoods(goods, sortMetod, reverse) {
  const preparedGoods = [...goods];

  if (sortMetod) {
    preparedGoods.sort((good1, good2) => {
      switch (sortMetod) {
        case SORT_METOD_NAME:
          return good1.localeCompare(good2);

        case SORT_METOD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortMetod, setSortMetod] = useState('');
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortMetod, reversed);
  const handleRevers = () => {
    setReversed(!reversed);
  };

  const onReset = () => {
    setSortMetod('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn('button', 'is-info',
              { 'is-light': sortMetod !== SORT_METOD_NAME })
          }
          onClick={() => setSortMetod(SORT_METOD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sortMetod !== SORT_METOD_LENGTH })
          }
          onClick={() => setSortMetod(SORT_METOD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning',
            { 'is-light': !reversed })}
          onClick={handleRevers}
        >
          Reverse
        </button>

        {(sortMetod || reversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={onReset}
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
