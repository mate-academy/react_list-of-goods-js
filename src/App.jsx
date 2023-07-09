import 'bulma/css/bulma.css';
import { useState } from 'react';
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

const SORT_TYPE_AB = 'name';
const SORT_TYPE_LENGTH = 'length';

function getPreparedGoods(goods, { sortType, reverse } = {}) {
  let preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((firstGood, secondGood) => {
      switch (sortType) {
        case SORT_TYPE_AB:
          return firstGood.localeCompare(secondGood);

        case SORT_TYPE_LENGTH:
          return firstGood.length - secondGood.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, { sortType, reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SORT_TYPE_AB)}
          type="button"
          className={
            cn('button is-info', { 'is-light': sortType !== SORT_TYPE_AB })
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SORT_TYPE_LENGTH)}
          type="button"
          className={
            cn('button is-success',
              { 'is-light': sortType !== SORT_TYPE_LENGTH })
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => (reverse ? setReverse(false) : setReverse(true))}
          type="button"
          className={cn('button is-warning', { 'is-light': !reverse })}
        >
          Reverse
        </button>

        {(sortType || reverse) && (
          <button
            onClick={() => {
              setReverse(false);
              setSortType('');
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (<li data-cy="Good" key={good}>{good}</li>))}
      </ul>
    </div>
  );
};
