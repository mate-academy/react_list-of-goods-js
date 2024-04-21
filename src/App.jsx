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

const goodsFromServerWithId = goodsFromServer.map((good, index) => ({
  name: good,
  id: index + 1,
}));

const ALPHABET_SORT_FIELD = 'alphabet';
const LENGTH_SORT_FIELD = 'length';

function prepareGoodsForOutput(gds, { sortField, reversed }) {
  const goods = [...gds];

  if (sortField === ALPHABET_SORT_FIELD) {
    goods.sort(({ name: name1 }, { name: name2 }) =>
      name1.localeCompare(name2),
    );
  }

  if (sortField === LENGTH_SORT_FIELD) {
    goods.sort(
      ({ name: name1 }, { name: name2 }) => name1.length - name2.length,
    );
  }

  if (reversed) {
    goods.reverse();
  }

  return goods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const preparedGoods = prepareGoodsForOutput(goodsFromServerWithId, {
    sortField,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(ALPHABET_SORT_FIELD)}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== ALPHABET_SORT_FIELD,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(LENGTH_SORT_FIELD)}
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== LENGTH_SORT_FIELD,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => (reversed ? setReversed(false) : setReversed(true))}
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(({ name, id }) => (
          <li key={id} data-cy="Good">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};
