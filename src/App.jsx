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

const SORT_BY_ALPHABETICAL = 'alphabetical';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SORT_BY_ALPHABETICAL:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SORT_BY_LENGTH:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const preparedGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const resetList = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_BY_ALPHABETICAL)}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SORT_BY_ALPHABETICAL,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_BY_LENGTH)}
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            onClick={resetList}
            type="button"
            className={classNames('button', 'is-danger', {
              'is-light': sortField || isReversed,
            })}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map((good, index) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
