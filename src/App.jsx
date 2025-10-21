import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const handleAlphabetically = () => {
    setSortField(SORT_FIELD_ALPHABETICALLY);
  };

  const handleLength = () => {
    setSortField(SORT_FIELD_LENGTH);
  };

  const handleReverse = () => {
    setReversed(!reversed);
  };

  const handleReset = () => {
    setReversed(false);
    setSortField('');
  };

  let visibleGoods = goodsFromServer;

  if (sortField === SORT_FIELD_ALPHABETICALLY) {
    visibleGoods = [...visibleGoods].sort();
  }

  if (sortField === SORT_FIELD_LENGTH) {
    visibleGoods = [...visibleGoods].sort((a, b) => a.length - b.length);
  }

  if (reversed) {
    visibleGoods = [...visibleGoods].reverse();
  }

  const isInitialOrder =
    visibleGoods.length === goodsFromServer.length &&
    visibleGoods.every((good, index) => good === goodsFromServer[index]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleAlphabetically}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleLength}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>
        {!isInitialOrder && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
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
