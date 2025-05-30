import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';
import clsx from 'clsx';

const SORT_FIELD_NAME = 'Sort alphabetically';
const SORT_FIELD_LENGTH = 'Sort by length';

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

export const namesSortField = [SORT_FIELD_NAME, SORT_FIELD_LENGTH];

function getPrepearedGoods(goods, { sortField, reversed }) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const GoodList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li key={good} id={good} data-cy="Good">
        {good}
      </li>
    ))}
  </ul>
);

export const SortButton = ({ id, className, onClick, nameField }) => (
  <button id={id} type="button" className={className} onClick={onClick}>
    {nameField}
  </button>
);

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const visibleGoods = getPrepearedGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  const onReset = () => {
    setSortField('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        {[SORT_FIELD_NAME, SORT_FIELD_LENGTH].map(field => (
          <SortButton
            key={field}
            id={field}
            className={clsx('button is-info', {
              'is-light': field !== sortField,
            })}
            onClick={event => setSortField(event.currentTarget.id)}
            nameField={field}
          />
        ))}

        <button
          type="button"
          className={clsx('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={onReset}
          >
            Reset
          </button>
        )}
      </div>
      <GoodList goods={visibleGoods} />
    </div>
  );
};
