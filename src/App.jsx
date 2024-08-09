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

const SORT_ALPHABET = 'alphabet';
const SORT_LENGTH = 'length';

const handleSort = (type, isReversed) => {
  const sortedGoods = [...goodsFromServer];

  switch (type) {
    case SORT_ALPHABET:
      sortedGoods.sort((goods1, goods2) => goods1.localeCompare(goods2));
      break;

    case SORT_LENGTH:
      sortedGoods.sort((goods1, goods2) => goods1.length - goods2.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [isReversed, setReversed] = useState(false);
  const [sortType, setsortType] = useState('');
  const sortedGoods = handleSort(sortType, isReversed);
  const shouldShowResetButton =
    sortType === SORT_ALPHABET || sortType === SORT_LENGTH || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(`button is-info`, {
            'is-light': sortType !== SORT_ALPHABET,
          })}
          onClick={() => setsortType(SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(`button is-success`, {
            'is-light': sortType !== SORT_LENGTH,
          })}
          onClick={() => setsortType(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(`button is-warning`, {
            'is-light': !isReversed,
          })}
          onClick={() => setReversed(!isReversed)}
        >
          Reverse
        </button>

        {shouldShowResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setsortType('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
