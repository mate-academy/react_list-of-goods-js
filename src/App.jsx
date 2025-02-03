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

const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_ALPHABET = 'alphabet';

function getPreparedGoods(good, { sortField, reversed }) {
  const preparedGoods = [...good];

  if (sortField) {
    preparedGoods.sort((goodA, goodB) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return goodA.length - goodB.length;
        case SORT_FIELD_ALPHABET:
          return goodA.localeCompare(goodB);
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const goods = getPreparedGoods(goodsFromServer, { sortField, reversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {(reversed || sortField) && (
          <button
            type="button"
            className={classNames('button', 'is-danger', 'is-light')}
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
