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

const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_ALPHA = 'alphabetically';

function getPreparedGoods(goods, sortField, reverse) {
  let preparedGoods = [...goods];

  switch (sortField) {
    case SORT_FIELD_LENGTH:
      preparedGoods
        .sort((elem1, elem2) => elem1.length - elem2.length);
      break;

    case SORT_FIELD_ALPHA:
      preparedGoods
        .sort((elem1, elem2) => elem1.localeCompare(elem2));
      break;

    default:
      preparedGoods = [...goods];
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortFeild] = useState('');
  const [isReversed, setReverse] = useState(false);

  const goodsPrepared = getPreparedGoods(
    goodsFromServer,
    sortField,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn('button is-info', { 'is-light': sortField !== SORT_FIELD_ALPHA })
          }
          onClick={() => setSortFeild(SORT_FIELD_ALPHA)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortFeild(SORT_FIELD_LENGTH)}
          className={
            cn(
              'button is-success',
              { 'is-light': sortField !== SORT_FIELD_LENGTH },
            )
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReverse(prev => !prev)}
          className={cn('button is-warning', { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        {(isReversed || sortField !== '') && (
          <button
            type="button"
            onClick={() => {
              setSortFeild('');
              setReverse(false);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsPrepared.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
