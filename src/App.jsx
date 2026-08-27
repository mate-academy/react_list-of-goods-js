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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

function setSort(goods, sortBy, isReversed = false) {
  const copyGoods = [...goods];

  if (sortBy) {
    switch (sortBy) {
      case SORT_BY_ALPHABET:
        copyGoods.sort((goodOne, goodTwo) => {
          return goodOne.localeCompare(goodTwo);
        });
        break;
      case SORT_BY_LENGTH:
        copyGoods.sort((goodOne, goodTwo) => {
          return goodOne[sortBy] - goodTwo[sortBy];
        });
        break;
      default:
        return 0;
    }
  }

  if (isReversed) {
    return copyGoods.toReversed();
  }

  return copyGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const goods = setSort(goodsFromServer, sortBy, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortBy(SORT_BY_ALPHABET)}
          className={classNames('button', 'is-info', {
            'is-light': sortBy !== SORT_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortBy(SORT_BY_LENGTH)}
          className={classNames('button', 'is-success', {
            'is-light': sortBy !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() =>
            isReversed ? setIsReversed(false) : setIsReversed(true)
          }
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(isReversed || sortBy) && (
          <button
            type="button"
            onClick={() => {
              if (isReversed) {
                setIsReversed(false);
              }

              if (sortBy) {
                setSortBy('');
              }
            }}
            className="button is-danger is-light"
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
