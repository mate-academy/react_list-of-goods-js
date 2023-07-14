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

const SORT_BY = {
  ALPHA: 'alphabet',
  LENGTH: 'length',
};

function getPrepareGoods(goods, sortGood, reverse) {
  const prepareGoods = [...goods];

  if (prepareGoods) {
    prepareGoods.sort((good1, good2) => {
      switch (sortGood) {
        case SORT_BY.ALPHA:
          return good1.localeCompare(good2);

        case SORT_BY.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    prepareGoods.reverse();
  }

  return prepareGoods;
}

const GoodsList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li data-cy="Good" key={good}>
        {good}
      </li>
    ))}
  </ul>
);

export const App = () => {
  const [sortGood, setSortGood] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPrepareGoods(goodsFromServer, sortGood, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortGood(SORT_BY.ALPHA)}
          type="button"
          className={cn('button', ' is-info', {
            'is-light': sortGood !== SORT_BY.ALPHA,
          })}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setSortGood(SORT_BY.LENGTH)}
          type="button"
          className={cn('button', ' is-success', {
            'is-light': sortGood !== SORT_BY.LENGTH,
          })}
        >
          Sort by length
        </button>
        <button
          onClick={() => setReverse(!reverse)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reverse !== true,
          })}
        >
          Reverse
        </button>
        {(sortGood || reverse) && (
          <button
            onClick={() => {
              setSortGood('');
              setReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
