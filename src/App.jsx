import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { getPreparedGood } from './utils/getPreparedGood';
import { sortFields } from './utils/constants';

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

const goods = goodsFromServer.map((name, id) => ({
  name,
  id,
}));

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGood(goods, { sortField, isReversed });

  const isVisibleResetButton = sortField || isReversed;

  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== sortFields.ALPHABETIC,
          })}
          onClick={() => setSortField(sortFields.ALPHABETIC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== sortFields.BYLENGTH,
          })}
          onClick={() => setSortField(sortFields.BYLENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isVisibleResetButton && (
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
          <li key={good.id} data-cy="Good">
            {good.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
