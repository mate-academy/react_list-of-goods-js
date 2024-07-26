import { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
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
const SORT_FIELD_AB = 'abSorted';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, { sortedField, isReverse }) {
  const copyGoods = [...goods];

  if (sortedField) {
    copyGoods.sort((goods1, goods2) => {
      switch (sortedField) {
        case SORT_FIELD_AB:
          return goods1.localeCompare(goods2);

        case SORT_FIELD_LENGTH:
          return goods1[SORT_FIELD_LENGTH] - goods2[SORT_FIELD_LENGTH];

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    copyGoods.reverse();
  }

  return copyGoods;
}

const Goods = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li data-cy="Good" key={good}>
        {good}
      </li>
    ))}
  </ul>
);

export const App = () => {
  const [sortedField, setSortedField] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortedField,
    isReverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortedField !== SORT_FIELD_AB,
          })}
          onClick={() => setSortedField(SORT_FIELD_AB)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortedField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortedField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': isReverse === false,
          })}
          onClick={() => setIsReverse(prev => !prev)}
        >
          Reverse
        </button>

        {(sortedField || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortedField('');
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <Goods goods={visibleGoods} />
    </div>
  );
};
