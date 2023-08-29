/* eslint-disable no-console */
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';
const REVERSE_FIELD_VALUE = false;

function getPreparedGoods(goods, { sortField, isReversed }) {
  const prepearedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_FIELD_NAME: (
        prepearedGoods.sort((goods1, goods2) => (
          goods1.localeCompare(goods2)
        ))
      );
        break;

      case SORT_FIELD_LENGTH: (
        prepearedGoods.sort((goods1, goods2) => (
          goods1.length - goods2.length
        ))
      );
        break;

      default:
        return prepearedGoods;
    }
  }

  if (isReversed) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(REVERSE_FIELD_VALUE);

  const visibleGoods = getPreparedGoods(goodsFromServer,
    { sortField, isReversed });

  const isSortFieldReversed = sortField || isReversed;

  const handleResetClick = () => {
    setSortField('');
    setIsReversed(REVERSE_FIELD_VALUE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SORT_FIELD_NAME })}
          onClick={() => setSortField(SORT_FIELD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': isReversed === REVERSE_FIELD_VALUE })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {isSortFieldReversed && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleResetClick()}
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
