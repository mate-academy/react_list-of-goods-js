import React, { useState } from 'react';
import classNames from 'classnames';
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

const SORT_FIELD_ALPH = 'Sort alphabetically';
const SORT_FIELD_LNGTH = 'Sort by length';

function getPreparedList(goods, { sortField, isReversed }) {
  let prepareGoods = [...goods];

  if (sortField) {
    prepareGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPH:
          return good1.localeCompare(good2);

        case SORT_FIELD_LNGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    prepareGoods = prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const listOfGoods
    = getPreparedList(goodsFromServer, { sortField, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPH)}
          type="button"
          className={
            classNames('button is-info',
              { 'is-light': sortField !== SORT_FIELD_ALPH })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LNGTH)}
          type="button"
          className={
            classNames('button is-info',
              { 'is-light': sortField !== SORT_FIELD_LNGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={() => (
            isReversed
              ? setIsReversed(false)
              : setIsReversed(true)
          )}
          type="button"
          className={
            classNames('button is-info',
              { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        {JSON.stringify(goodsFromServer) !== JSON.stringify(listOfGoods) && (
          <button
            onClick={() => {
              setIsReversed(false);
              setSortField('');
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {listOfGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
