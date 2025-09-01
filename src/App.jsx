import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
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

const SORT_FIELD_ALF = 'alphabet';
const SORT_FIELD_LENG = 'length';

function getPrepareGoods(goods, { sortField, reverse }) {
  let prepareGoods = [...goods];

  prepareGoods = prepareGoods.sort((good1, good2) => {
    switch (sortField) {
      case 'alphabet':
        return good1.localeCompare(good2);

      case 'length':
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (reverse) {
    prepareGoods = [...prepareGoods].reverse();
  }

  return prepareGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getPrepareGoods(goodsFromServer, { sortField, reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_ALF)}
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ALF,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_LENG)}
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENG,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReverse(!reverse)}
          className={classNames('button', 'is-warning', {
            'is-light': !reverse,
          })}
        >
          Reverse
        </button>

        {sortField || reverse ? (
          <button
            type="button"
            onClick={() => {
              setSortField('');
              setReverse(false);
            }}
            className="button is-danger"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
