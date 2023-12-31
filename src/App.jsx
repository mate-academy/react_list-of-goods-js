import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

const SORT_FILTER_ALPHABETICALLY = 'Sort alphabetically';
const SORT_FILTER_BY_LENGTH = 'Sort by length';

function getPreparedGoods(goods, sortFilter, isReversed) {
  const preparedGoods = [...goods];

  if (sortFilter) {
    preparedGoods.sort((good1, good2) => {
      switch (sortFilter) {
        case SORT_FILTER_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_FILTER_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return isReversed ? preparedGoods.reverse() : preparedGoods;
}

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

export function App() {
  const [sortFilter, setSortFilter] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const preparedGoods
    = getPreparedGoods(goodsFromServer, sortFilter, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortFilter(SORT_FILTER_ALPHABETICALLY)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortFilter !== SORT_FILTER_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortFilter(SORT_FILTER_BY_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortFilter !== SORT_FILTER_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed(!isReversed);
          }}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortFilter || isReversed) && (
          <button
            onClick={() => {
              setSortFilter('');
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={preparedGoods} />
    </div>
  );
}

const GoodList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodItem good={good} key={good} />
    ))}
  </ul>
);

const GoodItem = ({ good }) => (
  <li data-cy="Good">
    {good}
  </li>
);
