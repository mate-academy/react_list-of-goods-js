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

const SORT_TYPE_ALPHABET = 'alphabetically';
const SORT_TYPE_LENGTH = 'byLength';

const getPreparedGoods = (goods, sortType, isReversed) => {
  const preparedGoods = [...goods];

  switch (sortType) {
    case SORT_TYPE_ALPHABET:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SORT_TYPE_LENGTH:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState('');

  const goods = getPreparedGoods(goodsFromServer, sortType, isReversed);

  const reverse = () => {
    setReversed(prev => !prev);
  };

  const reset = () => {
    setSortType('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SORT_TYPE_ALPHABET,
          })}
          onClick={() => setSortType(SORT_TYPE_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== SORT_TYPE_LENGTH,
          })}
          onClick={() => setSortType(SORT_TYPE_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
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
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
