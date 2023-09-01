import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import GoodsList from './component/GoodsList';

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
export const SORT_FIELD = {
  ALPHABET: 'alphabet',
  LENGTH: 'length',
};

function getPreparedGoods(goods, { sortField, reverse }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD.ALPHABET:
          return good1.localeCompare(good2);
        case SORT_FIELD.LENGTH:
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
  const [reverse, setReverse] = useState(false);

  const isVisibleResetButton = sortField || reverse;

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, reverse },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD.ALPHABET)}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SORT_FIELD.ALPHABET })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD.LENGTH)}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SORT_FIELD.LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(!reverse)}
          type="button"
          className={cn('button is-warning',
            { 'is-light': !reverse })}
        >
          Reverse
        </button>

        {isVisibleResetButton && (
          <button
            onClick={() => {
              setSortField('');
              setReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        <GoodsList goods={visibleGoods} />
      </ul>

    </div>
  );
};
