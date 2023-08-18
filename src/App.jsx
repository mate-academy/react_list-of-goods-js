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

const SORT_OPTIONS = {
  NONE: '',
  ALPHABET: 'alphabet',
  LENGTH: 'length',
};

const GoodList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li key={good} data-cy="Good">{good}</li>))}
  </ul>
);

function getPreparedGoods(goods, { sortField, isReversed }) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_OPTIONS.ALPHABET:
          return good1.localeCompare(good2);
        case SORT_OPTIONS.LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SORT_OPTIONS.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods
  = getPreparedGoods(goodsFromServer, { sortField, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': sortField !== SORT_OPTIONS.ALPHABET })}
          onClick={() => {
            setSortField(SORT_OPTIONS.ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sortField !== SORT_OPTIONS.LENGTH })}
          onClick={() => setSortField(SORT_OPTIONS.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning',
            { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SORT_OPTIONS.NONE);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <GoodList goods={visibleGoods} />
    </div>
  );
};
