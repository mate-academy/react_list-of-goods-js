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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

function prepareGoods(goods, { sortValue, isReverse }) {
  const newGoods = [...goods];

  if (sortValue) {
    newGoods.sort((good1, good2) => {
      switch (sortValue) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    newGoods.reverse();
  }

  return newGoods;
}

export const App = () => {
  const [sortValue, setSortValue] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const visibleGoods = prepareGoods(goodsFromServer, { sortValue, isReverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortValue(SORT_BY_ALPHABET)}
          type="button"
          className={
            classNames('button', 'is-info', {
              'is-light': sortValue !== SORT_BY_ALPHABET,
            })
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortValue(SORT_BY_LENGTH)}
          type="button"
          className={
            classNames('button', 'is-success', {
              'is-light': sortValue !== SORT_BY_LENGTH,
            })
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReverse(!isReverse)}
          type="button"
          className={
            classNames('button', 'is-warning', {
              'is-light': !isReverse,
            })
          }
        >
          Reverse
        </button>

        {(sortValue !== '' || isReverse) && (
          <button
            onClick={() => {
              setSortValue('');
              setIsReverse(false);
            }}
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
