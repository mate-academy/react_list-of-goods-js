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

const FIELDS = {
  name: 'name',
  length: 'length',
  any: '',
};

function getPreparedGoods(goods, sortField, isReversed) {
  const preparedGoods = [...goods];

  if (sortField !== FIELDS.any) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case FIELDS.name:
          return good1.localeCompare(good2);
        case FIELDS.length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);
  const shouldShowResetButton = sortField !== FIELDS.any || isReversed;

  const handleReset = () => {
    setSortField(FIELDS.any);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== FIELDS.name,
          })}
          onClick={() => setSortField(FIELDS.name)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== FIELDS.length,
          })}
          onClick={() => setSortField(FIELDS.length)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prevReversed => !prevReversed)}
        >
          Reverse
        </button>
        {shouldShowResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
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
