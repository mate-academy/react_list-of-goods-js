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

const SORT_TYPE_NAME = 'alphabetically';
const SORT_TYPE_LENGTH = 'length';

function getPreparedGood(goods, sortField, isReversed) {
  const preparedGood = [...goods];

  if (sortField) {
    preparedGood.sort((item1, item2) => {
      switch (sortField) {
        case SORT_TYPE_NAME:
          return item1.localeCompare(item2);
        case SORT_TYPE_LENGTH:
          return item1.length - item2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGood.reverse();
  }

  return preparedGood;
}

export const App = () => {
  const [sortField, setsortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGood(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_TYPE_NAME,
          })}
          onClick={() => setsortField(SORT_TYPE_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_TYPE_LENGTH,
          })}
          onClick={() => setsortField(SORT_TYPE_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setsortField('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(li => (
          <li data-cy="Good" key={li}>
            {li}
          </li>
        ))}
      </ul>
    </div>
  );
};
