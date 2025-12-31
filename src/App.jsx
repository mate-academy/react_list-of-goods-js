import { useState } from 'react';
import cn from 'classnames';

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

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case 'alphabetically':
          return good1.localeCompare(good2);

        case 'length':
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed === true) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const goods = getPreparedGoods(goodsFromServer, { sortField, isReversed });

  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField('alphabetically')}
          className={`button is-info ${sortField === 'alphabetically' ? '' : 'is-light'}`}
          type="button"
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField('length')}
          className={`button is-success ${sortField === 'length' ? '' : 'is-light'}`}
          type="button"
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          className={cn('button is-warning', { 'is-light': !isReversed })}
          type="button"
        >
          Reverse
        </button>

        {(sortField !== '' || isReversed) && (
          <button
            onClick={reset}
            className="button is-danger is-light"
            type="button"
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
