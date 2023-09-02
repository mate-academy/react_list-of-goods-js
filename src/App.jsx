import 'bulma/css/bulma.css';
import './App.scss';
import className from 'classnames';
import { useState } from 'react';

const SORT_BY_LENGTH = 'length';
const SORT_BY_ALPHABET = 'name';

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

function getPreparedGoods(goods,  sortField, isReversed ) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SORT_BY_ALPHABET:
          return a.localeCompare(b);
        case SORT_BY_LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  return isReversed ? preparedGoods.reverse() : preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods
    = getPreparedGoods(goodsFromServer, sortField, isReversed );
  const setDefaultSort = () => {
    setSortField('');
    setIsReversed(false);
  };
  const compare = isReversed || sortField;


  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={className('button', 'is-info', {
            'is-light': sortField !== SORT_BY_ALPHABET,
          })}
          onClick={() => setSortField(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={className('button is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={className('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {compare && (
          <button
            type="button"
            onClick={() => setDefaultSort()}
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(name => (
          <li
            data-cy="Good"
            key={name}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};
