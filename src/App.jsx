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

const ALPHABIT = 'alphabetically';
const LENGTH = 'by length';

function getSortedList(goods, reverse, { sortField }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case ALPHABIT:
          return good1.localeCompare(good2);
        case LENGTH:
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
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const goods = getSortedList(goodsFromServer, isReversed, { sortField });
  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== ALPHABIT,
          })}
          onClick={() => setSortField(ALPHABIT)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== LENGTH,
          })}
          onClick={() => setSortField(LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      {goods.map(good => (
        <li key={good} data-cy="Good">
          {good}
        </li>
      ))}
    </div>
  );
};
