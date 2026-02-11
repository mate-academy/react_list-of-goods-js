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

const SORT_FIELD_ALPHABETICALLY = 'alphabet';
const SORT_FIELD_BY_LENGTH = 'length';
const SORT_FIELD_REVERSE = 'reverse';
const SORT_FIELD_RESET = 'reset';

function sortGoods(goods, sortField, isReverse = false) {
  let result = [...goods];

  switch (sortField) {
    case SORT_FIELD_ALPHABETICALLY:
      result.sort((good1, good2) => {
        return good1.localeCompare(good2);
      });
      break;

    case SORT_FIELD_BY_LENGTH:
      result.sort((good1, good2) => {
        return good1.length - good2.length;
      });
      break;

    case SORT_FIELD_RESET:
    default:
      result = [...goodsFromServer];
  }

  if (isReverse) {
    return result.reverse();
  }

  return result;
}

export const App = () => {
  const [sortField, setSortField] = useState(SORT_FIELD_RESET);
  const [visibleGoods, setVisibleGoods] = useState([...goodsFromServer]);
  const [isReverse, setIsReverse] = useState(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETICALLY,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABETICALLY);
            setVisibleGoods(
              sortGoods([...goodsFromServer], SORT_FIELD_ALPHABETICALLY),
            );
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_BY_LENGTH,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_BY_LENGTH);
            setVisibleGoods(
              sortGoods([...goodsFromServer], SORT_FIELD_BY_LENGTH),
            );
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': !isReverse,
          })}
          onClick={() => {
            setIsReverse(prev => !prev);
            setVisibleGoods(prev => [...prev].reverse());
          }}
        >
          Reverse
        </button>

        {JSON.stringify(visibleGoods) !== JSON.stringify(goodsFromServer) && (
          <button
            type="button"
            className="button is-info is-light"
            onClick={() => {
              setSortField(SORT_FIELD_RESET);
              setVisibleGoods([...goodsFromServer]);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
