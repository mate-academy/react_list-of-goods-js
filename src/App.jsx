import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

function getPreparedGoods(goods, { sortField, reverseField }) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return a.localeCompare(b);

        case SORT_FIELD_LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(false);
  const [reverseField, setReverseField] = useState(false);
  const goodsFromServerCopy = getPreparedGoods(goodsFromServer, {
    sortField,
    reverseField,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SORT_FIELD_NAME,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_NAME);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': reverseField === false,
          })}
          onClick={() => {
            setReverseField(!reverseField);
          }}
        >
          Reverse
        </button>

        {(reverseField || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(false);
              setReverseField(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsFromServerCopy.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
