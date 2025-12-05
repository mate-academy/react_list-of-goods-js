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

const SORT_ALPHABETICALLY = 'alphabetically';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, reversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

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
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  const reverseGoods = () => {
    visibleGoods.reverse();
    setReversed(!reversed);
  };

  const resetGoods = () => {
    setSortField('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            sortField !== SORT_ALPHABETICALLY && 'is-light',
          )}
          onClick={() => setSortField(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            sortField !== SORT_BY_LENGTH && 'is-light',
          )}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info', !reversed && 'is-light')}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
