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

const SORT_FIELD_ALPHABET = 'Sort alphabetically';
const SORT_FIELD_LENGTH = 'Sort by length';

const Good = ({ good }) => (
  <li data-cy="Good">{good}</li>
);

const GoodList = ({ goods }) => (
  goods.map(good => (
    <Good good={good} key={good} />
  ))
);

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  if (!sortField && isReversed) {
    return preparedGoods.reverse();
  }

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return isReversed
            ? b.localeCompare(a)
            : a.localeCompare(b);
        case SORT_FIELD_LENGTH:
          if (a.length !== b.length) {
            return isReversed
              ? b.length - a.length
              : a.length - b.length;
          }

          return isReversed ? b.localeCompare(a) : a.localeCompare(b);

        default: return 0;
      }
    });
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods
    = getPreparedGoods(goodsFromServer, { sortField, isReversed });

  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          type="button"
          className={cn('button',
            'is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPHABET },
            { active: SORT_FIELD_ALPHABET })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button',
            'is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH },
            { active: SORT_FIELD_LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed(!isReversed);
          }}
          type="button"
          className={cn('button',
            'is-warning',
            { 'is-light': !isReversed },
            { active: isReversed })}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}

      </div>

      <ul className="GoodList">
        <GoodList goods={visibleGoods} />
      </ul>
    </div>

  );
};
