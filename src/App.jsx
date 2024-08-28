import 'bulma/css/bulma.css';
import classNames from 'classnames';
import './App.scss';
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

const SORT_FIELD_ALPHABET = 'Sort alphabetically';
const SORT_FIELD_LENGTH = 'Sort by length';

function getPreparedGoods(goods, { sortField }) {
  const preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_FIELD_ALPHABET:
        preparedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case SORT_FIELD_LENGTH:
        preparedGoods.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');

  let visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
  });
  const [reversed, setReversed] = useState(false);

  if (reversed) {
    visibleGoods = visibleGoods.reverse();
  }

  const buttonClassAplhabet = classNames('button', 'is-info', {
    'is-light': sortField !== SORT_FIELD_ALPHABET,
  });

  const buttonClassLength = classNames('button', 'is-success', {
    'is-light': sortField !== SORT_FIELD_LENGTH,
  });

  const buttonClassReverse = classNames('button', 'is-warning', {
    'is-light': !reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={buttonClassAplhabet}
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={buttonClassLength}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={buttonClassReverse}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
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
        {visibleGoods.map(goods => {
          return (
            <li key={goods} data-cy="Good">
              {goods}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
