import { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

const SORT_GOODS_NAME = 'name';
const SORT_GOODS_LENGTH = 'length';

const goodsFromServer = [
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

export const App = () => {
  const [baseGoods, setBaseGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sorted = [...goodsFromServer];

  if (sortField === SORT_GOODS_NAME) {
    sorted.sort((a, b) => a.localeCompare(b));
  } else if (sortField === SORT_GOODS_LENGTH) {
    sorted.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    sorted.reverse();
  }

  const handleReset = () => {
    setBaseGoods(goodsFromServer);
    setSortField('');
    setIsReversed(false);
  };

  const isInitial =
    sortField === '' &&
    !isReversed &&
    baseGoods.join() === goodsFromServer.join();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SORT_GOODS_NAME,
          })}
          onClick={() => setSortField(SORT_GOODS_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SORT_GOODS_LENGTH,
          })}
          onClick={() => setSortField(SORT_GOODS_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prevValue => !prevValue)}
        >
          Reverse
        </button>

        {!isInitial && (
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
        {sorted.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
