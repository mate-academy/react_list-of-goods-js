import { useState } from 'react';
import classnames from 'classnames';
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

const SORT_FIELD_ALPHABET = 'name';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, reverse }) {
  let preparedGoods = [...goods];

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

  if (reverse) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          type="button"
          className={classnames('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={classnames('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(prev => !prev)}
          type="button"
          className={classnames('button', 'is-warning', {
            'is-light': !reverse,
          })}
        >
          Reverse
        </button>
        {!(sortField === '' && !reverse) && (
          <button
            onClick={() => {
              setSortField('');
              setReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};

export const GoodList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li key={good} data-cy="Good">
        {good}
      </li>
    ))}
  </ul>
);
