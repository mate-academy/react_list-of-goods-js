import { useState } from 'react';
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

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const SORT_FIELD_ALPHABET = 'Sort alphabetically';
  const SORT_FIELD_LENGHT = 'Sort by length';
  let visibleGoods = [...goodsFromServer];

  visibleGoods = [...visibleGoods].sort((good1, good2) => {
    switch (sortField) {
      case SORT_FIELD_ALPHABET:
        return good1.localeCompare(good2);
      case SORT_FIELD_LENGHT:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (reverse) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${classNames({ 'is-light': sortField !== SORT_FIELD_ALPHABET })}`}
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${classNames({ 'is-light': sortField !== SORT_FIELD_LENGHT })}`}
          onClick={() => {
            setSortField(SORT_FIELD_LENGHT);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${classNames({ 'is-light': !reverse })}`}
          onClick={() => {
            if (!reverse) {
              setReverse(prev => !prev);
            } else {
              setReverse(false);
            }
          }}
        >
          Reverse
        </button>

        {(sortField.length > 0 || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReverse(false);
              setSortField('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
