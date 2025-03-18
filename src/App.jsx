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

const SORT_ALPHABETICALY = 'sort_alphabeticaly';
const SORT_BY_LENGTH = 'sort_by_length';

function getPreparedGoods(goods, sortType) {
  const preparedGoods = [...goods];

  if (sortType) {
    switch (sortType) {
      case SORT_ALPHABETICALY:
        return preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      case SORT_BY_LENGTH:
        return preparedGoods.sort(
          (good1, good2) => good1.length - good2.length,
        );
      default:
        return preparedGoods;
    }
  }

  return preparedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [reversed, setReversed] = useState(false);
  let visibleGoods = getPreparedGoods(goodsFromServer, sortType);

  if (reversed) {
    visibleGoods = [...visibleGoods].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          // className="button is-info is-light"
          className={classNames('button', 'is-warning', {
            'is-light': sortType === SORT_ALPHABETICALY,
            'is-warning': sortType !== SORT_ALPHABETICALY,
          })}
          onClick={() => setSortType(SORT_ALPHABETICALY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          // className="button is-success is-light"
          className={classNames('button', {
            'is-light': sortType === SORT_BY_LENGTH,
            'is-warning': sortType !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortType(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortType !== '' || reversed !== false) && (
          <button
            type="button"
            className={classNames('button', {
              'is-light': sortType === '' && !reversed,
              'is-warning': sortType !== '' || reversed,
            })}
            onClick={() => {
              setSortType('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
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
