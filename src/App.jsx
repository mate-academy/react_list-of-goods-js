import React, { useState } from 'react';

import FancyButton from './FancyButton/FancyButton';

import 'bulma/css/bulma.css';
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

const SORT_FIELD_ALPHABETICAL = 'alphabetical';
const SORT_FIELD_LENGTH = 'length';

function getGoodsPrepared(goods, sortField, reverseSort) {
  const goodsPrepared = [...goods];

  if (sortField) {
    goodsPrepared.sort((a, b) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETICAL:
          return a.localeCompare(b);

        case SORT_FIELD_LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (reverseSort) {
    goodsPrepared.reverse();
  }

  return goodsPrepared;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseSort, setReverseSort] = useState(false);
  const sortedGoods = getGoodsPrepared(goodsFromServer, sortField, reverseSort);

  return (
    <div className="section content">
      <div className="buttons">
        <FancyButton
          label="Sort alphabetically"
          onClick={() => setSortField(SORT_FIELD_ALPHABETICAL)}
          isActive={sortField !== SORT_FIELD_ALPHABETICAL}
          colorClass="is-info"
        />

        <FancyButton
          label="Sort by length"
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          isActive={sortField !== SORT_FIELD_LENGTH}
          colorClass="is-success"
        />

        <FancyButton
          label="Reverse"
          onClick={() => setReverseSort(!reverseSort)}
          isActive={!reverseSort}
          colorClass="is-warning"
        />

        {sortField || reverseSort ? (
          <FancyButton
            label="Reset"
            onClick={() => {
              setSortField('');
              setReverseSort(false);
            }}
            colorClass="is-danger is-light"
          />
        ) : null}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
