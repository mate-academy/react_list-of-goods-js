import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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

const Good = ({ good }) => <li data-cy="Good">{good}</li>;

function getPreparedGoods(goods, { sortField, reversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);

  const handleSort = field => {
    setSortField(field);
    setVisibleGoods(
      getPreparedGoods(goodsFromServer, { sortField: field, reversed }),
    );
  };

  const handleReverse = () => {
    setReversed(!reversed);
    setVisibleGoods(
      getPreparedGoods(goodsFromServer, { sortField, reversed: !reversed }),
    );
  };

  const handleReset = () => {
    setSortField('');
    setReversed(false);
    setVisibleGoods(goodsFromServer);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${cn({ 'is-light': sortField !== SORT_FIELD_ALPHABET })}`}
          onClick={() => handleSort(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${cn({ 'is-light': sortField !== SORT_FIELD_LENGTH })}`}
          onClick={() => handleSort(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${cn({ 'is-light': !reversed })}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <Good good={good} key={good} />
        ))}
      </ul>
    </div>
  );
};
