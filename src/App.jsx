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

const GOOD_BY_LENGTH = 'length';
const GOOD_BY_NAME = 'alphabetically';

function getPreperedGoods(goods, sortGoods, isReverseGoods) {
  const preparedGoods = [...goods];

  if (sortGoods) {
    preparedGoods.sort((good1, good2) => {
      switch (sortGoods) {
        case GOOD_BY_LENGTH:
          return good1.length - good2.length;
        case GOOD_BY_NAME:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (isReverseGoods) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverseGoods, setIsReverseGoods] = useState(false);
  const sortedGoods = getPreperedGoods(
    goodsFromServer,
    sortField,
    isReverseGoods,
  );

  const isSortedByLength = sortField !== GOOD_BY_LENGTH;
  const isSortedByName = sortField !== GOOD_BY_NAME;
  const isSortingOrReversingActive = sortField || isReverseGoods;

  const reset = () => {
    setIsReverseGoods(false);
    setSortField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classnames(
            'button',
            'is-info',
            { 'is-light': isSortedByName },
          )}
          onClick={() => setSortField(GOOD_BY_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classnames(
            'button',
            'is-success',
            { 'is-light': isSortedByLength },
          )}
          onClick={() => setSortField(GOOD_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classnames(
            'button',
            'is-warning',
            { 'is-light': !isReverseGoods },
          )}
          onClick={() => setIsReverseGoods(!isReverseGoods)}
        >
          Reverse
        </button>
        {isSortingOrReversingActive
        && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
