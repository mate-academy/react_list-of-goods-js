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
const SORT_FIELD_ALPHABETICALLY = 'alphabetically';

export const GoodsList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li
        data-cy="Good"
        key={good}
      >
        {good}
      </li>
    ))}
  </ul>
);

function getPreparedGoods(goods, sortField, reversedField) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (reversedField) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversedField, setReversedField] = useState(false);
  const visibleGoods
    = getPreparedGoods(goodsFromServer, sortField, reversedField);
  const reset = () => {
    setSortField('');
    setReversedField(false);
  };

  const isReset = sortField || reversedField;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn(
              'button',
              'is-info',
              { 'is-light': sortField !== SORT_FIELD_ALPHABETICALLY },
            )}
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-success',
              { 'is-light': sortField !== SORT_FIELD_LENGTH },
            )}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-warning',
              { 'is-light': !reversedField },
            )}
          onClick={() => setReversedField(!reversedField)}
        >
          Reverse
        </button>

        {isReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
