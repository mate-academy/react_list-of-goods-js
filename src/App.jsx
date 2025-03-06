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

const ALPHA_SORT_NAME = 'alpha';
const LENGTH_SORT_NAME = 'len';

export const App = () => {
  const [sortType, setSortType] = useState(null);
  const [reversed, setReversed] = useState(false);

  const handleSort = type => {
    setSortType(type);
  };

  const handleReset = () => {
    setSortType(null);
    setReversed(false);
  };

  const handleReverse = () => {
    setReversed(prev => !prev);
  };

  const goods = [...goodsFromServer];

  goods.sort((a, b) => {
    switch (sortType) {
      case ALPHA_SORT_NAME:
        return a.localeCompare(b);
      case LENGTH_SORT_NAME:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (reversed) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== ALPHA_SORT_NAME,
          })}
          onClick={() => handleSort(ALPHA_SORT_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== LENGTH_SORT_NAME,
          })}
          onClick={() => handleSort(LENGTH_SORT_NAME)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => handleReverse()}
        >
          Reverse
        </button>

        {(sortType || reversed) && (
          <button
            type="button"
            className={classNames('button', 'is-danger', 'is-light')}
            onClick={() => handleReset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
